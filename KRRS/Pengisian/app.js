const COURSES = [
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
];
const KEY = "lintar_krrs_windriew";
const MIN_SKS = 20;
const MAX_SKS = 24;
let selected = new Set();

const getElement = (id) => document.getElementById(id);

function getSelectedCourses() {
  return COURSES.filter((course) => selected.has(course.code));
}

function getTotalSks() {
  return getSelectedCourses().reduce((total, course) => total + course.sks, 0);
}

function renderCourses() {
  const query = getElement("search").value.toLowerCase();
  const filteredCourses = COURSES.filter((course) =>
    `${course.code} ${course.name}`.toLowerCase().includes(query),
  );

  getElement("courses").innerHTML = filteredCourses
    .map(
      (course) => `
        <tr>
          <td>
            <input
              class="course-check"
              aria-label="Pilih ${course.name}"
              type="checkbox"
              value="${course.code}"
              ${selected.has(course.code) ? "checked" : ""}
            >
          </td>
          <td><strong>${course.code}</strong></td>
          <td>${course.name}</td>
          <td><span class="badge">${course.sks} SKS</span></td>
          <td>${course.kelas}</td>
          <td>${course.jadwal}</td>
          <td>${course.ruang}</td>
        </tr>
      `,
    )
    .join("");

  document.querySelectorAll(".course-check").forEach((checkbox) => {
    checkbox.addEventListener("change", () => {
      if (checkbox.checked) {
        selected.add(checkbox.value);
      } else {
        selected.delete(checkbox.value);
      }

      updateSummary();
    });
  });

  updateSummary();
}

function updateSummary() {
  const totalSks = getTotalSks();
  getElement("count").textContent = getSelectedCourses().length;
  getElement("sks").textContent = totalSks;

  const message = getElement("message");
  const isOutOfRange =
    totalSks > MAX_SKS || (totalSks > 0 && totalSks < MIN_SKS);

  message.className = `notice${isOutOfRange ? " error" : ""}`;

  if (totalSks === 0) {
    message.textContent = `Batas pengambilan KRRS adalah minimal ${MIN_SKS} dan maksimal ${MAX_SKS} SKS.`;
  } else if (totalSks < MIN_SKS) {
    message.textContent = `Total ${totalSks} SKS. Tambahkan ${MIN_SKS - totalSks} SKS lagi agar memenuhi batas minimal.`;
  } else if (totalSks > MAX_SKS) {
    message.textContent = `Total ${totalSks} SKS. Kurangi ${totalSks - MAX_SKS} SKS agar tidak melebihi batas maksimal.`;
  } else {
    message.textContent = `Total ${totalSks} SKS sudah memenuhi ketentuan.`;
  }
}

try {
  const savedCourses = JSON.parse(localStorage.getItem(KEY) || "[]");
  selected = new Set(
    savedCourses
      .map((course) => course.code)
      .filter((code) => COURSES.some((course) => course.code === code)),
  );
} catch {
  selected = new Set();
}

getElement("search").addEventListener("input", renderCourses);

getElement("save").addEventListener("click", () => {
  const totalSks = getTotalSks();

  if (totalSks < MIN_SKS || totalSks > MAX_SKS) {
    const message = getElement("message");
    message.className = "notice error";
    message.textContent = `KRRS belum dapat disimpan. Total harus minimal ${MIN_SKS} dan maksimal ${MAX_SKS} SKS (saat ini ${totalSks} SKS).`;
    return;
  }

  localStorage.setItem(KEY, JSON.stringify(getSelectedCourses()));

  const message = getElement("message");
  message.className = "notice success";
  message.textContent = "KRRS berhasil disimpan.";

  setTimeout(() => {
    window.location.href = "../Data/index.html";
  }, 450);
});

renderCourses();
