document.addEventListener("DOMContentLoaded", () => {
  generateQR();
});

function generateQR() {
  const qrImage = document.getElementById("qrImage");
  let link = "Example";
  qrImage.src = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${link}`;
}