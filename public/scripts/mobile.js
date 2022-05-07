//script for toggling menu

//target the element
const mobileMenuBtnElement = document.getElementById('mobile-menu-btn');
const mobileMenuElement = document.getElementById('mobile-menu');

//function to toggle menu
function toggleMobileMenu(){
    mobileMenuElement.classList.toggle('open')
}

//add click listener
mobileMenuBtnElement.addEventListener('click', toggleMobileMenu);