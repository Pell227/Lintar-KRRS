document.addEventListener('DOMContentLoaded', () => {
    checkUserSession();
    setupProtectedLinks();
});

function checkUserSession() {
    const sessionUser = localStorage.getItem('sessionUser');
    const authActions = document.getElementById('auth-actions');
    const heroActions = document.getElementById('hero-actions');

    if (sessionUser) {
        if (authActions) {
            authActions.innerHTML = `
                <button onclick="logoutSession()" class="btn-outline">Keluar</button>
            `;
        }

        if (heroActions) {
            heroActions.innerHTML = `
                <a href="Dashboard/index.html" class="btn-hero-primary">
                    <span>Dashboard</span>
                    <i class="fas fa-arrow-right"></i>
                </a>
                <a href="https://lintar.untar.ac.id" target="_blank" rel="noopener noreferrer" class="btn-hero-secondary">
                    Lintar
                </a>
            `;
        }
    } else {
        if (authActions) {
            authActions.innerHTML = `
                <a href="Login/login.html" class="btn-outline">Masuk Portal</a>
                <a href="Registrasi/registrasi.html" class="btn-solid">Daftar Akun</a>
            `;
        }

        if (heroActions) {
            heroActions.innerHTML = `
                <a href="Login/login.html" class="btn-hero-primary">
                    <span>Masuk Portal KRRS</span>
                    <i class="fas fa-arrow-right"></i>
                </a>
                <a href="https://lintar.untar.ac.id" target="_blank" rel="noopener noreferrer" class="btn-hero-secondary">
                    Lintar
                </a>
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