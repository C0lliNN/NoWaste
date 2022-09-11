import { initializeApp } from 'firebase/app';
import {
  AuthProvider,
  connectAuthEmulator,
  getAuth,
  GithubAuthProvider,
  GoogleAuthProvider,
  signInWithPopup
} from 'firebase/auth';
import User from '../models/user';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

if (process.env.NODE_ENV !== 'production') {
  connectAuthEmulator(auth, process.env.REACT_APP_FIREBASE_AUTH_EMULATOR_URL ?? '', {
    disableWarnings: true
  });
}

async function handleFirebaseGoogleLogin(): Promise<User> {
  return await handleLogin(new GoogleAuthProvider());
}

async function handleFirebaseGithubLogin(): Promise<User> {
  return await handleLogin(new GithubAuthProvider());
}

async function handleLogin(provider: AuthProvider): Promise<User> {
  const userCredential = await signInWithPopup(auth, provider);

  const token = await userCredential.user.getIdToken(true);

  return {
    id: userCredential.user.uid,
    name: userCredential.user.displayName ?? '',
    email: userCredential.user.providerData[0].email ?? '',
    photoUrl: userCredential.user.photoURL ?? '',
    accessToken: token
  };
}

export { handleFirebaseGoogleLogin, handleFirebaseGithubLogin };
