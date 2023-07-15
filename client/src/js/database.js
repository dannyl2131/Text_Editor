import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate1', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate1')) {
        console.log('jate1 database already exists');
        return;
      }
      db.createObjectStore('jate1', { keyPath: 'id', autoIncrement: true });
      console.log('jate1 database created');
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  const db = await openDB('jate1', 1);

  const tx = db.transaction('jate1', 'readwrite');

  const store = tx.objectStore('jate1');

  const request = store.put({ id:1, value: content });

  const result = await request;
};

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  const db = await openDB('jate1');

  const tx = db.transaction('jate1', 'readonly');

  const store = tx.objectStore('jate1');

  const request = store.get(1);

  const result = await request;

  return result;
};

initdb();
