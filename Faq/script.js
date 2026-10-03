const faqContainer = document.getElementById("faqContainer");

dataFAQ.faq.forEach(function (faq) {

    const faqItem = document.createElement("div");

    faqItem.classList.add("faq-item");

    faqItem.innerHTML = `
        <button class="faq-question">

            <span>
                ${faq.pertanyaan}
            </span>

            <i class="fa-solid fa-chevron-down"></i>

        </button>

        <div class="faq-answer">

            <p>
                ${faq.jawaban}
            </p>

        </div>
    `;

    faqContainer.appendChild(faqItem);
});

const faqQuestions = document.querySelectorAll(".faq-question");

faqQuestions.forEach(function (question) {

    question.addEventListener("click", function () {

        const faqItem = this.parentElement;

        const answer = faqItem.querySelector(".faq-answer");

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

const dosen = dataFAQ.dosenWali;

document.getElementById("dosenNama").textContent = dosen.nama;
document.getElementById("dosenJabatan").textContent = dosen.jabatan;
document.getElementById("dosenEmail").textContent = dosen.email;
document.getElementById("dosenTelepon").textContent = dosen.telepon;
document.getElementById("dosenRuangan").textContent = dosen.ruangan;