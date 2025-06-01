 // Your Firebase config here 👇 — REPLACE with your real config from Firebase Console!
    const firebaseConfig = {
  apiKey: "AIzaSyDUgOMvUhKWtQm1RCEOiuvrciojltpz6Ns",
  authDomain: "myportfolio-ba654.firebaseapp.com",
  projectId: "myportfolio-ba654",
  storageBucket: "myportfolio-ba654.firebasestorage.app",
  messagingSenderId: "338685481799",
  appId: "1:338685481799:web:69ad116d2be95567a17262"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
    const db = firebase.firestore();

    // Track visit
    function trackVisit() {
      const visitData = {
        timestamp: new Date(),
        page: window.location.pathname,
        referrer: document.referrer || 'direct',
        userAgent: navigator.userAgent,
        screen: `${window.innerWidth}x${window.innerHeight}`,
        language: navigator.language
      };

      db.collection("site_visits").add(visitData)
        .then(() => {
          console.log("Visit tracked!", visitData);
        })
        .catch((error) => {
          console.error("Error tracking visit: ", error);
        });
    }

    // Run tracking on page load
    trackVisit();