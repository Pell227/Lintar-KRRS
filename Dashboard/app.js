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

function buatEL(tag, className, text) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text !== undefined) node.textContent = text;
  return node;
}

const hari = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];

function pecahJadwal(course) {
  const [hari, jam] = course.jadwal.split(",").map((teks) => teks.trim());
  return { hari, jam, mulai: jam.split("-")[0].trim() };
}

function kuliahhari(namaHari) {
  return krrsCourses
    .map((course) => ({ ...course, ...pecahJadwal(course) }))
    .filter((course) => course.hari.toLowerCase() === namaHari.toLowerCase())
    .sort((a, b) => a.mulai.localeCompare(b.mulai));
}

function renderjhi() {
  const indekshi = new Date().getDay();
  const hariIni = hari[indekshi];
  const lest = document.getElementById("listjadwal");

  document.getElementById("jadwalHari").textContent = hariIni;

  const kulhi = kuliahhari(hariIni);

  if (kulhi.length > 0) {
    kulhi.forEach((course) => {
      const li = buatEL("li", "jadwal-item");
      const info = buatEL("div");
      info.append(
        buatEL("span", "jadwal-nama", course.name),
        buatEL(
          "span",
          "jadwal-ruang",
          `${course.ruang}, kelas ${course.kelas}`,
        ),
      );
      li.append(buatEL("span", "jadwal-jam", course.jam), info);
      lest.append(li);
    });
    return;
  }

  const zero = buatEL("li", "jadwal-kosong", "No Schedule");
  lest.append(zero);

  for (let selisih = 1; selisih <= 7; selisih++) {
    const harii = hari[(indekshi + selisih) % 7];
    const next = kuliahhari(harii)[0];
    if (next) {
      zero.textContent = `No Schedule Today, Next Schedule: ${harii}, ${next.mulai} (${next.name}).`;
      break;
    }
  }
}

function countkhs() {
  const nim = datamahasiswa.dataprofile[0].nim;
  const bobotHuruf = dataNilai.skalaNilai;

  const sksPerKode = {};
  dataNilai.mataKuliahLalu.forEach((mk) => (sksPerKode[mk.code] = mk.sks));
  krrsCourses.forEach((mk) => (sksPerKode[mk.code] = mk.sks));

  const perSemester = {};
  let totalmutu = 0;
  let totalsks = 0;
  let skslulus = 0;

  dataNilai.nilai
    .filter((n) => n.nim === nim)
    .forEach((n) => {
      const sks = sksPerKode[n.code];
      const bobot = bobotHuruf[n.akhir];
      if (sks === undefined || bobot === undefined) return;

      perSemester[n.semester] = perSemester[n.semester] || { mutu: 0, sks: 0 };
      perSemester[n.semester].mutu += bobot * sks;
      perSemester[n.semester].sks += sks;

      totalmutu += bobot * sks;
      totalsks += sks;
      if (bobot > 0) skslulus += sks;
    });

  const semesterak = dataNilai.semesterAktif.semester;
  const ak = perSemester[semesterak];

  return {
    semesterak,
    ips: ak ? ak.mutu / ak.sks : null,
    ipk: totalsks ? totalmutu / totalsks : null,
    skslulus,
  };
}

function formatAngka(angka) {
  if (angka === null) return "-";
  return angka.toLocaleString("id-ID", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

function renderKHS() {
  const hasil = countkhs();
  const letkhs = document.getElementById("khsRingkasan");

  const tile = (nilai, label) => {
    const div = buatEL("div", "khs-stat");
    div.append(buatEL("strong", "", nilai), buatEL("span", "", label));
    return div;
  };

  letkhs.append(
    tile(formatAngka(hasil.ips), `IPS Semester ${hasil.semesterak}`),
    tile(formatAngka(hasil.ipk), "IPK"),
    tile(String(hasil.skslulus), "Total SKS"),
  );
}

function barisKontak(ikon, teks, href) {
  const baris = buatEL(href ? "a" : "div", "dosen-kontak");
  if (href) baris.href = href;
  baris.append(buatEL("i", `fa-solid ${ikon}`), buatEL("span", "", teks));
  return baris;
}

function renderdw() {
  const dosen = dataFAQ.dosenWali;
  const letdw = document.getElementById("dosenWaliInfo");

  letdw.append(
    buatEL("p", "dosen-nama", dosen.nama),
    buatEL("p", "dosen-jabatan", dosen.jabatan),
    barisKontak("fa-envelope", dosen.email, `mailto:${dosen.email}`),
    barisKontak(
      "fa-phone",
      dosen.telepon,
      `tel:${dosen.telepon.replace(/[^\d+]/g, "")}`,
    ),
    barisKontak("fa-location-dot", dosen.ruangan),
  );
}

renderjhi();
renderKHS();
renderdw();
