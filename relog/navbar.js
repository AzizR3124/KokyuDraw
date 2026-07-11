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