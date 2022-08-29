const toggle = document.querySelector('.hamburgesa');
const menuToggle = document.querySelector('.navbar-content');
    toggle.addEventListener('click', () => menuToggle.classList.add('active'));
    menuToggle.addEventListener('mouseleave', () => menuToggle.classList.remove('active'));
    
window.addEventListener('load', ()=> {
    const main = document.querySelector('main');
    main.addEventListener('click', () => menuToggle.classList.remove('active'));
})
