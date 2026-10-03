const data_key = "profileData";
const foto_key = "profileFoto";
const default_foto = new URL("assets/profile.jpg", document.currentScript.src)
  .href;

const sumber = datamahasiswa.dataprofile[0];

const default_profile = {
  nama: sumber.nama,
  nim: sumber.nim,
  ttl: sumber.ttl,
  fakultas: sumber.Fakultas,
  jurusan: sumber.jurusan,
  jk: sumber.jk,
  agama: sumber.agama,
  hp: sumber.hp,
  email: sumber.email,
  sekolah: sumber.sekolah,
  ijazah: sumber.ijazah,
  tglijazah: sumber.tglijazah,
  namaortu: sumber.namaortu,
  alamat: sumber.alamat,
  hportu: sumber.hpo,
};

function getProfileData() {
  try {
    const saved = JSON.parse(localStorage.getItem(data_key));
    return { ...default_profile, ...(saved || {}) };
  } catch (err) {
    return { ...default_profile };
  }
}

function saveProfileData(profile) {
  localStorage.setItem(data_key, JSON.stringify(profile));
}

function getProfileFoto() {
  try {
    return localStorage.getItem(foto_key);
  } catch (err) {
    return null;
  }
}

function saveProfileFoto(dataUrl) {
  localStorage.setItem(foto_key, dataUrl);
}

function removeProfileFoto() {
  localStorage.removeItem(foto_key);
}
