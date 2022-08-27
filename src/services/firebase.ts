import { initializeApp } from 'firebase/app';
import {
  AuthProvider,
  getAuth,
  GithubAuthProvider,
  GoogleAuthProvider,
  signInWithPopup
} from 'firebase/auth';
import User from '../models/user';

const firebaseConfig = {
  apiKey: 'AIzaSyA9-kkNVxmYUBNUyPjCOpAqWQH7BowBi5c',
  authDomain: 'nowaste-7acdd.firebaseapp.com',
  projectId: 'nowaste-7acdd',
  storageBucket: 'nowaste-7acdd.appspot.com',
  messagingSenderId: '732647861949',
  appId: '1:732647861949:web:4544edb4d11db9fade91d4',
  measurementId: 'G-9Q97F85R8E'
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

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
