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
      "prodi": "Teknik Informatika",
    },
    {
      "id": "535250166",
      "password": "password123",
      "role": "mahasiswa",
      "nama": "Felisia",
      "email": "felisia.535250166@stu.untar.ac.id",
      "fakultas": "Teknologi Informasi",
      "prodi": "Teknik Informatika",
    },
    {
      "id": "535250168",
      "password": "password123",
      "role": "mahasiswa",
      "nama": "Windriew Aeron Siaury",
      "email": "windriew.535250168@stu.untar.ac.id",
      "fakultas": "Teknologi Informasi",
      "prodi": "Teknik Informatika",
    }
]}`);

const COURSES = JSON.parse(`[
  {
    code: "IF101",
    name: "Algoritma dan Pemrograman",
    sks: 3,
    kelas: "A",
    jadwal: "Senin, 08:00 - 10:30",
    ruang: "R.401",
  },
  {
    code: "IF102",
    name: "Struktur Data",
    sks: 3,
    kelas: "A",
    jadwal: "Selasa, 08:00 - 10:30",
    ruang: "Lab. Komputer 1",
  },
  {
    code: "IF103",
    name: "Basis Data",
    sks: 3,
    kelas: "B",
    jadwal: "Rabu, 10:00 - 12:30",
    ruang: "R.402",
  },
  {
    code: "IF104",
    name: "Pemrograman Web",
    sks: 3,
    kelas: "A",
    jadwal: "Rabu, 13:00 - 15:30",
    ruang: "Lab. Komputer 2",
  },
  {
    code: "IF105",
    name: "Jaringan Komputer",
    sks: 3,
    kelas: "A",
    jadwal: "Kamis, 08:00 - 10:30",
    ruang: "R.403",
  },
  {
    code: "IF106",
    name: "Sistem Operasi",
    sks: 3,
    kelas: "B",
    jadwal: "Kamis, 13:00 - 15:30",
    ruang: "R.404",
  },
  {
    code: "IF107",
    name: "Rekayasa Perangkat Lunak",
    sks: 3,
    kelas: "A",
    jadwal: "Jumat, 08:00 - 10:30",
    ruang: "R.405",
  },
  {
    code: "IF108",
    name: "Kecerdasan Buatan",
    sks: 3,
    kelas: "A",
    jadwal: "Jumat, 13:00 - 15:30",
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
]`);

const GRADES = JSON.parse(`[
  { code: 'IF101', semester: 1, midterm: 'B', final: 'B+' },
  { code: 'IF102', semester: 1, midterm: 'A-', final: 'A' }
]`);