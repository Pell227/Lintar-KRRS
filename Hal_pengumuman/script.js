// ==========================================
// DATA DUMMY PENGUMUMAN
// ==========================================

const announcementData = JSON.parse(`
{
  "pengumuman": [

    {
      "id": 1,
      "judul": "Pengisian KRRS Semester Ganjil",
      "tanggal": "01 Oktober 2026",
      "kategori": "Akademik",
      "ringkasan": "Pengisian Kartu Rencana Studi (KRRS) untuk semester ganjil telah dibuka. Mahasiswa diharapkan melakukan pengisian sesuai jadwal yang telah ditentukan.",
      "isi": "Mahasiswa dapat melakukan pengisian KRRS melalui sistem Lintar KRRS. Pastikan mata kuliah yang dipilih sesuai dengan kurikulum dan perhatikan jadwal perkuliahan sebelum melakukan konfirmasi."
    },

    {
      "id": 2,
      "judul": "Perubahan Jadwal Perkuliahan",
      "tanggal": "28 September 2026",
      "kategori": "Jadwal",
      "ringkasan": "Terdapat beberapa perubahan jadwal perkuliahan pada semester berjalan. Mahasiswa diminta untuk memeriksa kembali jadwal masing-masing.",
      "isi": "Perubahan jadwal dapat terjadi karena penyesuaian ruangan, dosen, maupun waktu perkuliahan. Silakan periksa halaman Jadwal Akademik secara berkala."
    },

    {
      "id": 3,
      "judul": "Batas Akhir Pengisian KRRS",
      "tanggal": "25 September 2026",
      "kategori": "Akademik",
      "ringkasan": "Mahasiswa diingatkan untuk menyelesaikan pengisian KRRS sebelum batas waktu yang telah ditentukan.",
      "isi": "Pastikan seluruh mata kuliah yang diperlukan sudah dipilih dan KRRS telah dikonfirmasi sebelum periode pengisian berakhir."
    },

    {
      "id": 4,
      "judul": "Informasi Kegiatan Akademik",
      "tanggal": "20 September 2026",
      "kategori": "Informasi",
      "ringkasan": "Informasi mengenai kegiatan akademik dan layanan mahasiswa pada semester berjalan.",
      "isi": "Mahasiswa dapat memperoleh informasi terbaru mengenai kegiatan akademik melalui halaman pengumuman Lintar KRRS."
    },

    {
      "id": 5,
      "judul": "Pemeliharaan Sistem Lintar KRRS",
      "tanggal": "15 September 2026",
      "kategori": "Sistem",
      "ringkasan": "Sistem Lintar KRRS akan menjalani pemeliharaan untuk meningkatkan kualitas layanan.",
      "isi": "Selama proses pemeliharaan berlangsung, beberapa layanan pada sistem mungkin tidak dapat digunakan sementara."
    }

  ]
}
`);


// ==========================================
// AMBIL CONTAINER
// ==========================================

const announcementContainer =
  document.getElementById(
    "announcementContainer"
  );


// ==========================================
// TAMPILKAN PENGUMUMAN
// ==========================================

announcementData.pengumuman.forEach(
  function (announcement) {

    const card =
      document.createElement("div");

    card.classList.add(
      "announcement-card"
    );


    card.innerHTML = `

      <div class="announcement-icon">

        <i class="fa-solid fa-bullhorn"></i>

      </div>


      <div class="announcement-content">

        <div class="announcement-top">

          <span class="announcement-category">
            ${announcement.kategori}
          </span>

          <span class="announcement-date">
            <i class="fa-regular fa-calendar"></i>
            ${announcement.tanggal}
          </span>

        </div>


        <h3>
          ${announcement.judul}
        </h3>


        <p>
          ${announcement.ringkasan}
        </p>


        <button
          class="read-more"
          onclick="showAnnouncement(${announcement.id})"
        >

          Baca Selengkapnya

          <i class="fa-solid fa-arrow-right"></i>

        </button>

      </div>

    `;


    announcementContainer.appendChild(card);

  }
);


// ==========================================
// DETAIL PENGUMUMAN
// ==========================================

function showAnnouncement(id) {

  const announcement =
    announcementData.pengumuman.find(
      function (item) {

        return item.id === id;

      }
    );


  if (!announcement) {
    return;
  }


  alert(
    announcement.judul +
    "\n\n" +
    announcement.isi
  );

}