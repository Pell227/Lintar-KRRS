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
        bar.className = 'h-full w-0 transition-all duration-300 bg-gray-200';
        text.textContent = 'Kekuatan password: -';
    } else if (strength <= 25) {
        bar.className = 'h-full transition-all duration-300 bg-red-500';
        text.textContent = 'Kekuatan password: Lemah';
        text.className = 'text-[10px] text-red-500 font-medium';
    } else if (strength <= 50) {
        bar.className = 'h-full transition-all duration-300 bg-yellow-500';
        text.textContent = 'Kekuatan password: Sederhana';
        text.className = 'text-[10px] text-yellow-600 font-medium';
    } else if (strength <= 75) {
        bar.className = 'h-full transition-all duration-300 bg-blue-500';
        text.textContent = 'Kekuatan password: Baik';
        text.className = 'text-[10px] text-blue-500 font-medium';
    } else {
        bar.className = 'h-full transition-all duration-300 bg-green-500';
        text.textContent = 'Kekuatan password: Sangat Kuat';
        text.className = 'text-[10px] text-green-600 font-medium';
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

    let existingUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
    const isExist = existingUsers.some(u => u.id === nim);
    if (isExist) {
        showToast('NIM ini sudah terdaftar!', 'error');
        return;
    }

    existingUsers.push(newUser);
    localStorage.setItem('registeredUsers', JSON.stringify(existingUsers));

    showToast('Pendaftaran akun berhasil! Mengalihkan ke halaman login...', 'success');
    
    setTimeout(() => {
        window.location.href = "../Login/login.html";
    }, 1200);
}

function showToast(message, type = 'info') {
    const container = document.getElementById('toast-container');
    if (!container) return;

    const toast = document.createElement('div');
    let bgColor = type === 'success' ? 'bg-green-600' : (type === 'error' ? 'bg-red-600' : 'bg-gray-800');
    let icon = type === 'success' ? 'fa-check-circle' : (type === 'error' ? 'fa-exclamation-circle' : 'fa-info-circle');

    toast.className = `${bgColor} text-white px-4 py-3 rounded-xl shadow-lg text-xs flex items-center gap-2 toast-enter`;
    toast.innerHTML = `<i class="fas ${icon}"></i> <span>${message}</span>`;

    container.appendChild(toast);

    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transition = 'opacity 0.3s ease';
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}