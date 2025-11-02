export function initBurgerMenu() {
    const burgerBtn = document.getElementById('burgerBtn');
    const closeMenuBtn = document.getElementById('closeMenuBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    const menuOverlay = document.getElementById('menuOverlay');

    if (!burgerBtn || !mobileMenu || !menuOverlay || !closeMenuBtn) {
        console.error('Burger menu elements not found');
        return;
    }

    // atver menu
    const openMenu = () => {
        mobileMenu.classList.remove('translate-x-full');
        mobileMenu.classList.add('translate-x-0');
        menuOverlay.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
    };

    // aizver menu
    const closeMenu = () => {
        mobileMenu.classList.remove('translate-x-0');
        mobileMenu.classList.add('translate-x-full');
        menuOverlay.classList.add('hidden');
        document.body.style.overflow = '';
    };

    // event listener
    burgerBtn.addEventListener('click', openMenu);
    closeMenuBtn.addEventListener('click', closeMenu);
    menuOverlay.addEventListener('click', closeMenu);

    // aizver menu kad uzspiez uz link
    const mobileLinks = mobileMenu.querySelectorAll('a');
    mobileLinks.forEach(link => {
        link.addEventListener('click', closeMenu);
    });
}