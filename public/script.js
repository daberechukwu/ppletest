function openMapApp() {
    const address = document.getElementById('address').textContent;

    // Check if it's an iOS device (iPhone, iPad, iPod) and open in Apple Maps
    if (/iPad|iPhone|iPod/.test(navigator.userAgent)) {
        window.location.href = `maps://maps.apple.com/?q=${encodeURIComponent(address)}`;
    } else {
        // If not an iOS device, open in Google Maps (fallback to web URL)
        window.location.href = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
    }
}

// Attach the openMapApp function to the address element
const addressElement = document.getElementById('address');
addressElement.addEventListener('click', openMapApp);




  // JavaScript code to handle the modal functionality
  document.addEventListener("DOMContentLoaded", function () {
    const modalOverlay = document.querySelector(".modal-overlay");
    const openModalBtn = document.getElementById("openModalBtn");
    const closeModalBtn = document.getElementById("closeModalBtn");

    function openModal() {
        modalOverlay.style.display = "block";
    }

    function closeModal() {
        modalOverlay.style.display = "none";
    }

    openModalBtn.addEventListener("click", openModal);
    closeModalBtn.addEventListener("click", closeModal);

    window.addEventListener("click", function (event) {
        if (event.target === modalOverlay) {
            closeModal();
        }
    });
});


/*verified badge*/
const verificationImage = document.getElementById("verificationImage");

// Set the visibility of the image based on the verification status
function showImageIfVerified(isVerified) {
  if (isVerified) {
    verificationImage.style.display = "inline"; // Show the image
  } else {
    verificationImage.style.display = "none";   // Hide the image
  }
}


const isVerified = false; // Replace this with your actual verification status
showImageIfVerified(isVerified);



