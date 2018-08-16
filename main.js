const canvas = document.querySelector('canvas');
const context = canvas.getContext('2d');
const video = document.createElement('video');

canvas.width = 20;
canvas.height = 20;

const r = navigator.mediaDevices
    .getUserMedia({ video: true })
    .then(treatMedia)

function treatMedia(stream) {
    video.srcObject = stream;
    video.play();
}

(function draw() {
    context.drawImage(video, 0, 0, canvas.width, canvas.height);
    const imageData = context.getImageData(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < imageData.data.length; i += 4) {
        let avg = (imageData.data[i] +
            imageData.data[i + 1] +
            imageData.data[i + 2]) / 3;

        // avg = avg > 120 ? 255 : 0;

        // vermelho
        imageData.data[i] = avg;

        // verde
        imageData.data[i + 1] = avg;

        // azul
        imageData.data[i + 2] = avg;
    }

    context.putImageData(imageData, 0, 0);

    requestAnimationFrame(draw);
})();