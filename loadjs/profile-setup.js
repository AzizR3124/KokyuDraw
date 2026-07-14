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
// =========================
// SAVE PROFILE
// =========================

async function saveProfile(){


    console.log("SAVE DIKLIK");


    if(!currentUser){

        alert("User belum login");
        return;

    }



    const usernameInput =
    document.getElementById("username");


    const bioInput =
    document.getElementById("bio");



    if(!usernameInput || !bioInput){

        alert("Input profile tidak ditemukan");
        return;

    }



    const username =
    usernameInput.value.trim();


    const bio =
    bioInput.value.trim();



    if(username === ""){

        alert("Username wajib diisi");
        return;

    }



    const { error } =
    await supabaseClient
    .from("users")
    .update({

        username: username,
        bio: bio

    })
    .eq(
        "id",
        currentUser.id
    );



    if(error){

        console.log(error);
        alert(
            "Gagal menyimpan: " 
            + error.message
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
// BUTTON SAVE EVENT
// =========================

const saveProfileBtn =
document.getElementById(
    "saveProfileBtn"
);



if(saveProfileBtn){


    saveProfileBtn.addEventListener(
        "click",
        saveProfile
    );


}
