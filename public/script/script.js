const menuList = document.querySelector('.menuList')
const menuBtn = document.querySelector('#menuBtn')

menuBtn.addEventListener('click', () => {
    menuList.classList.toggle('active')
})