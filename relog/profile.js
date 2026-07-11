

// =========================
// LOAD PROFILE
// =========================

async function loadProfile(){


    const { data } = await supabaseClient.auth.getSession();


    if(!data.session){

        window.location.href = "login.html";

        return;

    }



    const user = data.session.user;



    // tampilkan email

    document.getElementById("email").textContent = user.email;



    // ambil username dari tabel users

    const { data: profile, error } = await supabaseClient
    .from("users")
    .select("username")
    .eq("id", user.id)
    .single();



    if(profile){

        document.getElementById("username").textContent =
        profile.username;

    }


}


loadProfile();



// =========================
// LOGOUT
// =========================

const logoutBtn = document.getElementById("logoutBtn");


if(logoutBtn){

    logoutBtn.addEventListener("click", async()=>{


        await supabaseClient.auth.signOut();


        window.location.href = "login.html";


    });

}