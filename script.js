/* =====================================
   MOBILE MENU
===================================== */

const menuBtn = document.querySelector(".menu-btn");
const closeBtn = document.querySelector(".close-menu");
const mobileMenu = document.querySelector(".mobile-menu");
const overlay = document.querySelector(".overlay");


if(menuBtn && mobileMenu && overlay){

    menuBtn.addEventListener("click",()=>{

        mobileMenu.classList.add("active");
        overlay.classList.add("active");

    });

}


if(closeBtn && mobileMenu && overlay){

    closeBtn.addEventListener("click",()=>{

        mobileMenu.classList.remove("active");
        overlay.classList.remove("active");

    });

}


if(overlay && mobileMenu){

    overlay.addEventListener("click",()=>{

        mobileMenu.classList.remove("active");
        overlay.classList.remove("active");

    });

}



// Tutup menu setelah klik link

document.querySelectorAll(".mobile-menu a").forEach(link=>{

    link.addEventListener("click",()=>{

        if(mobileMenu && overlay){

            mobileMenu.classList.remove("active");
            overlay.classList.remove("active");

        }

    });

});







/* =====================================
   DARK / LIGHT MODE
===================================== */


const themeBtn = document.querySelector(".theme-btn");


if(themeBtn){


    const themeIcon = themeBtn.querySelector("i");



    if(localStorage.getItem("theme") === "dark"){


        document.body.classList.add("dark");


        if(themeIcon){

            themeIcon.classList.remove("fa-moon");
            themeIcon.classList.add("fa-sun");

        }

    }



    themeBtn.addEventListener("click",()=>{


        document.body.classList.toggle("dark");



        if(document.body.classList.contains("dark")){


            localStorage.setItem("theme","dark");


            if(themeIcon){

                themeIcon.classList.remove("fa-moon");
                themeIcon.classList.add("fa-sun");

            }



        }else{


            localStorage.setItem("theme","light");


            if(themeIcon){

                themeIcon.classList.remove("fa-sun");
                themeIcon.classList.add("fa-moon");

            }


        }


    });


}







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
   NAVBAR SHADOW
===================================== */


const navbar = document.querySelector(".navbar");


if(navbar){


    window.addEventListener("scroll",()=>{


        if(window.scrollY > 50){


            navbar.style.boxShadow =
            "0 10px 30px rgba(0,0,0,.2)";


        }else{


            navbar.style.boxShadow =
            "0 5px 20px rgba(0,0,0,.08)";


        }


    });


}







/* =====================================
   CLOSE MENU WITH ESC
===================================== */


document.addEventListener("keydown",(e)=>{


    if(e.key === "Escape"){

        if(mobileMenu && overlay){

            mobileMenu.classList.remove("active");
            overlay.classList.remove("active");

        }

    }


});
