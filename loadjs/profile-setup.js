// =========================
// SUPABASE
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
// USER
// =========================

let currentUser = null;



// =========================
// CHECK USER
// =========================

async function init(){

    const { data, error } =
    await supabaseClient.auth.getUser();


    if(error || !data.user){

        window.location.href = "login.html";
        return;

    }


    currentUser = data.user;


    console.log(
        "LOGIN USER:",
        currentUser.id
    );


}



init();




// =========================
// AVATAR PREVIEW
// =========================

const avatarInput =
document.getElementById("avatarInput");


const avatarPreview =
document.getElementById("avatarPreview");


if(avatarInput && avatarPreview){

    avatarInput.addEventListener(
        "change",
        ()=>{

            const file =
            avatarInput.files[0];


            if(file){

                const reader =
                new FileReader();


                reader.onload =
                e=>{

                    avatarPreview.src =
                    e.target.result;

                };


                reader.readAsDataURL(file);

            }

        }
    );

}




// =========================
// SAVE PROFILE
// =========================

async function saveProfile(){


    console.log(
        "SAVE BUTTON CLICK"
    );


    if(!currentUser){

        alert(
            "User belum siap"
        );

        return;

    }



    const username =
    document.getElementById(
        "profileUsername"
    ).value;



    const bio =
    document.getElementById(
        "profileBio"
    ).value;



    const { error } =
    await supabaseClient
    .from("users")
    .upsert({

        id: currentUser.id,
        username: username,
        bio: bio,
        role: "user"

    });



    if(error){

        console.log(error);

        alert(
            error.message
        );

        return;

    }



    alert(
        "Profile berhasil disimpan"
    );


    window.location.href =
    "profile.html";


}




// =========================
// BUTTON
// =========================

window.addEventListener(
"DOMContentLoaded",
()=>{


    const btn =
    document.getElementById(
        "saveProfileBtn"
    );


    console.log(
        "BUTTON:",
        btn
    );



    if(btn){

        btn.addEventListener(
            "click",
            saveProfile
        );

    }


});
