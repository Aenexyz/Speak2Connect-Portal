// Speak n' Link Portal: database settings.
//
// Leave this as null to use the storage built into claude.ai (the live portal).
// To save data when the portal is hosted somewhere else (for example GitHub Pages),
// paste your Firebase web app settings below. The README explains where to find them.
//
// These settings are not secret: Firebase web settings are designed to be public.
// Access is controlled by the rules in firestore.rules.

window.SNL_FIREBASE_CONFIG = null;

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
