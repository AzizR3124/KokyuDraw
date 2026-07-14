
// =========================
// SUPABASE CONNECTION
// =========================

const supabaseUrl = "https://dalxlbgqiczesidujcuf.supabase.co";

const supabaseKey = "sb_publishable_S74FfRR4HXhb2P2dkoZY1A_FitlYnRW";


const supabaseClient = window.supabase.createClient(
    supabaseUrl,
    supabaseKey
);


// =========================
// NAVBAR LOGIN / PROFILE
// =========================

const authMenu = document.getElementById("authMenu");


async function checkUser(){

    const { data } = await supabaseClient.auth.getSession();


    if(data.session){

        const user = data.session.user;


        const { data: profile } = await supabaseClient
            .from("users")
            .select("username")
            .eq("id", user.id)
            .single();



        if(profile){

            authMenu.innerHTML = `
                <a href="profile.html">
                    ${profile.username}
                </a>
            `;

        }else{

            authMenu.innerHTML = `
                <a href="profile.html">
                    Profile
                </a>
            `;

        }


    }else{


        authMenu.innerHTML = `
            <a href="login.html">
                Login
            </a>
        `;


    }

}


checkUser();

/* =====================================
   NOTIFICATION SYSTEM
===================================== */


const notificationBtn = document.querySelector(".notification-btn");
const notificationWrapper = document.querySelector(".notification-wrapper");



/* =========================
   OPEN / CLOSE DROPDOWN
========================= */


if(notificationBtn && notificationWrapper){


    notificationBtn.addEventListener("click",(e)=>{


        e.stopPropagation();


        // tidak ada notif tidak bisa klik

        if(!notificationBtn.classList.contains("has-notification")){

            return;

        }



        notificationWrapper.classList.toggle("active");


    });



    // klik luar tutup dropdown

    document.addEventListener("click",(e)=>{


        if(!notificationWrapper.contains(e.target)){


            notificationWrapper.classList.remove("active");


        }


    });


}




/* =========================
   LOAD NOTIFICATIONS
========================= */


async function loadNotifications(){



    const { data: sessionData } = await supabaseClient.auth.getSession();



    const session = sessionData.session;



    if(!session){

        return;

    }



    const userId = session.user.id;




    const { data, error } = await supabaseClient

        .from("notifications")

        .select("*")

        .eq("user_id", userId)

        .order("created_at", {

            ascending:false

        });



    if(error){

        console.log(error);

        return;

    }




    updateNotificationUI(data);



}




/* =========================
   UPDATE UI
========================= */


function updateNotificationUI(notifications){



    const count = document.querySelector(".notification-count");

    const bell = document.querySelector(".notification-btn");

    const box = document.querySelector(".notification-box");



    if(!count || !bell || !box){

        return;

    }




    const unread = notifications.filter(

        notif => notif.is_read === false

    );




    // =========================
    // ADA NOTIF
    // =========================


    if(unread.length > 0){



        count.textContent = unread.length;


        count.style.display = "flex";


        bell.classList.add(

            "has-notification"

        );



    }



    // =========================
    // TIDAK ADA NOTIF
    // =========================


    else{



        count.textContent = "";


        count.style.display = "none";


        bell.classList.remove(

            "has-notification"

        );



    }





    // =========================
    // ISI DROPDOWN
    // =========================



    const list = box.querySelector(".notification-list");



    if(!list){

        return;

    }



    list.innerHTML = "";





    if(notifications.length === 0){


        list.innerHTML = `

            <p class="empty-notification">

                Tidak ada notifikasi

            </p>

        `;


        return;


    }






    notifications.forEach(notif=>{


        list.innerHTML += `


        <a href="${notif.link || '#'}"

           class="notification-item">


            <div>


                <b>

                    ${notif.title}

                </b>



                <small>

                    ${notif.message}

                </small>



            </div>


        </a>



        `;



    });



}




// jalankan saat halaman dibuka

loadNotifications();