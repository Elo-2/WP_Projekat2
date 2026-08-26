
// ------ Prikupi sve DOM elemente -----
const canvas = document.getElementById("board"); 
const ctx = canvas.getContext("2d");

const colorPicker = document.getElementById("colorPicker"); 
const brushSize = document.getElementById("brushSize"); 
const clearBtn = document.getElementById("clearBtn"); 
const saveBtn = document.getElementById("saveBtn"); 
const eraserBtn = document.getElementById("eraserBtn");
const savePdfBtn = document.getElementById("savePdfBtn");
const emailBtn = document.getElementById("emailBtn");
const emailModal = document.getElementById("emailModal");
const emailInput = document.getElementById("emailInput");
const emailSendBtn = document.getElementById("emailSendBtn");
const emailCancelBtn = document.getElementById("emailCancelBtn");

// ====== Pocetne postavke ======
let drawing = false;
let currentColor = colorPicker.value;
let isErasing = false;

//====== Funkcije crtanja ======
function startDraw (e) {
	drawing = true;
	draw(e);
}

function endDraw() {
	drawing = false;
	ctx.beginPath();
}

function draw(e) {
	if (!drawing) return;
	
	const rect = canvas.getBoundingClientRect();
	
	// Prilagodite polozaj misa velicini ploce
	const scaleX = canvas.width/rect.width;
	const scaleY = canvas.height/rect.height;
	 
	const clientX = e.clientX || e.touches?.[0]?.clientX;
	const clientY = e.clientY || e.touches?.[0]?.clientY;
	
	const x = (clientX - rect.left) * scaleX;
	const y = (clientY - rect.top) * scaleY;
	
	
	ctx.lineWidth = brushSize.value;
	ctx.lineCap = "round";
	ctx.strokeStyle = isErasing ? "#FFFFFF": currentColor;
	
	ctx.lineTo(x, y);
	ctx.stroke();
	ctx.beginPath();
	ctx.moveTo(x, y);
}


// Mouse Events
canvas.addEventListener("mousedown", startDraw); 
canvas.addEventListener("mouseup", endDraw); 
canvas.addEventListener("mousemove", draw);

// ------Touch Events (mobile/tablet) 
canvas.addEventListener("touchstart", startDraw); 
canvas.addEventListener("touchmove", (e) => {
	draw(e);
	e.preventDefault();
});

canvas.addEventListener("touchend", endDraw);

// Toolbar Logic ====
colorPicker.addEventListener ("input", () => {
	currentColor= colorPicker.value;
	isErasing = false;
});

eraserBtn.addEventListener("click", () => { 
isErasing = !isErasing;
eraserBtn.textContent = isErasing ? "Piši" : "Briši";
});

clearBtn.addEventListener("click", () => { 
ctx.clearRect(0, 0, canvas.width, canvas.height);
});

saveBtn.addEventListener("click", () => { 
const image = canvas.toDataURL("image/png"); 
const link = document.createElement("a"); 
link.href= image;
link.download="moj_crtez.png";
link.click();
});

savePdfBtn.addEventListener("click", () => {
    const image = canvas.toDataURL("image/png");

    const { jsPDF } = window.jspdf;
    const pdf = new jsPDF("landscape", "px", [canvas.width, canvas.height]);

    pdf.addImage(image, "PNG", 0, 0, canvas.width, canvas.height);
    pdf.save("moj_whiteboard.pdf");
});

// ====== Slanje Whiteboarda mailom ======

emailBtn.addEventListener("click", () => {
    emailModal.style.display = "block";
    emailInput.value = "";
    emailInput.focus();
});

emailCancelBtn.addEventListener("click", () => {
    emailModal.style.display = "none";
});

emailSendBtn.addEventListener("click", () => {
    const email = emailInput.value.trim();

    if (email === "") {
        alert("Unesite email adresu.");
        return;
    }

    const subject = "Moj Whiteboard crtež";
    const body = "Pozdrav,%0D%0A%0D%0AU prilogu se nalazi moj Whiteboard crtež.";

    window.location.href =
        "mailto:" + email +
        "?subject=" + encodeURIComponent(subject) +
        "&body=" + body;

    emailModal.style.display = "none";
});

// Klik izvan popup-a zatvara popup
window.addEventListener("click", (e) => {
    if (e.target === emailModal) {
        emailModal.style.display = "none";
    }
});