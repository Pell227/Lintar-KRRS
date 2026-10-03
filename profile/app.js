const profileImg = document.getElementById("profileImg");
const deleteBtn = document.getElementById("delbtn");
const toast = document.getElementById("toast");

function renderProfile() {
  const data = getProfileData();

  document.querySelectorAll("[data-field]").forEach((el) => {
    if (data[el.dataset.field] !== undefined) {
      el.textContent = data[el.dataset.field];
    }
  });

  profileImg.src = getProfileFoto() || default_foto;
}

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 3000);
}

deleteBtn.addEventListener("click", function () {
  const konfirmasi = confirm("Apakah Anda yakin ingin menghapus profil?");
  if (!konfirmasi) return;

  removeProfileFoto();
  profileImg.src = default_foto;
});

window.addEventListener("DOMContentLoaded", function () {
  renderProfile();

  const params = new URLSearchParams(location.search);
  if (params.get("saved") === "1") {
    showToast("Perubahan Telah Disimpan");
    history.replaceState(null, "", location.pathname);
  }
});
