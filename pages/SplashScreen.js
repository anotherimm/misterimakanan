import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Image, StatusBar, Animated } from 'react-native';

const SplashScreen = ({ navigation }) => {
  const loadingWidth = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(loadingWidth, {
      toValue: 100,
      duration: 3000,
      useNativeDriver: false,
    }).start(() => {
      navigation.replace('MainApp');
    });
  }, [loadingWidth, navigation]);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.header}>
        <Image source={require('../assets/icon.png')} style={styles.logo} />
        <Text style={styles.title}>Selamat Datang di Aplikasi Kami</Text>
        <Text style={styles.subtitle}>Aplikasi Terbaik untuk Kebutuhan Anda</Text>
      </View>
      <View style={styles.loadingContainer}>
        <Animated.View style={[styles.loadingBar, { width: loadingWidth.interpolate({
          inputRange: [0, 100],
          outputRange: ['0%', '100%']
        }) }]} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginTop: 4,
  },
  loadingContainer: {
    width: '80%',
    height: 10,
    backgroundColor: '#f5f5f5',
    borderRadius: 5,
    overflow: 'hidden',
    marginTop: 20,
  },
  loadingBar: {
    height: '100%',
    backgroundColor: '#FF6B6B',
  },
  skipButton: {
    marginTop: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#FF6B6B',
    borderRadius: 24,
  },
  skipText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default SplashScreen;
