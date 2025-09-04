document.addEventListener("DOMContentLoaded", () => {
    getCurrentTabUrl().then((url) => {
        generateQR(url);
    }).catch((err) => {
        console.error("Error obteniendo la URL:", err);
    });
});

function getCurrentTabUrl() {
    return new Promise((resolve, reject) => {
        chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
            if (tabs && tabs.length > 0) {
                resolve(tabs[0].url);
            } else {
                reject("No se encontró ninguna pestaña activa");
            }
        });
    });
}

function generateQR(link) {
    const qrImage = document.getElementById("qrImage");
    const qrDownload = document.getElementById("qrDownload");

    const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(link)}`;
    qrImage.src = qrUrl;

    fetch(qrUrl)
        .then(res => res.blob())
        .then(blob => {
        const blobUrl = URL.createObjectURL(blob);
        qrDownload.href = blobUrl;
        qrDownload.download = "qr_code.png"; // fuerza el nombre
        });
}