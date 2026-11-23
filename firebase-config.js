// Speak n' Link Portal: database settings.
//
// Set to null to use the storage built into claude.ai instead.
// To save data when the portal is hosted somewhere else (for example GitHub Pages),
// paste your Firebase web app settings below. The README explains where to find them.
//
// These settings are not secret: Firebase web settings are designed to be public.
// Access is controlled by the rules in firestore.rules.

window.SNL_FIREBASE_CONFIG = {
  apiKey: "AIzaSyDBzcJCrFh2xuqcKc76ggwxuGFcdoSVd-0",
  authDomain: "s2c-portal-e2241.firebaseapp.com",
  databaseURL: "https://s2c-portal-e2241-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "s2c-portal-e2241",
  storageBucket: "s2c-portal-e2241.firebasestorage.app",
  messagingSenderId: "505817042371",
  appId: "1:505817042371:web:e6da1a38b5a9b618698176"
};

/* Example: replace null above with your own settings, like this:

window.SNL_FIREBASE_CONFIG = {
  apiKey: "AIza...",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:abc123def456"
};

*/
