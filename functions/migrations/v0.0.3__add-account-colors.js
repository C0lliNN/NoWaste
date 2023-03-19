/** @param { import('fireway').MigrateOptions } */

function getRandomItem() {
  const colors = [
    '#C89FA3',
    '#5BC0EB',
    '#FDE74C',
    '#9BC53D',
    '#FA7921',
    '#E55934',
    '#DC0073',
    '#9A031E',
    '#000000'
  ];
  // get random index value
  const randomIndex = Math.floor(Math.random() * colors.length);

  // get random item
  const item = colors[randomIndex];

  return item;
}

module.exports.migrate = async ({ firestore }) => {
  const result = await firestore.collection('accounts').get();
  result.docs.forEach(
    async (doc) =>
      await firestore
        .collection('accounts')
        .doc(doc.id)
        .set({ color: getRandomItem() }, { merge: true })
  );
};
