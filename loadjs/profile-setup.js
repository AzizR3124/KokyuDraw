// ==========================================================
// KOKYUDRAW PROFILE SETUP
// ==========================================================


// =========================
// SUPABASE CONNECTION
// =========================

const supabaseUrl =
"https://dalxlbgqiczesidujcuf.supabase.co";


const supabaseKey =
"sb_publishable_S74FfRR4HXhb2P2dkoZY1A_FitlYnRW";


const supabaseClient =
window.supabase.createClient(
    supabaseUrl,
    supabaseKey
);




// =========================
// CHECK USER
// =========================

let currentUser = null;


async function checkUser(){


    const {
        data
    } = await supabaseClient.auth.getUser();



    if(!data.user){

        window.location.href =
        "login.html";

        return;

    }


    currentUser =
    data.user;


}


checkUser();





// =========================
// AVATAR PREVIEW
// =========================

const avatarInput =
document.getElementById("avatarInput");


const avatarPreview =
document.getElementById("avatarPreview");



if(avatarInput){


    avatarInput.addEventListener(
        "change",
        ()=>{


            const file =
            avatarInput.files[0];


            if(file){


                const reader =
                new FileReader();



                reader.onload =
                (e)=>{


                    avatarPreview.src =
                    e.target.result;


                }



                reader.readAsDataURL(file);


            }


        }
    );


}
