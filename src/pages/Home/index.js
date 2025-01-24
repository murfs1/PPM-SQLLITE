import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  useWindowDimensions,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { auth } from "../../firebase/firebaseConfig";
import { onAuthStateChanged, signOut } from "firebase/auth";

export default function Home() {
  const { width, height } = useWindowDimensions();
  const isLandscape = width > height;
  const navigation = useNavigation();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        navigation.navigate("Login");
      }
    });

    return () => unsubscribe();
  }, [navigation]);

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        console.log("User signed out");
        navigation.navigate("Login");
      })
      .catch((error) => {
        console.error("Error signing out: ", error);
      });
  };

  const moods = [
    { id: "1", mood: "Happy", description: "Brighten up your day with these meals!" },
    { id: "2", mood: "Sad", description: "Comfort food to cheer you up!" },
    { id: "3", mood: "Stressed", description: "Relax with these calming dishes." },
    { id: "4", mood: "Energetic", description: "Boost your energy with these options!" },
  ];

  const handleMoodPress = (mood) => {
    navigation.navigate("MoodDetail", { mood });
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={[styles.header, isLandscape && styles.headerLandscape]}>
        <Text style={[styles.headerText, isLandscape && styles.headerTextLandscape]}>
          Welcome to MoodFood
        </Text>
      </View>

      {/* Subheading */}
      <Text style={[styles.subheading, isLandscape && styles.subheadingLandscape]}>
        Choose your mood and let us find the perfect meal for you!
      </Text>

      {/* List Mood */}
      <FlatList
        data={moods}
        key={isLandscape ? "landscape" : "portrait"}
        keyExtractor={(item) => item.id}
        numColumns={isLandscape ? 2 : 1}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[styles.moodCard, isLandscape && styles.moodCardLandscape]}
            onPress={() => handleMoodPress(item.mood)}
          >
            <Text style={styles.moodTitle}>{item.mood}</Text>
            <Text style={styles.moodDescription}>{item.description}</Text>
          </TouchableOpacity>
        )}
        contentContainerStyle={styles.moodList}
      />

      {/* Tombol Logout */}
      <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
    padding: 20,
  },
  header: {
    marginTop: 20,
    marginBottom: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  headerLandscape: {
    marginBottom: 10,
    alignItems: "flex-start",
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#FFA500",
  },
  headerTextLandscape: {
    fontSize: 22,
  },
  logoutButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: "#FF6347",
    borderRadius: 5,
    alignItems: "center",
  },
  logoutText: {
    color: "#FFF",
    fontWeight: "bold",
  },
  subheading: {
    fontSize: 16,
    color: "#666",
    marginBottom: 20,
    textAlign: "center",
  },
  subheadingLandscape: {
    fontSize: 14,
    textAlign: "left",
  },
  moodList: {
    paddingBottom: 20,
  },
  moodCard: {
    backgroundColor: "#FFA500",
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 5,
    flex: 1,
    marginHorizontal: 5,
  },
  moodCardLandscape: {
    marginHorizontal: 10,
  },
  moodTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#FFF",
  },
  moodDescription: {
    fontSize: 14,
    color: "#FFF",
    marginTop: 5,
  },
});
