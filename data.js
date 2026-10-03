const datamahasiswa = JSON.parse(`{
  "datamahasiswa" : [
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
]}`);

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