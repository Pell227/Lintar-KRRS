const fotoInput = document.getElementById("fotoInput");
const profileImg = document.getElementById("profileImg");

fotoInput.addEventListener("change", function () {
  const file = this.files[0];
  if (!file) return;

  if (!file.type.startsWith("image/")) {
    alert("File yang dipilih harus berupa gambar.");
    return;
  }

  const reader = new FileReader();
  reader.onload = function (e) {
    profileImg.src = e.target.result;
    localStorage.setItem("profileFoto", e.target.result);
  };
  reader.readAsDataURL(file);
});

const editBtn = document.getElementById("editBtn");
const editableCells = document.querySelectorAll(".editval");
let isEditing = false;

editBtn.addEventListener("click", function () {
  isEditing = !isEditing;

  editableCells.forEach((td) => {
    td.contentEditable = isEditing;
    td.classList.toggle("editing", isEditing);
  });

  if (isEditing) {
    editBtn.textContent = "Simpan Profil";
    editableCells[0].focus();
  } else {
    editBtn.textContent = "Edit Profil";
    saveProfileData();
    alert("Perubahan profil berhasil disimpan.");
  }
});

function saveProfileData() {
  const data = {};
  editableCells.forEach((td) => {
    data[td.dataset.field] = td.textContent.trim();
  });
  localStorage.setItem("profileData", JSON.stringify(data));
}

function loadProfileData() {
  const saved = localStorage.getItem("profileData");
  if (!saved) return;

  const data = JSON.parse(saved);
  editableCells.forEach((td) => {
    if (data[td.dataset.field] !== undefined) {
      td.textContent = data[td.dataset.field];
    }
  });
}

window.addEventListener("DOMContentLoaded", function () {
  const savedFoto = localStorage.getItem("profileFoto");
  if (savedFoto) profileImg.src = savedFoto;

  loadProfileData();
});
