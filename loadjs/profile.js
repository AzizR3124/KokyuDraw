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



    // ambil data profile users

    const { data: profile, error } = await supabaseClient

    .from("users")

    .select(
        "username, avatar, role, bio"
    )

    .eq("id", user.id)

    .single();



    if(error){

        console.log(error);

        return;

    }



    if(profile){



        // username

        document.getElementById("username").textContent =
        profile.username || "Username";



        // tag

        document.getElementById("userTag").textContent =
        "@" + profile.username;



        // role

        document.getElementById("roleBadge").textContent =
        profile.role || "User";



        // bio

        document.getElementById("profileBio").textContent =
        profile.bio || "No bio yet.";



        // avatar

        if(profile.avatar){

            document.getElementById("profileAvatar").src =
            profile.avatar;

        }


    }


}



loadProfile();