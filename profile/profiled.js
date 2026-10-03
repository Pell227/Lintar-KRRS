const data = "profileData";
const foto = "profileFoto";
const default_foto = "assets/profile.jpg";

const sumber = datamahasiswa.dataprofile[0];

const defaukt_profile = {
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
    const saved = JSON.parse(localStorage.getItem(data));
    return { ...default_profile, ...(saved || {}) };
  } catch (err) {
    return { ...default_profile };
  }
}

function saveProfileData(data) {
  localStorage.setItem(DATA_KEY, JSON.stringify(data));
}

function getProfileFoto() {
  try {
    return localStorage.getItem(FOTO_KEY);
  } catch (err) {
    return null;
  }
}

function saveProfileFoto(dataUrl) {
  localStorage.setItem(FOTO_KEY, dataUrl);
}

function removeProfileFoto() {
  localStorage.removeItem(FOTO_KEY);
}
