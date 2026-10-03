const listpengumuman = document.getElementById("listpengumuman");
const jum_peng = 3;

function buatItemPengumuman(item) {
  const li = document.createElement("li");
  li.className = "pengumuman-item";

  const meta = document.createElement("div");
  meta.className = "pengumuman-meta";

  const badge = document.createElement("span");
  badge.className = "pengumuman-badge";
  badge.textContent = item.kategori;

  const tanggal = document.createElement("span");
  tanggal.textContent = item.tanggal;

  meta.append(badge, tanggal);

  const judul = document.createElement("h4");
  judul.textContent = item.judul;

  const ringkasan = document.createElement("p");
  ringkasan.textContent = item.ringkasan;

  li.append(meta, judul, ringkasan);
  return li;
}

function renderPengumuman() {
  const terbaru = dataPengumuman.pengumuman.slice(0, jum_peng);

  if (terbaru.length === 0) {
    const kosong = document.createElement("li");
    kosong.className = "pengumuman-empty";
    kosong.textContent = "Tidak ada pengumuman";
    listpengumuman.append(kosong);
    return;
  }

  terbaru.forEach((item) => listpengumuman.append(buatItemPengumuman(item)));
}

renderPengumuman();
