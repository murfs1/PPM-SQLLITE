import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  StyleSheet,
} from "react-native";
import {
  initDB,
  addFood,
  fetchFoodsByMood,
  updateFood,
  deleteFood,
} from "../../database/db";
import { useNavigation } from "@react-navigation/native"; // Import useNavigation

export default function MoodDetail({ route }) {
  const { mood } = route.params; // Mendapatkan mood dari parameter navigasi
  const [foods, setFoods] = useState([]);
  const [foodName, setFoodName] = useState("");
  const [editingFood, setEditingFood] = useState(null); // Untuk menyimpan makanan yang sedang diedit

  const navigation = useNavigation(); // Menambahkan hook navigation

  useEffect(() => {
    const loadFoods = async () => {
      await initDB();
      const loadedFoods = await fetchFoodsByMood(mood);
      setFoods(loadedFoods);
    };
    loadFoods();
  }, [mood]);

  const handleAddFood = async () => {
    if (foodName.trim()) {
      await addFood(foodName, mood);
      setFoodName("");
      const updatedFoods = await fetchFoodsByMood(mood);
      setFoods(updatedFoods);
    }
  };

  const handleUpdateFood = async () => {
    if (foodName.trim() && editingFood) {
      await updateFood(editingFood.id, foodName);
      setFoodName("");
      setEditingFood(null);
      const updatedFoods = await fetchFoodsByMood(mood);
      setFoods(updatedFoods);
    }
  };

  const handleDeleteFood = async (id) => {
    await deleteFood(id);
    const updatedFoods = await fetchFoodsByMood(mood);
    setFoods(updatedFoods);
  };

  const handleEditFood = (food) => {
    setEditingFood(food);
    setFoodName(food.name);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Foods for {mood}</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter food"
        value={foodName}
        onChangeText={setFoodName}
      />
      <Button
        title={editingFood ? "Update Food" : "Add Food"}
        onPress={editingFood ? handleUpdateFood : handleAddFood}
      />
      <FlatList
        data={foods}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.foodItem}>
            <Text style={styles.foodName}>{item.name}</Text>
            <View style={styles.buttonContainer}>
              <Button title="Edit" onPress={() => handleEditFood(item)} />
              <Button
                title="Delete"
                onPress={() => handleDeleteFood(item.id)}
              />
            </View>
          </View>
        )}
      />
      <View style={{ marginTop: 10 }}>
        <Button title="Back to Home" onPress={() => navigation.goBack()} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#FFF",
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#FFA500",
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    marginBottom: 20,
    paddingLeft: 10,
  },
  foodItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
    backgroundColor: "#f0f0f0",
    padding: 10,
    borderRadius: 5,
  },
  foodName: {
    fontSize: 18,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: 120,
  },
});
