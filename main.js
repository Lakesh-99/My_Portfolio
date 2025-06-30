// This script will handle the accordion functionality for the projects page
document.addEventListener('DOMContentLoaded', () => {
    const accordionHeaders = document.querySelectorAll('.project-accordion-header');

    accordionHeaders.forEach(header => {
        header.addEventListener('click', () => {
            // Toggle the 'active' class on the clicked header
            header.classList.toggle('active');

            // Select the content panel directly following the header
            const content = header.nextElementSibling;

            // Toggle the max-height for smooth transition
            if (header.classList.contains('active')) {
                // Set max-height to its scrollHeight to reveal content
                content.style.maxHeight = content.scrollHeight + 'px';
            } else {
                // Set max-height to 0 to hide content
                content.style.maxHeight = '0';
            }

            // Optional: Close other open accordions
            accordionHeaders.forEach(otherHeader => {
                if (otherHeader !== header && otherHeader.classList.contains('active')) {
                    otherHeader.classList.remove('active');
                    otherHeader.nextElementSibling.style.maxHeight = '0';
                }
            });
        });
    });

    // Optional: If you have a light/dark mode toggle button as well,
    // ensure its functionality is also in this main.js or a separate script.
    // Example (assuming toggleModeBtn ID):
    // const toggleModeBtn = document.getElementById('toggleModeBtn');
    // if (toggleModeBtn) {
    //     toggleModeBtn.addEventListener('click', () => {
    //         document.body.classList.toggle('light-mode'); // Or 'dark-mode'
    //         // Save preference to localStorage if needed
    //     });
    // }
});
// IMPORTANT:
// Make sure you load Firebase SDK scripts BEFORE this script:
// <script src="https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js"></script>
// <script src="https://www.gstatic.com/firebasejs/8.10.1/firebase-firestore.js"></script>
// <script src="https://www.gstatic.com/firebasejs/8.10.1/firebase-auth.js"></script>

// Your Firebase config here — REPLACE with your real config:
const firebaseConfig = {
    apiKey: "AIzaSyCMSBm6faEKfXWVByw_IIkbduB70ZI7KT0",
    authDomain: "newportfolio-95854.firebaseapp.com",
    projectId: "newportfolio-95854",
    storageBucket: "newportfolio-95854.firebasestorage.app",
    messagingSenderId: "983261202908",
    appId: "1:983261202908:web:722dad1bb73bb4469ea719"
  };
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const auth = firebase.auth();

// Optional: Enable anonymous auth so you can use secure rules later
auth.signInAnonymously()
  .then(() => {
    console.log("Signed in anonymously");

    // Now track the visit
    trackVisit();
  })
  .catch((error) => {
    console.error("Anonymous sign-in failed:", error);
    // Even without auth, try to track visit (will fail if rules require auth)
    trackVisit();
  });

// Function to track a visit
function trackVisit() {
  const visitData = {
    timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    page: window.location.pathname,
    referrer: document.referrer || 'direct',
    userAgent: navigator.userAgent,
    screen: `${window.innerWidth}x${window.innerHeight}`,
    language: navigator.language
  };

  db.collection("site_visits").add(visitData)
    .then(() => {
      console.log("✅ Visit tracked!", visitData);
    })
    .catch((error) => {
      console.error("❌ Error tracking visit:", error);
    });
}

