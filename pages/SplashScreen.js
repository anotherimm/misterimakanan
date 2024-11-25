import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Image, StatusBar, Animated, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

const SplashScreen = ({ navigation }) => {
  const loadingWidth = useRef(new Animated.Value(0)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;
  const titleSlideAnim = useRef(new Animated.Value(50)).current;

  useEffect(() => {
    // Sequence of animations
    Animated.parallel([
      // Fade in animation
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      // Scale animation for logo
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 8,
        tension: 40,
        useNativeDriver: true,
      }),
      // Slide animation for title
      Animated.timing(titleSlideAnim, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
      }),
      // Loading bar animation
      Animated.timing(loadingWidth, {
        toValue: 100,
        duration: 3000,
        useNativeDriver: false,
      }),
    ]).start(() => {
      // Add a small delay before navigation
      setTimeout(() => {
        navigation.replace('MainApp');
      }, 500);
    });
  }, [fadeAnim, scaleAnim, titleSlideAnim, loadingWidth, navigation]);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <LinearGradient
        colors={['#FF6B6B', '#FF8E53']}
        style={styles.gradient}
      />
      
      <Animated.View 
        style={[
          styles.content,
          {
            opacity: fadeAnim,
            transform: [{ scale: scaleAnim }]
          }
        ]}
      >
        <Image 
          source={require('../assets/icon.png')} 
          style={styles.logo}
        />
        
        <Animated.View style={{
          transform: [{ translateY: titleSlideAnim }],
          opacity: fadeAnim
        }}>
          <Text style={styles.title}>Selamat Datang</Text>
          <Text style={styles.subtitle}>di Aplikasi Kami</Text>
          <Text style={styles.tagline}>Temukan Misteri Makanan</Text>
        </Animated.View>
      </Animated.View>

      <View style={styles.footer}>
        <View style={styles.loadingContainer}>
          <Animated.View 
            style={[
              styles.loadingBar,
              {
                width: loadingWidth.interpolate({
                  inputRange: [0, 100],
                  outputRange: ['0%', '100%']
                })
              }
            ]} 
          />
        </View>
        <Text style={styles.loadingText}>Memuat...</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FF6B6B',
  },
  gradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 30,
    borderRadius: 75,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.15)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  subtitle: {
    fontSize: 24,
    color: '#fff',
    textAlign: 'center',
    marginTop: 8,
    opacity: 0.9,
  },
  tagline: {
    fontSize: 18,
    color: '#fff',
    textAlign: 'center',
    marginTop: 16,
    opacity: 0.8,
    fontStyle: 'italic',
  },
  footer: {
    paddingHorizontal: 40,
    paddingBottom: 50,
  },
  loadingContainer: {
    height: 6,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 3,
    overflow: 'hidden',
  },
  loadingBar: {
    height: '100%',
    backgroundColor: '#fff',
    borderRadius: 3,
  },
  loadingText: {
    color: '#fff',
    fontSize: 14,
    textAlign: 'center',
    marginTop: 12,
    opacity: 0.8,
  },
});

export default SplashScreen;