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
const contentProducts = document.querySelector('#contentProducts');
const emptyCart = document.querySelector('#emptyCart');

let productsArray = [];


document.addEventListener('DOMContentLoaded', function() {
    
    EventListener();

});



function EventListener(){
   listProducts.addEventListener('click', getDataElements);
   listProduct.addEventListener('click', getDataElements);

   emptyCart.addEventListener('click', function(){
    productsArray = [];
    productHTML();
    updateCarCount();
    updatetotal();
   })

   const loadproduct = localStorage.getItem('products');
   if (loadproduct){
     productsArray = JSON.parse(loadproduct);
     productHTML();
     updateCarCount();
     updatetotal();
   }else{
    productsArray = [];
   }
}

function updateCarCount(){
    const cartCount = document.querySelector('#cartCount');
    cartCount.textContent = productsArray.length;
}

function updatetotal() {
    const total = document.querySelector('#total');
    let totalProduct = productsArray.reduce((total, product) => total + product.price * product.quantity, 0);
    total.textContent = `$${totalProduct.toFixed(2)}`;
}


function getDataElements(event){
    if(event.target.classList.contains('bx-cart-alt')) {
        const elementHTML = event.target.parentElement.parentElement;
        selectData(elementHTML);
    }
}

function selectData(product){
    const productOBJ = {
        img: product.querySelector('img').src,
        title: product.querySelector('h3').textContent,
        price: parseFloat(product.querySelector('.new__price , .trick__price').textContent.replace('$', '')),
        id: parseInt(product.querySelector('.button').dataset.id),
        quantity:1
    }

    const exist = productsArray.some(product => product.id === productOBJ.id);
    if (exist){
        showAlert('El producto ya existe en el carrito', 'error');
        return;
    }
    productsArray = [...productsArray, productOBJ];
    // console.log(productsArray);
    showAlert('El producto fue añadido al carrito', 'success');
    productHTML();
    updateCarCount();
    updatetotal();
}

function productHTML(){
    cleanhtml();
    productsArray.forEach(product =>{
        const {img, title, price, quantity, id} = product;

        const tr = document.createElement('tr');
        const tdImg = document.createElement('td');
        const prodImg = document.createElement('img');
        prodImg.src = img;
        prodImg.alt = 'image product'
        tdImg.appendChild(prodImg);

        const tdTitle = document.createElement('td');
        const producttitle = document.createElement('p');
        producttitle.textContent=title;
        tdTitle.appendChild(producttitle);

        const tdprice = document.createElement('td');
        const productprice = document.createElement('p');
        const newPrice = price * quantity;
        productprice.textContent= `$${newPrice.toFixed(2)}`;
        tdprice.appendChild(productprice);

        const tdQuantity = document.createElement('td');
        const productQuantity = document.createElement('input');
        productQuantity.type='number';
        productQuantity.min='1';
        productQuantity.value=quantity;
        productQuantity.dataset.id = id;
        productQuantity.oninput = updatequantity;
        tdQuantity.appendChild(productQuantity);

        const tdDelete = document.createElement('td');
        const productDelete = document.createElement('button');
        productDelete.type = 'button';
        productDelete.textContent = 'X';
        productDelete.onclick = () => destroyprodct(id);
        tdDelete.appendChild(productDelete);

        tr.append(tdImg, tdTitle, tdprice, tdQuantity, tdDelete);
        contentProducts.appendChild(tr);

    })
    savelocalsto();
}

function savelocalsto(){
    localStorage.setItem('products', JSON.stringify(productsArray));

}


 function cleanhtml(){
        contentProducts.innerHTML = '';
    }


    function updatequantity(event){
    const newQuantity = parseInt(event.target.value, 10);
    const idProd = parseInt(event.target.dataset.id, 10);

    const product1 = productsArray.find(product => product.id === idProd);
    if (product1 && newQuantity >0){
        product1.quantity = newQuantity;
    }
    productHTML();
    updatetotal();
    savelocalsto();
}

function destroyprodct(idproduct){
    productsArray = productsArray.filter(product => product.id !== idproduct);
    showAlert('El producto fue eliminado del carrito', 'success');
    productHTML();
    updateCarCount();
    updatetotal();
    savelocalsto();
}


    function showAlert(message, type){
        const nonrepetalert = document.querySelector('.alert');
        if (nonrepetalert) nonrepetalert.remove();
        const div = document.createElement('div');
        div.classList.add('alert',type);
        div.textContent = message;

        document.body.appendChild(div);

        setTimeout(() => div.remove(), 1000);
    }