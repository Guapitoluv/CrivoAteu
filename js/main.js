const theme=localStorage.getItem("theme");
if (theme) {
    if (theme=="DarkMode") {
        document.documentElement.classList.add("dark");
    } else {
        document.documentElement.classList.remove("dark");
    }
}