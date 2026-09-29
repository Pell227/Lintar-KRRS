const faqQuestions = document.querySelectorAll(".faq-question");

faqQuestions.forEach(function (question) {

    question.addEventListener("click", function () {

        const faqItem = this.parentElement;
        const answer = faqItem.querySelector(".faq-answer");

        document.querySelectorAll(".faq-item").forEach(function (item) {

            if (item !== faqItem) {

                item.classList.remove("active");

                const otherAnswer = item.querySelector(".faq-answer");

                otherAnswer.style.maxHeight = null;
            }

        });

        faqItem.classList.toggle("active");

        if (faqItem.classList.contains("active")) {
            answer.style.maxHeight = answer.scrollHeight + "px";
        } 
        else {
            answer.style.maxHeight = null;
        }
    });
});

fetch("data.json")
    .then(response => response.json())
    .then(data => {

        const faqContainer = document.querySelector(".faq-container");

        data.faq.forEach(item => {

            const faqItem = document.createElement("div");
            faqItem.className = "faq-item";

            faqItem.innerHTML = `
                <button class="faq-question">
                    <span>${item.question}</span>
                    <i class="bi bi-chevron-down"></i>
                </button>

                <div class="faq-answer">
                    <p>${item.answer}</p>
                </div>
            `;

            faqContainer.appendChild(faqItem);
        });

        const dosen = data.dosenWali;

        document.querySelector(".lecturer-name").textContent = dosen.nama;
        document.querySelector(".lecturer-role").textContent = dosen.jabatan;
        document.querySelector(".lecturer-email").textContent = dosen.email;
        document.querySelector(".lecturer-email").href = `mailto:${dosen.email}`;
        document.querySelector(".lecturer-phone").textContent = dosen.telepon;
        document.querySelector(".lecturer-room").textContent = dosen.ruangan;

        activateFAQ();
    })
    .catch(error => {
        console.error("Gagal mengambil data:", error);
    });


function activateFAQ() {

    const faqQuestions = document.querySelectorAll(".faq-question");

    faqQuestions.forEach(question => {

        question.addEventListener("click", function () {

            const faqItem = this.parentElement;
            const answer = faqItem.querySelector(".faq-answer");

            document.querySelectorAll(".faq-item").forEach(item => {

                if (item !== faqItem) {

                    item.classList.remove("active");

                    item.querySelector(".faq-answer").style.maxHeight = null;
                }
            });

            faqItem.classList.toggle("active");

            if (faqItem.classList.contains("active")) {
                answer.style.maxHeight = answer.scrollHeight + "px";
            } else {
                answer.style.maxHeight = null;
            }

        });

    });
}