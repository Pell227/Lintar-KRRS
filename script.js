document.addEventListener('DOMContentLoaded', () => {
    checkUserSession();
    setupProtectedLinks();
});

function checkUserSession() {
    const sessionUser = localStorage.getItem('sessionUser');
    const authActions = document.getElementById('auth-actions');
    const mobileAuthActions = document.getElementById('mobile-auth-actions');

    if (sessionUser && authActions) {
        const user = JSON.parse(sessionUser);
        
        authActions.innerHTML = `
            <div class="user-session-info">
                <div class="user-details">
                    <span class="user-name">${user.nama || 'Mahasiswa'}</span>
                    <span class="user-id">${user.id || 'NIM'}</span>
                </div>
                <a href="Dashboard/index.html" class="btn-solid">Dashboard</a>
                <button onclick="logoutSession()" class="btn-outline">Keluar</button>
            </div>
        `;

        if (mobileAuthActions) {
            mobileAuthActions.innerHTML = `
                <div class="mobile-user-card">
                    <span class="mobile-user-name">${user.nama || 'Mahasiswa'}</span>
                    <span class="mobile-user-id">NIM: ${user.id || '-'}</span>
                </div>
                <a href="Dashboard/index.html" class="btn-mobile-solid">Dashboard</a>
                <button onclick="logoutSession()" class="btn-mobile-outline">Keluar</button>
            `;
        }
    }
}

function setupProtectedLinks() {
    const protectedRoutes = [
        'Hal_pengumuman/index.html',
        'Kalender_akademik/index.html',
        'Faq/index.html',
        'Dashboard/index.html',
        'profile/index.html',
        'KRRS/pengisian-krrs.html',
        'KRRS/rincian-krrs.html',
        'Jadwal/index.html'
    ];

    document.querySelectorAll('a').forEach(link => {
        const href = link.getAttribute('href');
        if (href && protectedRoutes.some(route => href.includes(route))) {
            link.addEventListener('click', (e) => {
                const sessionUser = localStorage.getItem('sessionUser');
                if (!sessionUser) {
                    e.preventDefault();
                    showToast('Silakan login terlebih dahulu untuk mengakses halaman ini.', 'error');
                    setTimeout(() => {
                        window.location.href = 'Login/login.html';
                    }, 800);
                }
            });
        }
    });
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
            menuIcon.className = 'fas fa-bars';
        } else {
            menuIcon.className = 'fas fa-times';
        }
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