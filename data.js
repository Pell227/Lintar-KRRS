const datamahasiswa = JSON.parse(`{
  "dataprofile": [
    {
      "nama": "Felisia",
      "nim": "535250166",
      "ttl": "Denpasar, 27/02/2007",
      "Fakultas": "Fakultas Teknologi Informasi",
      "jurusan": "Teknik Informatika",
      "jk": "Perempuan",
      "agama": "Buddha",
      "hp": "08889998888",
      "email": "felisia.535250166@stu.untar.ac.id",
      "sekolah": "SMAK Santo Yoseph Denpasar",
      "ijazah": "131202509852305",
      "tglijazah": "28/05/2025",
      "namaortu": "namaortu",
      "alamat": "jl raya sesetan",
      "hpo": "0888899999"
    }
  ]
}`);

const dummyUsers = JSON.parse(`{
  "users": [
    {
      "id": "535250171",
      "password": "password123",
      "role": "mahasiswa",
      "nama": "Chrisento Salim",
      "email": "chrisento.535250178@stu.untar.ac.id",
      "fakultas": "Teknologi Informasi",
      "prodi": "Teknik Informatika"
    },
    {
      "id": "535250161",
      "password": "password123",
      "role": "mahasiswa",
      "nama": "Azzarqy Fizran M Nasrun",
      "email": "azzarqy.535250161@stu.untar.ac.id",
      "fakultas": "Teknologi Informasi",
      "prodi": "Teknik Informatika"
    },
    {
      "id": "535250166",
      "password": "password123",
      "role": "mahasiswa",
      "nama": "Felisia",
      "email": "felisia.535250166@stu.untar.ac.id",
      "fakultas": "Teknologi Informasi",
      "prodi": "Teknik Informatika"
    },
    {
      "id": "535250168",
      "password": "password123",
      "role": "mahasiswa",
      "nama": "Windriew Aeron Siaury",
      "email": "windriew.535250168@stu.untar.ac.id",
      "fakultas": "Teknologi Informasi",
      "prodi": "Teknik Informatika"
    }
  ]
}`);

const krrsCourses = [
  {
    code: "IF101",
    name: "Algoritma dan Pemrograman",
    sks: 4,
    kelas: "A",
    jadwal: "Senin, 08:00 - 11:20",
    ruang: "R.401",
  },
  {
    code: "IF102",
    name: "Struktur Data",
    sks: 4,
    kelas: "A",
    jadwal: "Selasa, 08:00 - 11:20",
    ruang: "Lab. Komputer 1",
  },
  {
    code: "IF103",
    name: "Basis Data",
    sks: 2,
    kelas: "B",
    jadwal: "Rabu, 10:00 - 11:40",
    ruang: "R.402",
  },
  {
    code: "IF104",
    name: "Pemrograman Web",
    sks: 2,
    kelas: "A",
    jadwal: "Rabu, 13:00 - 14:40",
    ruang: "Lab. Komputer 2",
  },
  {
    code: "IF105",
    name: "Jaringan Komputer",
    sks: 2,
    kelas: "A",
    jadwal: "Kamis, 08:00 - 09:40",
    ruang: "R.403",
  },
  {
    code: "IF106",
    name: "Sistem Operasi",
    sks: 2,
    kelas: "B",
    jadwal: "Kamis, 13:00 - 14:40",
    ruang: "R.404",
  },
  {
    code: "IF107",
    name: "Rekayasa Perangkat Lunak",
    sks: 2,
    kelas: "A",
    jadwal: "Jumat, 08:00 - 09:40",
    ruang: "R.405",
  },
  {
    code: "IF108",
    name: "Kecerdasan Buatan",
    sks: 2,
    kelas: "A",
    jadwal: "Jumat, 13:00 - 14:40",
    ruang: "Lab. AI",
  },
  {
    code: "IF109",
    name: "Etika Profesi",
    sks: 2,
    kelas: "A",
    jadwal: "Senin, 13:00 - 14:40",
    ruang: "R.406",
  },
  {
    code: "IF110",
    name: "Bahasa Indonesia",
    sks: 2,
    kelas: "B",
    jadwal: "Selasa, 13:00 - 14:40",
    ruang: "R.407",
  },
];

const dataPengumuman = JSON.parse(`{
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
}`);

const dataFAQ = JSON.parse(`{
  "faq": [
    
    {
      "id": 1,
      "pertanyaan": "Bagaimana cara mengisi KRRS?",
      "jawaban": "Mahasiswa dapat mengisi KRRS melalui halaman KRRS pada sistem Lintar KRRS."
    },

    {
      "id": 2,
      "pertanyaan": "Kapan periode pengisian KRRS?",
      "jawaban": "Periode pengisian KRRS mengikuti jadwal akademik yang telah ditentukan."
    },

    {
      "id": 3,
      "pertanyaan": "Bagaimana cara melihat jadwal kuliah?",
      "jawaban": "Jadwal kuliah dapat dilihat melalui halaman Jadwal Akademik pada sistem Lintar KRRS."
    },

    {
      "id": 4,
      "pertanyaan": "Bagaimana jika mengalami kendala saat mengisi KRRS?",
      "jawaban": "Mahasiswa dapat menghubungi dosen wali atau pihak akademik untuk mendapatkan bantuan."
    }

  ],

  "dosenWali": {
    "nama": "Dr. Steven Stranger",
    "jabatan": "Dosen Pebimbing",
    "email": "Steven@untar.ac.id",
    "telepon": "0821-999-9999",
    "ruangan": "Gedung R lantai 11"
  }

}`);

