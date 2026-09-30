const faqData = JSON.parse(`

{
    "faq": [

        {
            "id": 1,
            "question": "Bagaimana cara melakukan pengisian KRRS?",
            "answer": "Mahasiswa dapat melakukan pengisian KRRS melalui menu Pengisian KRRS. Pilih mata kuliah yang ingin diambil, kemudian simpan pengisian KRRS."
        },

        {
            "id": 2,
            "question": "Bagaimana jika mata kuliah yang ingin diambil mengalami bentrok jadwal?",
            "answer": "Periksa kembali jadwal mata kuliah sebelum melakukan konfirmasi KRRS. Jika terjadi bentrok, mahasiswa dapat memilih kelas atau mata kuliah lain yang memiliki jadwal berbeda."
        },

        {
            "id": 3,
            "question": "Bagaimana cara melihat mata kuliah yang sudah diambil?",
            "answer": "Mata kuliah yang telah dipilih dapat dilihat melalui menu Rincian KRRS. Halaman tersebut menampilkan daftar mata kuliah yang telah diambil pada semester berjalan."
        },

        {
            "id": 4,
            "question": "Bagaimana cara mencetak KRRS?",
            "answer": "Setelah pengisian KRRS selesai dan telah dikonfirmasi, mahasiswa dapat membuka menu Cetak atau Preview KRRS untuk melihat dan mencetak dokumen KRRS."
        },

        {
            "id": 5,
            "question": "Siapa yang dapat dihubungi jika mengalami masalah akademik?",
            "answer": "Jika mengalami masalah terkait akademik, mahasiswa dapat menghubungi dosen wali untuk mendapatkan arahan dan bantuan."
        }

    ],

    "dosenWali": {

        "nama": "Dr. Steven Strange",
        "email": "dosenwali@untar.ac.id",
        "telepon": "0826-6354-9651",
        "ruangan": "Gedung R, lantai 11"

    }
}
`);

const faqContainer = document.getElementById("faqContainer");


faqData.faq.forEach(function (faq) {

    const faqItem = document.createElement("div");

    faqItem.classList.add("faq-item");


    faqItem.innerHTML = `

        <button class="faq-question">

            <span>
                ${faq.question}
            </span>

            <i class="bi bi-chevron-down"></i>

        </button>


        <div class="faq-answer">

            <p>
                ${faq.answer}
            </p>

        </div>

    `;


    faqContainer.appendChild(faqItem);

});

const faqQuestions =
    document.querySelectorAll(".faq-question");


faqQuestions.forEach(function (question) {

    question.addEventListener("click", function () {

        const faqItem =
            this.parentElement;

        const answer =
            faqItem.querySelector(".faq-answer");

        document
            .querySelectorAll(".faq-item")
            .forEach(function (item) {

                if (item !== faqItem) {

                    item.classList.remove("active");

                    item
                        .querySelector(".faq-answer")
                        .style.maxHeight = null;

                }

            });

        faqItem.classList.toggle("active");


        if (faqItem.classList.contains("active")) {

            answer.style.maxHeight =
                answer.scrollHeight + "px";

        } else {

            answer.style.maxHeight = null;

        }

    });

});

const dosen = faqData.dosenWali;


document.getElementById("dosenNama").textContent =
    dosen.nama;


document.getElementById("dosenJabatan").textContent =
    dosen.jabatan;


document.getElementById("dosenEmail").textContent =
    dosen.email;


document.getElementById("dosenTelepon").textContent =
    dosen.telepon;


document.getElementById("dosenRuangan").textContent =
    dosen.ruangan;