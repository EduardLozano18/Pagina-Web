/*=============== SHOW MENU ===============*/
const navMenu = document.getElementById('nav-menu'),
      navToggle = document.getElementById('nav-toggle'),
      navClose = document.getElementById('nav-close')

/*===== MENU SHOW =====*/
/* Validate if constant exists */
if(navToggle){
    navToggle.addEventListener('click', () =>{
        navMenu.classList.add('show-menu')
    })
}

/*===== MENU HIDDEN =====*/
/* Validate if constant exists */
if(navClose){
    navClose.addEventListener('click', () =>{
        navMenu.classList.remove('show-menu')
    })
}


/*=============== REMOVE MENU MOBILE ===============*/
const navLink = document.querySelectorAll('.nav__link')

function linkAction(){
    const navMenu = document.getElementById('nav-menu')
    // When we click on each nav__link, we remove the show-menu class
    navMenu.classList.remove('show-menu')
}
navLink.forEach(n => n.addEventListener('click', linkAction))


/*============== HOME SWIPER ============*/
let homeSwiper = new Swiper(".home-swiper", {
    spaceBetween: 30,
    loop: 'true',

    pagination: {
      el: ".swiper-pagination",
      clickable: true
    },
  });


/*=============== CHANGE BACKGROUND HEADER ===============*/
function scrollHeader(){
    const header = document.getElementById('header')
    // When the scroll is greater than 50 viewport height, add the scroll-header class to the header tag
    if(this.scrollY >= 50) header.classList.add('scroll-header'); else header.classList.remove('scroll-header')
}
window.addEventListener('scroll', scrollHeader)
    
/*============== NEW SWIPER ============*/
let newSwiper = new Swiper(".new-swiper", {
    centeredSlides: true,
    slidesPerView: 'auto',
    spaceBetween: 16,
    loop: 'true',

   
  });


  /*======================== SCROLL SECTIONS ACTIVE LINK =========================*/
  const sections = document.querySelectorAll('section[id]')

  function scrollActive(){
      const scrollY = window.pageYOffset
  
      sections.forEach(current =>{
          const sectionHeight = current.offsetHeight,
                sectionTop = current.offsetTop - 58,
                sectionId = current.getAttribute('id')
  
          if(scrollY > sectionTop && scrollY <= sectionTop + sectionHeight){
              document.querySelector('.nav__menu a[href*=' + sectionId + ']').classList.add('active-link')
          }else{
              document.querySelector('.nav__menu a[href*=' + sectionId + ']').classList.remove('active-link')
          }
      })
  }
  window.addEventListener('scroll', scrollActive)

  /*=============== SHOW SCROLL UP ===============*/ 
  function scrollUp(){
      const scrollUp = document.getElementById('scroll-up');
      // When the scroll is higher than 460 viewport height, add the show-scroll class to the a tag with the scroll-top class
      if(this.scrollY >= 460) scrollUp.classList.add('show-scroll'); else scrollUp.classList.remove('show-scroll')
  }
  window.addEventListener('scroll', scrollUp)

  /*=============== SCROLL REVEAL ANIMATION ===============*/
const sr = ScrollReveal({
    origin: 'top',
    distance: '60px',
    duration: 1500,
    delay: 300,
    // reset: true
})

sr.reveal(`.home-swiper, .new-swiper, .newsletter__container`)
sr.reveal(`.category__data, .trick__content, .footer__content`,{interval: 100})
sr.reveal(`.about__data, .discount__img`,{origin: 'left'})
sr.reveal(`.about__img, .discount__data`,{origin: 'right'})


/*Carrito de compras */
const listProducts = document.querySelector('#trick');
const listProduct = document.querySelector('#new');


document.addEventListener('DOMContentLoaded', function() {
    
    EventListener();

});

function EventListener(){
   listProducts.addEventListener('click', getDataElements);
   listProduct.addEventListener('click', getDataElements);

}

function getDataElements(event){
    if(event.target.classList.contains('bx-cart-alt')) {
        const elementHTML = event.target.parentElement.parentElement;
        selectData(elementHTML);
    };
}

function selectData(product){
    const productOBJ = {
        img: product.querySelector('img').src,
        title: product.querySelector('h3').textContent,
        price: parseFloat(product.querySelector('.new__price , .trick__price').textContent.replace('$', '')),
        id: product.querySelector('button[type="button"]').id
    }

    console.log(productOBJ)
}

// function getDataElements(e){
//     console.log(e.target.classList);
// }