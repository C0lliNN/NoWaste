import * as admin from 'firebase-admin';

admin.initializeApp();

const db = admin.firestore();
export { db };