const dataKalenderAkademik = JSON.parse(`{
  "kalenderAkademik": [
    {
      "id": 1,
      "tanggal": "08 Jun 2026 s/d 17 Jul 2026",
      "kategori": "Administrasi",
      "judul": "Pengajuan Permohonan Pindah",
      "deskripsi": "Pengajuan permohonan pindah semester ganjil 2026/2027."
    },
    {
      "id": 2,
      "tanggal": "08 Jun 2026 s/d 17 Jul 2026",
      "kategori": "Administrasi",
      "judul": "Pengajuan Permohonan Aktif Kuliah Kembali",
      "deskripsi": "Pengajuan permohonan aktif kuliah kembali semester ganjil 2026/2027."
    },
    {
      "id": 3,
      "tanggal": "08 Jun 2026 s/d 09 Jul 2026",
      "kategori": "Keuangan",
      "judul": "Pembayaran BPP",
      "deskripsi": "Pembayaran BPP untuk kelas pagi semester ganjil 2026/2027."
    },
    {
      "id": 4,
      "tanggal": "09 Jun 2026 s/d 09 Jul 2026",
      "kategori": "Keuangan",
      "judul": "Pembayaran Uang Kuliah Tunggal / UKT",
      "deskripsi": "Pembayaran Uang Kuliah Tunggal (UKT) untuk kelas sore semester ganjil 2026/2027."
    },
    {
      "id": 5,
      "tanggal": "20 Jul 2026 s/d 14 Aug 2026",
      "kategori": "Administrasi",
      "judul": "Pengajuan Permohonan Cuti Akademik",
      "deskripsi": "Pengajuan permohonan cuti akademik semester ganjil 2026/2027."
    },
    {
      "id": 6,
      "tanggal": "20 Jul 2026 s/d 07 Aug 2026",
      "kategori": "Registrasi",
      "judul": "Rencana Registrasi Studi / Perbaikan (RRS)",
      "deskripsi": "Periode rencana registrasi studi dan perbaikan (RRS) semester ganjil 2026/2027."
    },
    {
      "id": 7,
      "tanggal": "18 Aug 2026 s/d 02 Oct 2026",
      "kategori": "Perkuliahan",
      "judul": "Proses Pembelajaran Sebelum UTS",
      "deskripsi": "Periode proses pembelajaran sebelum pelaksanaan Ujian Tengah Semester."
    },
    {
      "id": 8,
      "tanggal": "18 Aug 2026 s/d 02 Oct 2026",
      "kategori": "Administrasi",
      "judul": "Permohonan Dispensasi Cuti Akademik",
      "deskripsi": "Periode pengajuan permohonan dispensasi cuti akademik semester ganjil 2026/2027."
    },
    {
      "id": 9,
      "tanggal": "25 Aug 2026 s/d 23 Sep 2026",
      "kategori": "Keuangan",
      "judul": "Pembayaran SKS",
      "deskripsi": "Periode pembayaran SKS untuk kelas pagi semester ganjil 2026/2027."
    },
    {
      "id": 10,
      "tanggal": "28 Sep 2026 s/d 02 Oct 2026",
      "kategori": "Akademik",
      "judul": "Cetak Kartu Studi Mahasiswa (KSM)",
      "deskripsi": "Periode pencetakan Kartu Studi Mahasiswa (KSM)."
    },
    {
      "id": 11,
      "tanggal": "05 Oct 2026 s/d 09 Oct 2026",
      "kategori": "Ujian",
      "judul": "Ujian Tengah Semester (UTS)",
      "deskripsi": "Pelaksanaan Ujian Tengah Semester (UTS) semester ganjil 2026/2027."
    },
    {
      "id": 12,
      "tanggal": "12 Oct 2026 s/d 27 Nov 2026",
      "kategori": "Perkuliahan",
      "judul": "Proses Pembelajaran Setelah UTS",
      "deskripsi": "Periode proses pembelajaran setelah pelaksanaan Ujian Tengah Semester."
    },
    {
      "id": 13,
      "tanggal": "30 Nov 2026 s/d 11 Dec 2026",
      "kategori": "Ujian",
      "judul": "Ujian Akhir Semester (UAS)",
      "deskripsi": "Pelaksanaan Ujian Akhir Semester (UAS) semester ganjil 2026/2027."
    },
    {
      "id": 14,
      "tanggal": "02 Dec 2026 s/d 17 Dec 2026",
      "kategori": "Ujian",
      "judul": "Remedial",
      "deskripsi": "Periode pelaksanaan ujian remedial."
    },
    {
      "id": 15,
      "tanggal": "04 Jan 2027 s/d 15 Jan 2027",
      "kategori": "Akademik",
      "judul": "Hasil Studi dan Yudisium",
      "deskripsi": "Periode hasil studi dan pelaksanaan yudisium."
    },
    {
      "id": 16,
      "tanggal": "15 Mar 2027 s/d 25 Apr 2027",
      "kategori": "Wisuda",
      "judul": "Pendaftaran Wisuda",
      "deskripsi": "Periode pendaftaran wisuda."
    },
    {
      "id": 17,
      "tanggal": "15 May 2027",
      "kategori": "Wisuda",
      "judul": "Pelaksanaan Wisuda",
      "deskripsi": "Pelaksanaan kegiatan wisuda."
    }
  ]
}`);