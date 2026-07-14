// ==========================================================
// KOKYUDRAW AUTH SYSTEM
// Register + Login + Supabase Auth
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
// PASSWORD TOGGLE
// =========================

document.querySelectorAll(".toggle-password")
.forEach(button => {


    button.addEventListener("click",()=>{


        const input =
        document.getElementById(
            button.dataset.target
        );


        const icon =
        button.querySelector("i");



        if(input.type === "password"){


            input.type = "text";


            icon.classList.replace(
                "fa-eye",
                "fa-eye-slash"
            );


        }else{


            input.type = "password";


            icon.classList.replace(
                "fa-eye-slash",
                "fa-eye"
            );


        }


    });


});





// =========================
// ERROR
// =========================

function setError(id,message){

    const el =
    document.getElementById(id);


    if(el){

        el.textContent = message;

    }

}



function clearError(){

    document
    .querySelectorAll(".error-text")
    .forEach(el=>{

        el.textContent="";

    });

}







// =========================
// REGISTER
// =========================

const registerBtn =
document.getElementById("registerBtn");



if(registerBtn){


registerBtn.addEventListener(
"click",
async()=>{


clearError();



const username =
document.getElementById("username")
.value.trim();


const email =
document.getElementById("registerEmail")
.value.trim();


const password =
document.getElementById("registerPassword")
.value;


const confirmPassword =
document.getElementById("confirmPassword")
.value;


const agree =
document.getElementById("agreeTerms")
.checked;



if(username.length < 3){

setError(
"usernameError",
"Username minimal 3 karakter."
);

return;

}



if(password.length < 8){

setError(
"passwordError",
"Password minimal 8 karakter."
);

return;

}



if(password !== confirmPassword){

setError(
"confirmPasswordError",
"Password tidak sama."
);

return;

}



if(!agree){

setError(
"termsError",
"Wajib menyetujui Terms & Privacy."
);

return;

}







registerBtn.disabled=true;

registerBtn.textContent=
"Creating Account...";





const {
data,
error

}=await supabaseClient.auth.signUp({

email,

password,

options:{


data:{


username

}


}


});





if(error){


alert(error.message);


registerBtn.disabled=false;

registerBtn.textContent=
"Create Account";


return;


}




alert(
"Registrasi berhasil. Cek email untuk verifikasi."
);



window.location.href=
"login.html";



});


}








// =========================
// LOGIN
// =========================

const loginBtn =
document.getElementById("loginBtn");



if(loginBtn){



loginBtn.addEventListener(
"click",
async()=>{


const email =
document.getElementById("loginEmail")
.value.trim();


const password =
document.getElementById("loginPassword")
.value;





if(!email || !password){


alert(
"Isi email dan password."
);


return;


}






const {
data,
error

}=await supabaseClient.auth
.signInWithPassword({

email,

password

});






if(error){


alert(error.message);


return;


}






if(!data.user.email_confirmed_at){


await supabaseClient.auth.signOut();


alert(
"Email belum diverifikasi."
);


return;


}







const {
data:profile

}=await supabaseClient
.from("users")
.select("*")
.eq(
"id",
data.user.id
)
.maybeSingle();







if(!profile){


window.location.href =
"profile-setup.html";


}else{


window.location.href =
"home.html";


}





});


}
// =========================
// PASSWORD STRENGTH
// =========================

const passwordInput =
document.getElementById("registerPassword");


if(passwordInput){


    passwordInput.addEventListener(
    "input",
    ()=>{


        const fill =
        document.getElementById("strengthFill");


        const text =
        document.getElementById("strengthText");


        let score = 0;


        const password =
        passwordInput.value;



        if(password.length >= 8)
            score++;


        if(/[A-Z]/.test(password))
            score++;


        if(/[a-z]/.test(password))
            score++;


        if(/[0-9]/.test(password))
            score++;




        if(score <= 1){


            fill.style.width = "25%";

            text.textContent =
            "Weak";


        }
        else if(score <= 3){


            fill.style.width = "60%";

            text.textContent =
            "Medium";


        }
        else{


            fill.style.width = "100%";

            text.textContent =
            "Strong";


        }


    });


}






// =========================
// SAVE PROFILE
// =========================

const saveBtn =
document.getElementById("saveProfileBtn");



if(saveBtn){


saveBtn.addEventListener(
"click",
async()=>{



    const username =
    document.getElementById(
    "profileUsername"
    )
    .value
    .trim();



    const bio =
    document.getElementById(
    "profileBio"
    )
    .value
    .trim();





    if(!username){


        alert(
        "Username wajib diisi!"
        );


        return;

    }






    saveBtn.disabled=true;

    saveBtn.innerHTML=
    "Saving...";






    let avatarUrl=null;





    // =========================
    // UPLOAD AVATAR
    // =========================


    const file =
    avatarInput.files[0];



    if(file){



        // cek format

        const allowedType =
        [
            "image/jpeg",
            "image/png",
            "image/webp"
        ];



        if(!allowedType.includes(file.type)){


            alert(
            "Format harus JPG, PNG, atau WEBP"
            );


            resetButton();

            return;


        }




        // cek ukuran

        if(file.size > 2 * 1024 * 1024){


            alert(
            "Ukuran maksimal 2MB"
            );


            resetButton();

            return;


        }





        const fileName =

        currentUser.id
        +
        "/"
        +
        Date.now()
        +
        "-"
        +
        file.name;






        const {
            error:uploadError

        } = await supabaseClient
        .storage
        .from("avatars")
        .upload(
            fileName,
            file
        );





        if(uploadError){


            alert(
            uploadError.message
            );


            resetButton();

            return;


        }






        const {
            data:urlData

        } =
        supabaseClient
        .storage
        .from("avatars")
        .getPublicUrl(
            fileName
        );



        avatarUrl =
        urlData.publicUrl;



    }








    // =========================
    // SAVE TABLE USERS
    // =========================


    const {
        error

    } =
    await supabaseClient
    .from("users")
    .insert({


        id:
        currentUser.id,


        username:
        username,


        avatar:
        avatarUrl,


        bio:
        bio,


        role:
        "user"


    });






    if(error){


        alert(
        error.message
        );


        resetButton();

        return;


    }





    alert(
    "Profile berhasil dibuat!"
    );



    window.location.href =
    "home.html";





});

}





// =========================
// BUTTON RESET
// =========================

function resetButton(){


    saveBtn.disabled=false;


    saveBtn.innerHTML=
    "Save Profile";


}