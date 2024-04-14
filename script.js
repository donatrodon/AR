document.addEventListener('DOMContentLoaded', function () {
    const imageInput = document.getElementById('imageInput');
    const startBtn = document.getElementById('startBtn');
    const output = document.getElementById('output');
    const progressBar = document.getElementById('progressBar');
    const languageSelect = document.getElementById('languageSelect');

    startBtn.addEventListener('click', function() {
        const imageFile = imageInput.files[0];
        if (!imageFile) {
            alert('Please select an image file first!');
            return;
        }
        recognizeText(imageFile);
    });

    function updateProgress(percent) {
        progressBar.style.width = `${percent}%`;
        progressBar.textContent = `${percent}%`;
    }

    function recognizeText(imageFile) {
        const reader = new FileReader();
        reader.onload = function(e) {
            Tesseract.recognize(
                e.target.result,
                languageSelect.value,
                {
                    logger: m => updateProgress(Math.round(m.progress * 100))
                }
            ).then(function(result) {
                output.value = result.data.text;
                updateProgress(0); // Reset progress after completion
            }).catch(function(error) {
                console.error('OCR Error:', error);
                alert('An error occurred while processing the image!');
                updateProgress(0); // Reset progress on error
            });
        };
        reader.readAsDataURL(imageFile);
    }
});
