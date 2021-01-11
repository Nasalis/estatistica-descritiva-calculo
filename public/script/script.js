const menuList = document.querySelector('.menuList')
const menuBtn = document.querySelector('#menuBtn')
const body = document.querySelector('body');

menuBtn.addEventListener('click', () => {
    menuList.classList.toggle('active')
    body.classList.toggle('active')
})