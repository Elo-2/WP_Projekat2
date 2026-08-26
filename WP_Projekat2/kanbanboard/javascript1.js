// Dodaj zadatak
const modal = document.getElementById("taskModal");
const taskInput = document.getElementById("taskInput");

document.getElementById("addTaskBtn").addEventListener("click", () => {
    modal.style.display = "block";
    taskInput.value = "";
    taskInput.focus();
});

// Handle modal buttons
document.getElementById("modalAdd").addEventListener("click", () => {
    let text = taskInput.value.trim();
    if (text === "") return;

    const task = createTask(text);
    document.querySelector('[data-status="todo"] .taskList').appendChild(task);

    modal.style.display = "none";
});

document.getElementById("modalCancel").addEventListener("click", () => {
    modal.style.display = "none";
});


// Kreiraj novi zadatak
function createTask(text) {
    const task = document.createElement("div");
    task.classList.add("task");
    task.textContent = text;

    task.draggable = true;

    task.addEventListener("dragstart", () => {
        task.classList.add("dragging");
    });

    task.addEventListener("dragend", () => {
        task.classList.remove("dragging");
    });

    return task;
}

// Handle Drag & Drop
document.querySelectorAll(".taskList").forEach(list => {
    list.addEventListener("dragover", e => {
        e.preventDefault();
        const dragging = document.querySelector(".dragging");
        list.appendChild(dragging);
    });
});

// Ocisti plocu
const clearModal = document.getElementById("clearModal");

document.getElementById("clearBoardBtn").addEventListener("click", () => {
    clearModal.style.display = "block";
});

// â€œDA - Ocisti plocuâ€ button
document.getElementById("clearYes").addEventListener("click", () => {
    document.querySelectorAll(".taskList").forEach(list => list.innerHTML = "");
    clearModal.style.display = "none";
});

// â€œNE â€“ Cancelâ€ button
document.getElementById("clearNo").addEventListener("click", () => {
    clearModal.style.display = "none";
});

// Zatvori van modala
window.addEventListener("click", e => {
    if (e.target === clearModal) {
        clearModal.style.display = "none";
    }
});

// Snimi plocu kao PNG
document.getElementById("saveBoardBtn").addEventListener("click", () => {
    html2canvas(document.body).then(canvas => {
        const link = document.createElement("a");
        link.download = "kanban_board.png";
        link.href = canvas.toDataURL();
        link.click();
    });
});

// Ucitaj html2canvas dynamically
const script = document.createElement("script");
script.src = "https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js";
document.body.appendChild(script);

window.addEventListener("click", e => {
    if (e.target === modal) {
        modal.style.display = "none";
    }
});

// Snimi Kanban kao PDF
document.getElementById("savePdfBtn").addEventListener("click", () => {

    html2canvas(document.querySelector(".board")).then(canvas => {

        const image = canvas.toDataURL("image/png");

        const { jsPDF } = window.jspdf;

        const pdf = new jsPDF({
            orientation: "landscape",
            unit: "px",
            format: [canvas.width, canvas.height]
        });

        pdf.addImage(
            image,
            "PNG",
            0,
            0,
            canvas.width,
            canvas.height
        );

        pdf.save("kanban_board.pdf");
    });
});

// ======= Slanje Kanban ploče mailom =======

const emailBtn = document.getElementById("emailBtn");
const emailModal = document.getElementById("emailModal");
const emailInput = document.getElementById("emailInput");
const emailSend = document.getElementById("emailSend");
const emailCancel = document.getElementById("emailCancel");

emailBtn.addEventListener("click", () => {
    emailModal.style.display = "block";
    emailInput.value = "";
    emailInput.focus();
});

emailCancel.addEventListener("click", () => {
    emailModal.style.display = "none";
});

emailSend.addEventListener("click", () => {
    const email = emailInput.value.trim();

    if (email === "") {
        alert("Unesite email adresu.");
        return;
    }

    const subject = encodeURIComponent("Moj Kanban Board");

    const body = encodeURIComponent(
        "Pozdrav,\n\nšaljem vam svoj Kanban Board."
    );

    window.location.href =
        `mailto:${email}?subject=${subject}&body=${body}`;

    emailModal.style.display = "none";
});

window.addEventListener("click", e => {
    if (e.target === emailModal) {
        emailModal.style.display = "none";
    }
});