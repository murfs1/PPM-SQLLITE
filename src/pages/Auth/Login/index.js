import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../../firebase/firebaseConfig';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();

  const handleLogin = async () => {
    if (!email.trim() || !password.trim()) {
      Alert.alert('Error', 'Email dan password tidak boleh kosong!');
      return;
    }

    // Validasi format email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      Alert.alert('Error', 'Format email tidak valid!');
      return;
    }

    try {
      const res = await signInWithEmailAndPassword(auth, email, password);
      console.log('Login berhasil:', res.user);
      Alert.alert('Success', 'Login berhasil!');
      navigation.reset({
        index: 0,
        routes: [{ name: 'Home' }], // Pastikan "Home" adalah nama rute yang valid
      });
      setEmail('');
      setPassword('');
    } catch (error) {
      let errorMessage = 'Gagal login!';
      if (error.code === 'auth/invalid-email') {
        errorMessage = 'Email tidak valid!';
      } else if (error.code === 'auth/user-not-found') {
        errorMessage = 'Pengguna tidak ditemukan!';
      } else if (error.code === 'auth/wrong-password') {
        errorMessage = 'Password salah!';
      }
      Alert.alert('Error', errorMessage);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <TouchableOpacity onPress={handleLogin} style={styles.loginButton}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
      <Text style={styles.registerText} onPress={() => navigation.navigate('Register')}>
        Belum punya akun? Register
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ced4da',
    borderRadius: 4,
    padding: 10,
    marginBottom: 12,
    width: '100%',
  },
  loginButton: {
    backgroundColor: 'blue',
    padding: 12,
    borderRadius: 8,
    marginTop: 8,
    width: '100%',
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
  },
  registerText: {
    color: 'blue',
    textAlign: 'center',
    marginTop: 12,
  },
});

export default Login;
