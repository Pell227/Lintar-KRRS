function getAllUsers() {
    let initialUsers = [];
    if (typeof dummyUsers !== 'undefined') {
        initialUsers = dummyUsers.users || dummyUsers.user || (Array.isArray(dummyUsers) ? dummyUsers : []);
    }
    const localUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
    return [...initialUsers, ...localUsers];
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
    const inputEmail = document.getElementById('login-email').value.trim().toLowerCase();
    const inputPass = document.getElementById('login-password').value.trim();

    showToast('Memeriksa kredensial akun mahasiswa...', 'info');

    const allUsers = getAllUsers();

    const foundUser = allUsers.find(u => {
        const email = (u.email || '').toLowerCase();
        const id = (u.id || '').toLowerCase();
        return (email === inputEmail || id === inputEmail) && u.password === inputPass;
    });

    if (foundUser) {
        localStorage.setItem('sessionUser', JSON.stringify(foundUser));
        showToast(`Login Berhasil! Selamat datang, ${foundUser.nama}.`, 'success');

        setTimeout(() => {
            window.location.href = "../Hal_pengumuman/index.html";
        }, 1200);
    } else {
        showToast('Email/NIM atau Kata Sandi salah!', 'error');
    }
}

function handleResetPassword(e) {
    e.preventDefault();
    const resetEmail = document.getElementById('reset-email').value.trim().toLowerCase();
    const newPass = document.getElementById('reset-new-password').value.trim();

    const allUsers = getAllUsers();
    const userIndex = allUsers.findIndex(u => {
        const email = (u.email || '').toLowerCase();
        const id = (u.id || '').toLowerCase();
        return email === resetEmail || id === resetEmail;
    });

    if (userIndex !== -1) {
        allUsers[userIndex].password = newPass;
        localStorage.setItem('registeredUsers', JSON.stringify(allUsers));
        
        showToast('Kata sandi berhasil diperbarui! Silakan login.', 'success');
        setTimeout(() => {
            toggleResetView(false);
        }, 1200);
    } else {
        showToast('Email/NIM tidak terdaftar dalam sistem.', 'error');
    }
}

function showToast(message, type = 'info') {
    const container = document.getElementById('toast-container');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = `toast toast-${type} toast-enter`;
    
    let iconClass = 'fa-info-circle';
    if (type === 'success') iconClass = 'fa-check-circle';
    if (type === 'error') iconClass = 'fa-exclamation-circle';

    toast.innerHTML = `<i class="fas ${iconClass}"></i> <span>${message}</span>`;
    container.appendChild(toast);

    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transition = 'opacity 0.3s ease';
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}