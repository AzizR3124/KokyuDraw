/* =====================================
   MOBILE MENU
===================================== */


const menuBtn = document.querySelector(".menu-btn");

const closeBtn = document.querySelector(".close-menu");

const mobileMenu = document.querySelector(".mobile-menu");

const overlay = document.querySelector(".overlay");



menuBtn.addEventListener("click",()=>{

    mobileMenu.classList.add("active");

    overlay.classList.add("active");

});



closeBtn.addEventListener("click",()=>{

    mobileMenu.classList.remove("active");

    overlay.classList.remove("active");

});



overlay.addEventListener("click",()=>{

    mobileMenu.classList.remove("active");

    overlay.classList.remove("active");

});




// Tutup menu setelah klik link

document.querySelectorAll(".mobile-menu a").forEach(link=>{


    link.addEventListener("click",()=>{


        mobileMenu.classList.remove("active");

        overlay.classList.remove("active");


    });


});







/* =====================================
   DARK / LIGHT MODE
===================================== */


const themeBtn = document.querySelector(".theme-btn");

const themeIcon = themeBtn.querySelector("i");



// cek tema tersimpan

if(localStorage.getItem("theme") === "dark"){


    document.body.classList.add("dark");


    themeIcon.classList.remove("fa-moon");

    themeIcon.classList.add("fa-sun");


}





themeBtn.addEventListener("click",()=>{


    document.body.classList.toggle("dark");



    if(document.body.classList.contains("dark")){


        localStorage.setItem("theme","dark");


        themeIcon.classList.remove("fa-moon");

        themeIcon.classList.add("fa-sun");



    }else{


        localStorage.setItem("theme","light");


        themeIcon.classList.remove("fa-sun");

        themeIcon.classList.add("fa-moon");


    }


});








/* =====================================
   SCROLL REVEAL
===================================== */


const revealElements = document.querySelectorAll(
".section, .event-card, .gallery-item, .product-card, .about-content"
);



revealElements.forEach(element=>{


    element.classList.add("reveal");


});





function revealOnScroll(){


    revealElements.forEach(element=>{


        const windowHeight = window.innerHeight;


        const elementTop = element.getBoundingClientRect().top;


        const revealPoint = 120;



        if(elementTop < windowHeight - revealPoint){


            element.classList.add("show");


        }


    });



}



window.addEventListener(
"scroll",
revealOnScroll
);



revealOnScroll();







/* =====================================
   NAVBAR SHADOW ON SCROLL
===================================== */


const navbar = document.querySelector(".navbar");



window.addEventListener("scroll",()=>{


    if(window.scrollY > 50){


        navbar.style.boxShadow =
        "0 10px 30px rgba(0,0,0,.2)";


    }else{


        navbar.style.boxShadow =
        "0 5px 20px rgba(0,0,0,.08)";


    }



});







/* =====================================
   CLOSE MENU WITH ESC
===================================== */


document.addEventListener("keydown",(e)=>{


    if(e.key === "Escape"){


        mobileMenu.classList.remove("active");

        overlay.classList.remove("active");


    }


});