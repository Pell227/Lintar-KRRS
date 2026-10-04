const form = document.getElementById("editForm");
const fotoInput = document.getElementById("fotoInput");
const previewImg = document.getElementById("profileImg");
const cancelBtn = document.getElementById("cancelBtn");

const maximal = 2 * 1024 * 1024;

let pendingFoto = null;
let isDirty = false;

function fillForm() {
  const profile = getProfileData();

  form.querySelectorAll("[name]").forEach((el) => {
    el.value = profile[el.name] ?? "";
  });

  previewImg.src = getProfileFoto() || default_foto;
}

form.addEventListener("input", () => {
  isDirty = true;
});

fotoInput.addEventListener("change", function () {
  const file = this.files[0];
  if (!file) return;

  if (!file.type.startsWith("image/")) {
    alert("File yang dipilih harus berupa gambar.");
    this.value = "";
    return;
  }

  if (file.size > maximal) {
    alert("Ukuran foto maksimal 2 MB.");
    this.value = "";
    return;
  }

  const reader = new FileReader();
  reader.onload = function (e) {
    pendingFoto = e.target.result;
    previewImg.src = pendingFoto;
    isDirty = true;
  };
  reader.readAsDataURL(file);
});

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const profile = {};
  form.querySelectorAll("[name]").forEach((el) => {
    profile[el.name] = el.value.trim();
  });

  try {
    if (pendingFoto) saveProfileFoto(pendingFoto);
    saveProfileData(profile);
  } catch (err) {
    alert("Gagal menyimpan. Coba pilih foto dengan ukuran lebih kecil.");
    return;
  }

  isDirty = false;
  location.href = "../profile/index.html?saved=1";
});

cancelBtn.addEventListener("click", function (e) {
  if (isDirty && !confirm("Perubahan belum disimpan. Tetap keluar?")) {
    e.preventDefault();
  }
});

window.addEventListener("DOMContentLoaded", fillForm);
