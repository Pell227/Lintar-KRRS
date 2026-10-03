(() => {
  const KEY = "lintar_krrs_windriew";
  const MIN_SKS = 20;
  const MAX_SKS = 24;
  let courses = [];

  try {
    courses = JSON.parse(localStorage.getItem(KEY) || "[]");
  } catch {
    courses = [];
  }

  const totalSks = courses.reduce(
    (total, course) => total + Number(course.sks || 0),
    0,
  );
  const isValid = totalSks >= MIN_SKS && totalSks <= MAX_SKS;

  document.getElementById("count").textContent = courses.length;
  document.getElementById("sks").textContent = totalSks;

  const message = document.getElementById("message");
  message.textContent = isValid
    ? `KRRS valid: ${totalSks} SKS.`
    : `KRRS belum memenuhi ketentuan ${MIN_SKS}–${MAX_SKS} SKS (saat ini ${totalSks} SKS). Kembali ke pengisian untuk memperbaikinya.`;
  message.className = `notice no-print${isValid ? " success" : " error"}`;

  document.getElementById("printRows").innerHTML = courses.length
    ? courses
        .map(
          (course, index) => `
            <tr>
              <td>${index + 1}</td>
              <td>${course.code}</td>
              <td>${course.name}</td>
              <td>${course.sks}</td>
              <td>${course.kelas || course.class || "-"}</td>
              <td>${
                course.jadwal || `${course.day || ""}, ${course.time || ""}`
              }</td>
              <td>${course.ruang || course.room || "-"}</td>
            </tr>
          `,
        )
        .join("")
    : '<tr><td colspan="7" class="empty">Data mata kuliah belum tersedia.</td></tr>';

  document.getElementById("printButton").addEventListener("click", () => {
    if (!isValid) {
      alert(
        `KRRS hanya dapat dicetak jika total SKS minimal ${MIN_SKS} dan maksimal ${MAX_SKS}.`,
      );
      return;
    }

    window.print();
  });
})();
