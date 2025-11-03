
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



//burger menu
export function initBurgerMenu() {
    const burgerBtn = document.getElementById('burgerBtn');
    const closeMenuBtn = document.getElementById('closeMenuBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    const menuOverlay = document.getElementById('menuOverlay');

    if (!burgerBtn || !mobileMenu || !menuOverlay || !closeMenuBtn) {
        console.error('Burger menu elements not found');
        return;
    }

    // open menu
    const openMenu = () => {
        mobileMenu.classList.remove('hidden'); // 👈 show it first
        menuOverlay.classList.remove('hidden');
        // small delay to allow transition to start smoothly
        requestAnimationFrame(() => {
            mobileMenu.classList.remove('translate-x-full');
            mobileMenu.classList.add('translate-x-0');
        });
        document.body.style.overflow = 'hidden';
    };

    // close menu
    const closeMenu = () => {
        mobileMenu.classList.remove('translate-x-0');
        mobileMenu.classList.add('translate-x-full');
        menuOverlay.classList.add('hidden');
        document.body.style.overflow = '';

        // hide after transition completes
        setTimeout(() => {
            mobileMenu.classList.add('hidden');
        }, 300); // matches your CSS duration
    };

    burgerBtn.addEventListener('click', openMenu);
    closeMenuBtn.addEventListener('click', closeMenu);
    menuOverlay.addEventListener('click', closeMenu);

    // close when clicking on any link
    const mobileLinks = mobileMenu.querySelectorAll('a');
    mobileLinks.forEach(link => link.addEventListener('click', closeMenu));
}
