import React, { useEffect } from 'react';
import { View, Text, ActivityIndicator, StyleSheet, Image } from 'react-native';
import RememberMePng from './assets/RememberMe.png';

const HomeScreen = ({ onLoadingComplete }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      if (onLoadingComplete) {
        onLoadingComplete();
      }
    }, 2500);

    return () => clearTimeout(timer);
  }, [onLoadingComplete]);

  return (
    <View style={styles.container}>
      <Image source={RememberMePng}
        style={styles.logo}
        resizeMode="contain" // ช่วยให้รูปภาพแสดงผลได้สัดส่วนที่ถูกต้อง
        onError={(e) => console.log('Image load error:', e.nativeEvent.error)} // Optional: for debugging
      />
      <Text style={styles.welcomeText}>RememberMe</Text>
      <ActivityIndicator size="large" color="blue" style={styles.spinner} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white', // Ensure HomeScreen background is also white
  },
  logo: {
    width: 300,
    height: 300,
    marginBottom: 4,
  },
  welcomeText: {
    fontSize: 38,
    fontWeight: 'bold',
    color: 'black', // Welcome text color for light theme
    marginBottom: 30,
  },
  spinner: {
    marginTop: 20,
  },
});

export default HomeScreen;