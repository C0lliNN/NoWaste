/** @param { import('fireway').MigrateOptions } */

module.exports.migrate = async ({ firestore }) => {
  const result = await firestore.collection('accounts').get();
  result.docs.forEach(
    async (doc) =>
      await firestore.collection('categories').doc(doc.id).set({ useCount: 0 }, { merge: true })
  );
};
