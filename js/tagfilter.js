class searchSuggestionBox {
  constructor(id="search-suggestion-box", suggestedTags=null) {
    this.element=document.getElementById(id);
    this.suggestedTags=suggestedTags!=null?suggestedTags:[];
    this.suggestedTagsAsElements=[];
  }
  
  
  clear() {
    this.element.innerHTML="";
  }
  
  
  buildSuggestionBox() {
    this.element.removeAttribute("hidden");
    this.suggestedTagsAsElements.forEach(e => {
      this.element.append(e);
    });
  }
  
  
  filterSearchSuggestions(tags, value) {
    this.suggestedTags=[];
    this.suggestedTagsAsElements=[];
    this.element.innerHTML="";
    
    tags.forEach(tag => {
      let valid=true;
      const minLen=Math.min(tag.length, value.length);
      let i=0
      for (;i<minLen;i++) {
        if (tag[i]!=value[i]) {
          valid=false;
          break;
        }
      }
      
      if (valid) {
        const d=document.createElement("div");
        const s=document.createElement("span");
        s.innerHTML="<strong>"+value+"</strong>"+tag.slice(i);
        d.append(s);
        this.suggestedTags.push(tag);
        this.suggestedTagsAsElements.push(d)
      }
    });
  }
}


export class TagFilter {
  constructor(listSelector, filterSelector) {
    this.suggBox=new searchSuggestionBox();
    this.list=document.querySelector(listSelector);
    this.buttons=document.querySelectorAll(`${filterSelector} button`);
    this.items=this.list.querySelectorAll("li");
    this.tags={};
    this.ievent=null;
    this.buttonsText=Object.fromEntries(Array.from(this.buttons).map(btn => [btn.dataset.filter, btn.textContent]));
  }
  
  
  init() {
    this.buttons.forEach(btn => {
      console.log(btn.dataset.filter);
      this.tags[btn.dataset.filter]=false;
    });
    
    this.buttons.forEach(btn => {
      btn.addEventListener("click", () => {
        btn.classList.toggle("activated");
        this.tags[btn.dataset.filter]=btn.classList.contains("activated");
        if ((btn.dataset.filter=="all")&&(this.tags["all"])) {
          this.tags=Object.fromEntries(
            Object.entries(this.tags).map(([key, value]) => [key, false])
          );
          this.desactivate_buttons();
          btn.classList.add("activated");
          this.ievent.target.value="";
        } else if ((btn.dataset.filter!="all")&&(!this.tags["all"])) {
          this.buttons.forEach(b => {
            if (b.dataset.filter=="all") {
              b.classList.remove("activated");
            }
          })
          this.filter(this.tags, true);
        }
      });
    });
    
    this.initSearch();
  }
  
  
  filter(tags1, all) {
    this.items.forEach(item => {
      const tags2=item.dataset.tags?item.dataset.tags.split(", "):[];
      const filtered=Object.keys(
        Object.fromEntries(Object.entries(tags1).filter(([k, v]) => v))
      );
      const t=all?filtered.every(t => tags2.includes(t)):filtered.some(t => tags2.includes(t));
      if ((filtered.length>0)&&(t)) {
        console.log("111: " + filtered);
        item.style.display="list-item";
      } else {
        console.log("222");
        item.style.display="none";
      }
    });
  }
  
  
  initSearch() {
    const input=document.getElementById("search");
    
    input.addEventListener("input", (event) => {
      this.ievent=event
      
      const value= this.ievent.target.value;
      
      if (value.length==0) {
        this.buttons.forEach(btn => btn.innerHTML=this.buttonsText[btn.dataset.filter]);
        Array.from(this.buttons).find(e => e.dataset.filter=="all").classList.add("activated");
        this.tags["all"]=true;
        this.suggBox.clear();
        this.reset();
        return;
      }
      
      Array.from(this.buttons).find(e => e.dataset.filter=="all").classList.remove("activated");
      this.tags["all"]=false;
      
      this.suggBox.filterSearchSuggestions(
        (() => Object.keys(this.tags).filter(tag => tag!="all"))(), this.ievent.target.value
          );
      const fst=this.suggBox.suggestedTags;
      this.buttons.forEach(btn => {
        const tag=btn.dataset.filter;
        const value=this.ievent.target.value;
        if ((fst.includes(tag))&&(tag!="all")) {
          btn.innerHTML="<strong>"+value[0].toUpperCase()+value.slice(1)+"</strong>"+this.buttonsText[btn.dataset.filter].slice(value.length);
        } else {
          btn.innerHTML=this.buttonsText[btn.dataset.filter];
        }
      })
      const filtered=Object.fromEntries(fst.map(tag => [tag, true]));
      
      if (Object.entries(filtered).length>0) {
        this.suggBox.buildSuggestionBox(filtered)
      }
      this.filter(filtered, false);
    });
  }
  
  
  reset() {
    this.items.forEach(item => {
      item.style.display="list-item";
    })
  }
  
  
  desactivate_buttons() {
    this.buttons.forEach(btn => {
      btn.classList.remove("activated");
    });
  }
}