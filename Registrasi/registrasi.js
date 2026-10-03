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

function handleRegister(e) {
    e.preventDefault();

    const nama = document.getElementById('reg-nama').value.trim();
    const nim = document.getElementById('reg-nim').value.trim();
    const email = document.getElementById('reg-email').value.trim();
    const fakultas = document.getElementById('reg-fakultas').value;
    const prodi = document.getElementById('reg-prodi').value.trim();
    const password = document.getElementById('reg-password').value.trim();

    const newUser = {id: nim,password: password,role: "mahasiswa",nama: nama,email: email,fakultas: fakultas,prodi: prodi};

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