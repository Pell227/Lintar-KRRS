// =========================
// LOAD SIDEBAR
// =========================

fetch("../sidebar/index.html")
    .then(response => response.text())
    .then(data => {
        document.getElementById("sidebar").innerHTML = data;

        // Jalankan fungsi sidebar setelah HTML sidebar masuk
        initside();
    })
    .catch(error => {
        console.error("Gagal memuat sidebar:", error);
    });


// =========================
// RENDER CALENDAR
// =========================

const calendarContainer = document.getElementById("calendarContainer");
const filterKategori = document.getElementById("filterKategori");

function tampilkanKalender(kategori = "Semua") {

    calendarContainer.innerHTML = "";

    let data = dataKalenderAkademik.kalenderAkademik;

    if (kategori !== "Semua") {
        data = data.filter(function (item) {
            return item.kategori === kategori;
        });
    }

    if (data.length === 0) {

        calendarContainer.innerHTML = `
            <div class="empty-calendar">
                <i class="fa-solid fa-calendar-xmark"></i>
                <p>
                    Tidak ada kegiatan akademik pada kategori ini.
                </p>
            </div>
        `;

        return;
    }

    data.forEach(function (item) {

        const calendarItem = document.createElement("div");

        calendarItem.classList.add("calendar-item");

        calendarItem.innerHTML = `
            <div class="calendar-date">
                <div>
                    <i class="fa-regular fa-calendar"></i>
                    ${item.tanggal}
                </div>
            </div>

            <div class="calendar-info">

                <span class="calendar-category">
                    ${item.kategori}
                </span>

                <h3>
                    ${item.judul}
                </h3>

                <p>
                    ${item.deskripsi}
                </p>

            </div>
        `;

        calendarContainer.appendChild(calendarItem);
    });
}


// =========================
// FILTER
// =========================

filterKategori.addEventListener("change", function () {

    tampilkanKalender(this.value);

});


// =========================
// INITIAL LOAD
// =========================

tampilkanKalender();