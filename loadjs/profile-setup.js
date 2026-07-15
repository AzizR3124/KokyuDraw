// ==========================================================
// KOKYUDRAW PROFILE SETUP & MANAGEMENT
// ==========================================================

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
// GLOBAL USER
// =========================
let currentUser = null;

// =========================
// CHECK USER & INITIALIZATION
// =========================
async function checkUser(){
    const { data } = await supabaseClient.auth.getUser();

    if(!data.user){
        window.location.href = "login.html";
        return;
    }

    currentUser = data.user;
    
    // Jalankan fungsi setelah user dipastikan login
    loadProfile();
    initLogoutButton(); 
}

// Jalankan pengecekan setelah DOM selesai dimuat sepenuhnya
document.addEventListener("DOMContentLoaded", checkUser);

// =========================
// LOAD PROFILE DATA (ANTI-ERROR 406)
// =========================
async function loadProfile(){
    // Menggunakan maybeSingle() agar tidak memicu error 406 jika data baris users masih kosong (0 rows)
    const { data, error } = await supabaseClient
        .from("users")
        .select("*")
        .eq("id", currentUser.id)
        .maybeSingle(); 

    if(error){
        console.error("Gagal mengambil data dari tabel Supabase:", error.message, error.details);
        return;
    }

    // Menyelaraskan dengan ID yang ada di file HTML Anda
    const usernameEl = document.getElementById("username") || document.getElementById("profileUsername");
    const userTagEl = document.getElementById("userTag");
    const bioEl = document.getElementById("profileBio");
    const roleEl = document.getElementById("roleBadge");
    const avatarEl = document.getElementById("profileAvatar") || document.getElementById("avatarPreview");

    // Jika data user sudah terdaftar di database
    if(data){
        if(usernameEl) {
            if(usernameEl.tagName === "INPUT") usernameEl.value = data.username || "";
            else usernameEl.textContent = data.username || "Username";
        }
        if(userTagEl) userTagEl.textContent = data.username ? "@" + data.username : "@username";
        if(bioEl) {
            if(bioEl.tagName === "TEXTAREA" || bioEl.tagName === "INPUT") bioEl.value = data.bio || "";
            else bioEl.textContent = data.bio || "No bio yet.";
        }
        if(roleEl) roleEl.textContent = data.role || "User";
        
        if(data.avatar && avatarEl){
            avatarEl.src = data.avatar;
        }
    } 
    // Jika user baru pertama kali mendaftar (datanya belum ada di tabel users)
    else {
        console.log("User baru terdeteksi. Silakan isi profil pertama kali.");
        if(usernameEl && usernameEl.tagName === "INPUT") usernameEl.value = "";
        if(bioEl && (bioEl.tagName === "TEXTAREA" || bioEl.tagName === "INPUT")) bioEl.value = "";
    }
}

// =========================
// AVATAR PREVIEW (Preview instan saat memilih file)
// =========================
const avatarInput = document.getElementById("avatarInput");
const avatarPreview = document.getElementById("avatarPreview") || document.getElementById("profileAvatar");

if(avatarInput && avatarPreview){
    avatarInput.addEventListener("change", function(){
        const file = avatarInput.files[0];
        if(file){
            const reader = new FileReader();
            reader.onload = function(e){
                avatarPreview.src = e.target.result;
            };
            reader.readAsDataURL(file);
        }
    });
}

// =========================
// SAVE / UPDATE PROFILE (DENGAN UPLOAD GAMBAR KE STORAGE)
// =========================
async function saveProfile(){
    console.log("SAVE PROFILE CLICK");

    if(!currentUser){
        alert("User belum login");
        return;
    }

    // Mengambil nilai input teks
    const inputUsernameEl = document.getElementById("profileUsername") || document.getElementById("username");
    const inputBioEl = document.getElementById("profileBio");

    const username = inputUsernameEl ? inputUsernameEl.value.trim() : "";
    const bio = inputBioEl ? (inputBioEl.value || inputBioEl.textContent).trim() : "";

    if(username === ""){
        alert("Username wajib diisi");
        return;
    }

    // Variabel untuk menampung URL avatar baru jika ada upload
    let avatarUrl = null;

    // Ambil file dari input avatar (jika user memilih file baru)
    if (avatarInput && avatarInput.files.length > 0) {
        const file = avatarInput.files[0];

        // Tentukan nama file tujuan agar SELALU berakhiran .jpg sesuai policy
        const ext = file.name.split(".").pop();
const filePath = `public/${currentUser.id}.${ext}`;

console.log("Mengunggah gambar ke Storage:", filePath);

const { data: uploadData, error: uploadError } =
    await supabaseClient.storage
        .from("avatars")
        .upload(filePath, file, {
            upsert: true
        });

console.log("Upload Data:", uploadData);
console.log("Upload Error:", uploadError);

if (uploadError) {
    console.error(uploadError);
    alert(uploadError.message);
    return;
}
        // 2. Ambil Public URL setelah berhasil upload
        const { data: urlData } = supabaseClient.storage
            .from("avatars")
            .getPublicUrl(filePath);

        avatarUrl = urlData.publicUrl;
        console.log("Public URL didapatkan:", avatarUrl);
    }

    // Siapkan data untuk dikirim ke tabel users
    const updateData = {
        id: currentUser.id,
        username: username,
        bio: bio,
        role: "user"
    };

    // Jika user mengunggah foto baru, sertakan URL-nya untuk di-update ke database
    if (avatarUrl) {
        updateData.avatar = avatarUrl;
    }

    // 3. Simpan seluruh data ke tabel "users" (akan membuat baris baru jika belum terdaftar)
    const { error: dbError } = await supabaseClient
        .from("users")
        .upsert(updateData);

    if(dbError){
        console.error("Gagal menyimpan data ke tabel database:", dbError);
        alert("Error: " + dbError.message);
        return;
    }

    alert("Profile berhasil disimpan!");
    window.location.href = "profile.html";
}

// =========================
// SAVE BUTTON TRIGGER
// =========================
const saveProfileBtn = document.getElementById("saveProfileBtn");
if(saveProfileBtn){
    saveProfileBtn.addEventListener("click", saveProfile);
}

// =========================
// FUNGSI LOGOUT
// =========================
function initLogoutButton() {
    const logoutBtn = document.getElementById("logoutBtn");
    if(logoutBtn) {
        logoutBtn.addEventListener("click", async () => {
            const yakin = confirm("Apakah Anda yakin ingin logout dari KOKYUDRAW?");
            if (!yakin) return;

            const { error } = await supabaseClient.auth.signOut();
            if(error) {
                alert("Gagal logout: " + error.message);
            } else {
                alert("Berhasil logout!");
                window.location.href = "login.html";
            }
        });
    }
}
