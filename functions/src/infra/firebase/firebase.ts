import * as admin from 'firebase-admin';

admin.initializeApp();

const auth = admin.auth();
const db = admin.firestore();
export { db, auth };
