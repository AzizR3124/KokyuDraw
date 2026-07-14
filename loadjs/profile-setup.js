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
// GLOBAL USER
// =========================

let currentUser = null;



// =========================
// CHECK USER
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



checkUser();




// =========================
// LOAD PROFILE DATA
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

        console.log(error);
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
        "SAVE PROFILE CLICK"
    );



    if(!currentUser){

        alert(
            "User belum login"
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
            "Username wajib diisi"
        );


        return;

    }




    .from("users")
.update({
    username: username,
    bio: bio
})
.eq("id", currentUser.id);



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
// SAVE BUTTON
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
