// ==========================================================
// KOKYUDRAW PROFILE SETUP
// ==========================================================


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
// CHECK LOGIN
// =========================

async function checkUser(){


    const { data } =
    await supabaseClient.auth.getUser();



    if(!data.user){

        window.location.href =
        "login.html";

        return;

    }


    currentUser = data.user;


    loadProfile();


}




// =========================
// LOAD OLD PROFILE
// =========================

async function loadProfile(){


    const { data, error } =
    await supabaseClient
    .from("users")
    .select("*")
    .eq(
        "id",
        currentUser.id
    )
    .single();



    if(error){

        console.log(
            "PROFILE BELUM ADA",
            error.message
        );

        return;

    }



    if(data){


        document.getElementById(
            "profileUsername"
        ).value =
        data.username || "";



        document.getElementById(
            "profileBio"
        ).value =
        data.bio || "";


    }


}




// =========================
// AVATAR PREVIEW
// =========================

const avatarInput =
document.getElementById(
    "avatarInput"
);


const avatarPreview =
document.getElementById(
    "avatarPreview"
);



if(avatarInput){


    avatarInput.addEventListener(
        "change",
        function(){


            const file =
            avatarInput.files[0];


            if(file){


                const reader =
                new FileReader();


                reader.onload =
                function(e){


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
        "SAVE CLICK"
    );



    if(!currentUser){

        alert(
            "Belum login"
        );

        return;

    }



    const username =
    document.getElementById(
        "profileUsername"
    ).value.trim();



    const bio =
    document.getElementById(
        "profileBio"
    ).value.trim();



    if(username === ""){

        alert(
            "Username kosong"
        );

        return;

    }




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
        "Profile tersimpan"
    );


    window.location.href =
    "profile.html";


}




// =========================
// BUTTON
// =========================

document
.getElementById(
    "saveProfileBtn"
)
.addEventListener(
    "click",
    saveProfile
);




// START

checkUser();
