const dummyUsers = [
    {
        "id": "535250178",
        "password": "password123",
        "role": "mahasiswa",
        "nama": "Chrisento Salim",
        "email": "chrisento.535250178@stu.untar.ac.id",
        "fakultas": "Teknologi Informasi",
        "prodi": "Teknik Informatika"
    },
    {
        "id": "535250161",
        "password": "password123",
        "role": "mahasiswa",
        "nama": "Azzarqy Fizran M Nasrun",
        "email": "azzarqy.535250161@stu.untar.ac.id",
        "fakultas": "Teknologi Informasi",
        "prodi": "Teknik Informatika"
    },
    {
        "id": "535250166",
        "password": "password123",
        "role": "mahasiswa",
        "nama": "Felisia",
        "email": "felisia.535250166@stu.untar.ac.id",
        "fakultas": "Teknologi Informasi",
        "prodi": "Teknik Informatika"
    },
    {
        "id": "535250168",
        "password": "password123",
        "role": "mahasiswa",
        "nama": "Windriew Aeron Siaury",
        "email": "windriew.535250168@stu.untar.ac.id",
        "fakultas": "Teknologi Informasi",
        "prodi": "Teknik Informatika"
    }
];

function getAllUsers() {
    const localUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
    return [...dummyUsers, ...localUsers];
}

function togglePasswordVisibility(inputId, iconId) {
    const input = document.getElementById(inputId);
    const icon = document.getElementById(iconId);

    if (input && icon) {
        if (input.type === 'password') {
            input.type = 'text';
            icon.classList.remove('fa-eye');
            icon.classList.add('fa-eye-slash');
        } else {
            input.type = 'password';
            icon.classList.remove('fa-eye-slash');
            icon.classList.add('fa-eye');
        }
    }
}

function toggleResetView(showReset) {
    const loginView = document.getElementById('view-login');
    const resetView = document.getElementById('view-reset');

    if (showReset) {
        loginView.classList.add('hidden');
        resetView.classList.remove('hidden');
    } else {
        resetView.classList.add('hidden');
        loginView.classList.remove('hidden');
    }
}

function handleLogin(e) {
    e.preventDefault();
    const inputId = document.getElementById('login-id').value.trim();
    const inputPass = document.getElementById('login-password').value.trim();

    showToast('Memeriksa kredensial akun mahasiswa...', 'info');

    const allUsers = getAllUsers();

    const foundUser = allUsers.find(u => 
        (u.id.toLowerCase() === inputId.toLowerCase() || u.email.toLowerCase() === inputId.toLowerCase()) &&
        u.password === inputPass
    );

    if (foundUser) {
        localStorage.setItem('sessionUser', JSON.stringify(foundUser));
        showToast(`Login Berhasil! Selamat datang, ${foundUser.nama}.`, 'success');

        setTimeout(() => {
            window.location.href = "../landingpage/index.html";
        }, 1200);
    } else {
        showToast('NIM atau Kata Sandi salah!', 'error');
    }
}

function handleResetPassword(e) {
    e.preventDefault();
    const resetId = document.getElementById('reset-id').value.trim();
    const newPass = document.getElementById('reset-new-password').value.trim();

    const allUsers = getAllUsers();
    const userIndex = allUsers.findIndex(u => u.id.toLowerCase() === resetId.toLowerCase() || u.email.toLowerCase() === resetId.toLowerCase());

    if (userIndex !== -1) {
        allUsers[userIndex].password = newPass;
        localStorage.setItem('registeredUsers', JSON.stringify(allUsers));
        
        showToast('Kata sandi berhasil diperbarui! Silakan login.', 'success');
        setTimeout(() => {
            toggleResetView(false);
        }, 1200);
    } else {
        showToast('NIM atau Email tidak terdaftar dalam sistem.', 'error');
    }
}

function showToast(message, type = 'info') {
    const container = document.getElementById('toast-container');
    if (!container) return;

    const toast = document.createElement('div');
    let bgColor = type === 'success' ? 'bg-green-600' : (type === 'error' ? 'bg-[#a31313]' : 'bg-gray-800');
    let icon = type === 'success' ? 'fa-check-circle' : (type === 'error' ? 'fa-exclamation-circle' : 'fa-info-circle');

    toast.className = `${bgColor} text-[#ffffff] px-4 py-3 rounded-xl shadow-lg text-xs flex items-center gap-2 toast-enter`;
    toast.innerHTML = `<i class="fas ${icon}"></i> <span>${message}</span>`;

    container.appendChild(toast);

    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transition = 'opacity 0.3s ease';
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}