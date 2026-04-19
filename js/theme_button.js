const btn=document.getElementById('myButton');
if (btn) {
    let theme=localStorage.getItem("theme");
    if (theme) {
        btn.textContent=theme=="DarkMode"?"LightMode":"DarkMode";
    }
    btn.addEventListener('click', () => {
        btn.textContent=btn.textContent=="DarkMode"?"LigthMode":"DarkMode";
        if (btn.textContent!="DarkMode") {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }
        localStorage.setItem("theme", btn.textContent=="DarkMode"?"LightMode":"DarkMode");
    });
}