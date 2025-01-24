import React, { useEffect, useState } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { MoodDetail, Home, Splashscreen, Login, Register } from "../pages";
import { getAuth, onAuthStateChanged } from "firebase/auth"; // Import metode autentikasi
import { ActivityIndicator, View, StyleSheet } from "react-native";

const Stack = createStackNavigator();

export default function Router() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true); // Tambahkan state loading

  useEffect(() => {
    const auth = getAuth(); // Dapatkan instance autentikasi Firebase
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsAuthenticated(!!user); // Jika user ada, set isAuthenticated ke true
      setLoading(false); // Selesai memeriksa autentikasi
    });

    // Bersihkan listener saat komponen unmount
    return () => unsubscribe();
  }, []);

  // Jika masih loading, tampilkan indikator loading
  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {!isAuthenticated ? (
        <>
          <Stack.Screen name="Splashscreen" component={Splashscreen} />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Register" component={Register} />
        </>
      ) : (
        <>
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="MoodDetail" component={MoodDetail} />
        </>
      )}
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
