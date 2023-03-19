/** @param { import('fireway').MigrateOptions } */
module.exports.migrate = async ({ firestore }) => {
  const result = await firestore.collection('categories').get();
  result.docs.forEach(
    async (doc) =>
      await firestore
        .collection('categories')
        .doc(doc.id)
        .set({ color: '#000000' }, { merge: true })
  );
};
