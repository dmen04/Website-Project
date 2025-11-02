
//logo screen size and animation
export function initHeaderScroll() {
    const topHeader = document.getElementById("topHeader");
    const logo = document.querySelector("#logo img");
    const logoContainer = document.getElementById("logo");
    const mainHeader = document.getElementById("mainHeader");

    function handleScroll() {
        const scrollY = window.scrollY;

        if (window.innerWidth >= 768) {
            if (scrollY > 80) {
                topHeader.classList.add("-translate-y-full");
                logo.classList.replace("w-35", "w-16");
                logo.classList.replace("h-35", "h-16");
                logoContainer.classList.replace("top-12", "top-1/2");
            } else {
                topHeader.classList.remove("-translate-y-full");
                logo.classList.replace("w-16", "w-35");
                logo.classList.replace("h-16", "h-35");
                logoContainer.classList.replace("top-1/2", "top-12");
            }
        } else {
            logo.classList.remove("w-35", "h-35");
            logo.classList.add("w-16", "h-16");
            logoContainer.classList.remove("top-12");
            logoContainer.classList.add("top-1/2");
            topHeader.classList.remove("-translate-y-full");
        }
    }

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleScroll);
    handleScroll();
}