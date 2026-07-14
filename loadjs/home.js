
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
    const themeText = themeBtn.querySelector("span");



    // cek tema tersimpan

    if(localStorage.getItem("theme") === "dark"){


        document.body.classList.add("dark");


        if(themeIcon){

            themeIcon.classList.remove("fa-moon");
            themeIcon.classList.add("fa-sun");

        }


        if(themeText){

            themeText.textContent = "Mode Siang";

        }


    }else{


        if(themeText){

            themeText.textContent = "Mode Malam";

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



            if(themeText){

                themeText.textContent = "Mode Siang";

            }




        }else{



            localStorage.setItem("theme","light");



            if(themeIcon){

                themeIcon.classList.remove("fa-sun");
                themeIcon.classList.add("fa-moon");

            }



            if(themeText){

                themeText.textContent = "Mode Malam";

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
/* =====================================
   FAVORITE PANEL
===================================== */


const favoriteBtn = document.querySelector(".favorite-btn");

const favoritePanel = document.querySelector(".favorite-panel");

const favoriteOverlay = document.querySelector(".favorite-overlay");

const closeFavorite = document.querySelector(".close-favorite");




// buka favorite

if(
    favoriteBtn &&
    favoritePanel &&
    favoriteOverlay
){


    favoriteBtn.addEventListener("click",()=>{


        favoritePanel.classList.add("active");

        favoriteOverlay.classList.add("active");


    });


}





// tutup favorite tombol X


if(
    closeFavorite &&
    favoritePanel &&
    favoriteOverlay
){


    closeFavorite.addEventListener("click",()=>{


        favoritePanel.classList.remove("active");

        favoriteOverlay.classList.remove("active");


    });


}





// tutup klik luar


if(favoriteOverlay){


    favoriteOverlay.addEventListener("click",()=>{


        favoritePanel.classList.remove("active");

        favoriteOverlay.classList.remove("active");


    });


}
const searchBtn = document.querySelector(".search-btn");
const searchModal = document.querySelector(".search-modal");
const closeSearch = document.querySelector(".close-search");


searchBtn.addEventListener("click",()=>{

    searchModal.classList.add("active");

});


closeSearch.addEventListener("click",()=>{

    searchModal.classList.remove("active");

});


searchModal.addEventListener("click",(e)=>{

    if(e.target === searchModal){

        searchModal.classList.remove("active");

    }

});
