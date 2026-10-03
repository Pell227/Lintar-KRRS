document.addEventListener('DOMContentLoaded', () => {
    checkUserSession();
});

function checkUserSession() {
    const sessionUser = localStorage.getItem('sessionUser');
    const authActions = document.getElementById('auth-actions');
    const mobileAuthActions = document.getElementById('mobile-auth-actions');

    if (sessionUser && authActions) {
        const user = JSON.parse(sessionUser);
        
        authActions.innerHTML = `
            <div class="flex items-center gap-3">
                <div class="text-right hidden sm:block">
                    <span class="block text-xs font-bold text-[#ffffff]">${user.nama || 'Mahasiswa'}</span>
                    <span class="block text-[10px] text-red-200 font-semibold">${user.id || 'NIM'}</span>
                </div>
                <a href="../Dashboard/index.html" class="px-3 py-1.5 text-xs font-semibold text-[#a31313] bg-[#ffffff] hover:bg-red-50 rounded-xl transition">
                    Dashboard
                </a>
                <button onclick="logoutSession()" class="px-3 py-1.5 text-xs font-semibold text-[#ffffff] hover:bg-white/10 border border-white/40 rounded-xl transition">
                    Keluar
                </button>
            </div>
        `;

        if (mobileAuthActions) {
            mobileAuthActions.innerHTML = `
                <div class="p-3 bg-red-900/40 rounded-xl mb-2 text-[#ffffff]">
                    <span class="block text-xs font-bold">${user.nama || 'Mahasiswa'}</span>
                    <span class="block text-[10px] text-red-200 font-semibold">NIM: ${user.id || '-'}</span>
                </div>
                <a href="../Dashboard/index.html" class="block w-full text-center py-2 text-xs font-semibold text-[#a31313] bg-[#ffffff] rounded-xl mb-1">Dashboard</a>
                <button onclick="logoutSession()" class="w-full text-center py-2 text-xs font-semibold text-[#ffffff] border border-white/40 rounded-xl">Keluar</button>
            `;
        }
    }
}

function logoutSession() {
    localStorage.removeItem('sessionUser');
    showToast('Anda telah keluar dari sesi.', 'info');
    setTimeout(() => {
        window.location.reload();
    }, 800);
}

function toggleMobileMenu() {
    const mobileMenu = document.getElementById('mobile-menu');
    const menuIcon = document.getElementById('menu-icon');

    if (mobileMenu) {
        mobileMenu.classList.toggle('hidden');
        if (mobileMenu.classList.contains('hidden')) {
            menuIcon.className = 'fas fa-bars text-lg';
        } else {
            menuIcon.className = 'fas fa-times text-lg';
        }
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