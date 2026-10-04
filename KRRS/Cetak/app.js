(() => {
  const KEY = "lintar_krrs_windriew";
  const MIN_SKS = 20;
  const MAX_SKS = 24;
  let courses = [];

  try {
    const savedCourses = JSON.parse(localStorage.getItem(KEY) || "[]");
    courses = savedCourses
      .map((savedCourse) =>
        krrsCourses.find((course) => course.code === savedCourse.code),
      )
      .filter(Boolean);
  } catch {
    courses = [];
  }

  const totalSks = courses.reduce(
    (total, course) => total + Number(course.sks || 0),
    0,
  );
  const isValid = totalSks >= MIN_SKS && totalSks <= MAX_SKS;

  document.getElementById("sks").textContent = totalSks;
  const renderMeetings = (course, field) => {
    const meetings = course.pertemuan || [
      { jadwal: course.jadwal || `${course.day || ""}, ${course.time || ""}`, ruang: course.ruang || course.room || "-" },
    ];
    return meetings
      .map((meeting) => `<div class="course-meeting">${meeting[field] || "-"}</div>`)
      .join("");
  };
  const formattedDate = new Intl.DateTimeFormat("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "Asia/Jakarta",
  }).format(new Date());
  document.getElementById("printDate").textContent = `Jakarta, ${formattedDate}`;

  const message = document.getElementById("message");
  message.textContent = isValid
    ? `KRRS valid: ${totalSks} SKS.`
    : `KRRS belum memenuhi ketentuan ${MIN_SKS}–${MAX_SKS} SKS (saat ini ${totalSks} SKS). Kembali ke pengisian untuk memperbaikinya.`;
  message.className = `notice no-print${isValid ? " success" : " error"}`;

  document.getElementById("printRows").innerHTML = courses.length
    ? courses
        .map(
          (course) => `
            <tr>
              <td>${course.code}</td>
              <td>${course.name}</td>
              <td>${course.sks}</td>
              <td>${course.kelas || course.class || "-"}</td>
              <td class="meeting-cell">${renderMeetings(course, "ruang")}</td>
              <td class="meeting-cell">${renderMeetings(course, "jadwal")}</td>
            </tr>
          `,
        )
        .join("")
    : '<tr><td colspan="6" class="empty">Data mata kuliah belum tersedia.</td></tr>';

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
