import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { SQLiteProvider } from "expo-sqlite";
import Router from "./router"; // Ensure correct path to Router
import { initializeDatabase } from "./database/db"; // Import the initialize function

export default function App() {
  useEffect(() => {
    // You can call initializeDatabase() here if you have custom initialization
    initializeDatabase(); // This will call your database initialization logic
  }, []);

  return (
    <SQLiteProvider databaseName="moodfood.db">
      <NavigationContainer>
        <Router />
      </NavigationContainer>
    </SQLiteProvider>
  );
}
