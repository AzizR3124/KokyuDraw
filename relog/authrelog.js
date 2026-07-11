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
// REGISTER
// =========================

const registerBtn = document.getElementById("registerBtn");


if(registerBtn){

    registerBtn.addEventListener("click", async()=>{


        const username = document.getElementById("username").value;

        const email = document.getElementById("registerEmail").value;

        const password = document.getElementById("registerPassword").value;



        if(!username || !email || !password){

            alert("Lengkapi semua data!");

            return;

        }



        // Membuat akun Auth Supabase

        const { data, error } = await supabaseClient.auth.signUp({

            email: email,

            password: password

        });


        console.log("REGISTER DATA:", data);

        console.log("REGISTER ERROR:", error);



        if(error){

            alert(error.message);

            return;

        }



        // Masukkan data profile ke tabel users

        const { error: profileError } = await supabaseClient.from("users").insert({

            id: data.user.id,

            username: username,

            role: "user"

        });



        console.log("PROFILE ERROR:", profileError);



        if(profileError){

            alert(profileError.message);

            return;

        }



        alert("Daftar berhasil!");

        window.location.href = "login.html";


    });

}





// =========================
// LOGIN
// =========================


const loginBtn = document.getElementById("loginBtn");


if(loginBtn){

    loginBtn.addEventListener("click", async()=>{


        const email = document.getElementById("loginEmail").value;

        const password = document.getElementById("loginPassword").value;



        if(!email || !password){

            alert("Isi email dan password!");

            return;

        }



        const { data, error } = await supabaseClient.auth.signInWithPassword({

            email: email,

            password: password

        });



        console.log("LOGIN DATA:", data);

        console.log("LOGIN ERROR:", error);



        if(error){

            alert(error.message);

            return;

        }



        alert("Login berhasil!");

        window.location.href = "index.html";


    });

}