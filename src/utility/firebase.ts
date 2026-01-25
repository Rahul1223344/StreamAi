import { initializeApp,} from "firebase/app"
import type {FirebaseApp} from "firebase/app"
import { getAnalytics } from "firebase/analytics"
import type {Analytics} from "firebase/analytics"
import { getAuth } from "firebase/auth"
import type {Auth} from "firebase/auth"

// Firebase configuration type is inferred automatically
const firebaseConfig = {
  apiKey: "AIzaSyA6E1KI3Jh9OYtHjiv7sxpWc6NVqPxs0sg",
  authDomain: "streamai-f94d3.firebaseapp.com",
  projectId: "streamai-f94d3",
  storageBucket: "streamai-f94d3.firebasestorage.app",
  messagingSenderId: "848660019618",
  appId: "1:848660019618:web:c79509dda2f48ae1961afb",
  measurementId: "G-KESDQJ65VY"
}

// Initialize Firebase
const app: FirebaseApp = initializeApp(firebaseConfig)

// Analytics (safe for browser environments)
const analytics: Analytics = getAnalytics(app)

// Firebase Authentication
const auth: Auth = getAuth(app)

export { app, auth }
