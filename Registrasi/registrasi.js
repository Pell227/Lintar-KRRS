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

function checkPasswordStrength(password) {
    const bar = document.getElementById('strength-bar');
    const text = document.getElementById('strength-text');
    
    if (!bar || !text) return;

    let strength = 0;
    if (password.length >= 6) strength += 25;
    if (password.match(/[a-z]/) && password.match(/[A-Z]/)) strength += 25;
    if (password.match(/\d/)) strength += 25;
    if (password.match(/[^a-zA-Z0-9]/)) strength += 25;

    bar.style.width = strength + '%';

    if (strength === 0) {
        bar.className = 'strength-bar-fill strength-empty';
        text.textContent = 'Kekuatan password: -';
        text.className = 'strength-text';
    } else if (strength <= 25) {
        bar.className = 'strength-bar-fill strength-weak';
        text.textContent = 'Kekuatan password: Lemah';
        text.className = 'strength-text text-weak';
    } else if (strength <= 50) {
        bar.className = 'strength-bar-fill strength-medium';
        text.textContent = 'Kekuatan password: Sederhana';
        text.className = 'strength-text text-medium';
    } else if (strength <= 75) {
        bar.className = 'strength-bar-fill strength-good';
        text.textContent = 'Kekuatan password: Baik';
        text.className = 'strength-text text-good';
    } else {
        bar.className = 'strength-bar-fill strength-strong';
        text.textContent = 'Kekuatan password: Sangat Kuat';
        text.className = 'strength-text text-strong';
    }
}

function handleRegister(e) {
    e.preventDefault();

    const nama = document.getElementById('reg-nama').value.trim();
    const nim = document.getElementById('reg-nim').value.trim();
    const email = document.getElementById('reg-email').value.trim();
    const fakultas = document.getElementById('reg-fakultas').value;
    const prodi = document.getElementById('reg-prodi').value.trim();
    const password = document.getElementById('reg-password').value.trim();

    const newUser = {
        id: nim,
        password: password,
        role: "mahasiswa",
        nama: nama,
        email: email,
        fakultas: fakultas,
        prodi: prodi
    };

    const initialUsers = typeof dummyUsers !== 'undefined' ? dummyUsers : [];
    let existingUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
    const allUsers = [...initialUsers, ...existingUsers];

    const isExist = allUsers.some(u => u.id === nim || u.email.toLowerCase() === email.toLowerCase());
    if (isExist) {
        showToast('NIM atau Email ini sudah terdaftar!', 'error');
        return;
    }

    existingUsers.push(newUser);
    localStorage.setItem('registeredUsers', JSON.stringify(existingUsers));

    showToast('Pendaftaran akun mahasiswa berhasil! Mengalihkan ke halaman login...', 'success');
    
    setTimeout(() => {
        window.location.href = "../Login/login.html";
    }, 1000);
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