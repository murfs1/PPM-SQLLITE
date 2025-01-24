import React, { useEffect } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { logo } from '../../assets/icon';

export default function Splashscreen() {
  const navigation = useNavigation();

  useEffect(() => {
    console.log('Navigation:', navigation); // Pastikan navigation ada

    const timer = setTimeout(() => {
      if (navigation) {
        navigation.replace('Login');
      } else {
        console.error('Navigation tidak terdefinisi');
      }
    }, 3000); // Durasi splash screen (3 detik)
    
    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Image
        source={logo} // Tambahkan logo di folder assets
        style={styles.logo}
      />
      <Text style={styles.title}>MoodFood</Text>
      <Text style={styles.subtitle}>Find the best food for your mood</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFA500', // Warna latar belakang oranye
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
  },
  subtitle: {
    fontSize: 16,
    color: '#fff',
    marginTop: 8,
  },
});
