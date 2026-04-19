export class HeaderContainer {
    constructor(depth, navpath=null, current_page=null) {
        this.window_path=window.location.pathname;
        this.current_page=current_page??this.getCurrentPage();
        this.depth=depth;
        this.navpath=navpath;
    }
    
    render() {
        const body=document.body
        const header=document.createElement("header")
        const header_container=document.createElement("div")
        const title=document.createElement("h1")
        title.textContent="CrivoAteu"
        
        const nav=document.createElement("nav")
        
        const navlink_names=["index", "topics", "news", "options", "about"];
        const routes={
            "index": "./index.html",
            "topics": "./topics.html",
            "news": "./news.html",
            "options": "./options.html",
            "about": "./about.html"
        }
        const correct_names={
            "index": "Home",
            "topics": "Topics",
            "news": "News",
            "options": "Options",
            "about": "About"
        }
        let navlink;
        
        navlink_names.forEach((navlink_name) => {
            navlink=document.createElement("a")
            navlink.textContent=correct_names[navlink_name]
            
            if (this.current_page==navlink_name) {
                navlink.classList.add("inside");
                if (this.navpath==null) {
                    navlink.href="#";
                } else {
                    navlink.href="../".repeat(this.depth)+routes[navlink_name];
                }
            } else if (navlink_name in routes) {
                navlink.href="../".repeat(this.depth)+routes[navlink_name];
            }
            nav.append(navlink)
        })
        
        header_container.setAttribute("id", "header-container")
        header_container.append(title, nav)
        let link;
        if (this.navpath!=null) {
            const np=document.createElement("nav");
            const initlink=document.createElement("a");
            initlink.className="path";
            initlink.textContent=this.current_page;
            initlink.href="../".repeat(this.depth)+routes[this.current_page];
            np.className="path";
            np.append(initlink);
            Object.entries(this.navpath).forEach(([k, v]) => {
                link=document.createElement("a");
                link.className="path";
                link.textContent=k;
                link.href=v;
                np.append(link);
            })
            header_container.append(np);
        }
        
        header.append(header_container)
        body.prepend(header)
    }
    
    getCurrentPage() {
      const file=this.window_path.split('/').pop();
      return file?file.replace('.html', ''):'index';
    }
}