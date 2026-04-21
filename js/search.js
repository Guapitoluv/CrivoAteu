export function initSearch() {
    const input = document.getElementById("search");
    input.addEventListener("input", (event) => {
        const value = event.target.value;
    });
    return value;
}