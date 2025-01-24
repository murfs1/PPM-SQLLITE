import * as SQLite from 'expo-sqlite';

let db;

// Fungsi untuk menginisialisasi database
export const initializeDatabase = async () => {
  if (!db) {
    // Membuka database atau membuatnya jika belum ada
    db = await SQLite.openDatabaseAsync('moodfood.db');

    // Menyiapkan PRAGMA untuk pengaturan journal dan membuat tabel foods jika belum ada
    await db.execAsync(`
      PRAGMA journal_mode = WAL;
      CREATE TABLE IF NOT EXISTS foods (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        mood TEXT NOT NULL
      );
    `);

    console.log('Database initialized');
  }
};

// Fungsi untuk menambahkan makanan berdasarkan mood
export const addFood = async (name, mood) => {
  try {
    const result = await db.runAsync(
      'INSERT INTO foods (name, mood) VALUES (?, ?)', 
      name, mood
    );
    return result.lastInsertRowId;
  } catch (error) {
    console.error('Error adding food:', error);
    throw error;
  }
};

// Fungsi untuk mendapatkan semua makanan berdasarkan mood
export const fetchFoodsByMood = async (mood) => {
  try {
    const allRows = await db.getAllAsync('SELECT * FROM foods WHERE mood = ?', mood);
    return allRows;
  } catch (error) {
    console.error('Error fetching foods:', error);
    throw error;
  }
};

// Fungsi untuk mengupdate makanan
export const updateFood = async (id, newName) => {
  try {
    await db.runAsync('UPDATE foods SET name = ? WHERE id = ?', newName, id);
  } catch (error) {
    console.error('Error updating food:', error);
    throw error;
  }
};

// Fungsi untuk menghapus makanan berdasarkan ID
export const deleteFood = async (id) => {
  try {
    await db.runAsync('DELETE FROM foods WHERE id = ?', id);
  } catch (error) {
    console.error('Error deleting food:', error);
    throw error;
  }
};
