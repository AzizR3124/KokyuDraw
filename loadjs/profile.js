// =========================
// LOAD PROFILE
// =========================
async function loadProfile(){
    // Menggunakan getSession() untuk mendapatkan user aktif
    const { data } = await supabaseClient.auth.getSession();

    if(!data.session){
        window.location.href = "login.html";
        return;
    }

    const user = data.session.user;

    // Ambil data profile dari tabel "users"
    const { data: profile, error } = await supabaseClient
        .from("users")
        .select("username, avatar, role, bio")
        .eq("id", user.id) // Pastikan kolom di database bernama 'id'
        .single();

    if(error){
        // Menampilkan pesan error secara detail di Console Browser (F12)
        console.error("Supabase Error:", error.message, error.details);
        return;
    }

    if(profile){
        // 1. Tampilkan Username
        document.getElementById("username").textContent = profile.username || "Username";

        // 2. Tampilkan Tag
        document.getElementById("userTag").textContent = profile.username ? "@" + profile.username : "@username";

        // 3. Tampilkan Role
        document.getElementById("roleBadge").textContent = profile.role || "User";

        // 4. Tampilkan Bio
        document.getElementById("profileBio").textContent = profile.bio || "No bio yet.";

        // 5. Tampilkan Avatar
        if(profile.avatar){
            document.getElementById("profileAvatar").src = profile.avatar;
        }
    }
}

// =========================
// FUNGSI TOMBOL LOGOUT (BARU)
// =========================
function initLogoutButton() {
    const logoutBtn = document.getElementById("logoutBtn");
    if(logoutBtn) {
        logoutBtn.addEventListener("click", async () => {
            const confirmLogout = confirm("Apakah Anda yakin ingin keluar?");
            if (!confirmLogout) return;

            const { error } = await supabaseClient.auth.signOut();
            if(error) {
                alert("Gagal logout: " + error.message);
            } else {
                alert("Berhasil keluar akun!");
                window.location.href = "login.html"; // Alihkan ke halaman login
            }
        });
    }
}

// Jalankan fungsi ketika halaman dimuat
document.addEventListener("DOMContentLoaded", () => {
    loadProfile();
    initLogoutButton();
});
