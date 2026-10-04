const announcementContainer = document.getElementById("announcementContainer");

dataPengumuman.pengumuman.forEach(
  function (announcement) {

    const card = document.createElement("div");


    card.classList.add("announcement-card");


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

function showAnnouncement(id) {

  const announcement =
    dataPengumuman.pengumuman.find(
      function (item) {

        return item.id === id;

      }
    );

  if (!announcement) {

    return;

  }

  document.getElementById(
    "detailCategory"
  ).textContent = announcement.kategori;

  document.getElementById(
    "detailDate"
  ).innerHTML = `

    <i class="fa-regular fa-calendar"></i>

    ${announcement.tanggal}

  `;

  document.getElementById(
    "detailTitle"
  ).textContent = announcement.judul;

  document.getElementById(
    "detailContent"
  ).textContent = announcement.isi;

  document.getElementById(
    "announcementModal"
  ).style.display = "flex";

  document.body.style.overflow = "hidden";

}

function closeAnnouncement() {

  document.getElementById(
    "announcementModal"
  ).style.display = "none";

  document.body.style.overflow = "";

}

document.getElementById("announcementModal").
  addEventListener(
    "click",
    function (event) {

    if (event.target === this) 
    {

      closeAnnouncement();

    }
  }
);

document.addEventListener(
  "keydown",
  function (event) {

    if (event.key === "Escape") 
    {

      closeAnnouncement();

    }
  }
);