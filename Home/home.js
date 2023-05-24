const menuBtn = document.querySelector('.menu-btn');
let menuOpen = false;

menuBtn.addEventListener('click', () => {
  toggleMenu();
});

function toggleMenu() {
  const menu = document.getElementById('menu');
  menu.classList.toggle('open');

  if (!menuOpen) {
    menuBtn.classList.add('open');
    menuOpen = true;
  } else {
    menuBtn.classList.remove('open');
    menuOpen = false;
  }
}



  


