const toggle = document.querySelector('.hamburgesa');
const toggle_close= document.querySelector('.hamburgesa_close');
const menuToggle = document.querySelector('.navbar-content');

    toggle.addEventListener('click', () => menuToggle.classList.add('active'))
    toggle_close.addEventListener('click', () => menuToggle.classList.remove('active'))


