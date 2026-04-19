const slider = document.getElementById("myRange");
if (slider) {
    const output = document.getElementById("valueDisplay");
    let first_time=true;
    let first_values={};
    slider.oninput = function() {
        output.innerHTML = this.value;
        const objects=["h1", "h2", "h3", "a", "p", "button"]
        let elements=[];
        let a;
        objects.forEach((obj) => {
            a=document.querySelectorAll(obj);
            elements.push(a);
        });
        console.log("elements: " + elements);
        Array.from(elements).forEach((element) => {
            console.log("element: " + element);
            Array.from(element).forEach((e) => {
                console.log("e: " + e);
                const style=window.getComputedStyle(e);
                const curr_font_size=style.getPropertyValue("font-size").slice(0, -2);
                if (first_time) {
                    first_values[e.tagName]=curr_font_size;
                }
                const v=String(parseInt(first_values[e.tagName])+parseInt(this.value))+"px";
                e.style.setProperty("font-size", v);
                console.log(this.value);
                console.log(v);
            });
        });
        if (first_time) {
            first_time=false;
        }
    }
}