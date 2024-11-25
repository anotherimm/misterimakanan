import React, { useState, useEffect } from 'react';
import {
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Image,
  Dimensions,
  Modal,
  Animated,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import axios from 'axios';

const { width } = Dimensions.get('window');

export default function GachaFoodScreen({ navigation }) {
  const [loading, setLoading] = useState(false);
  const [gachaResults, setGachaResults] = useState([]);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [spinAnimation] = useState(new Animated.Value(0));
  
  const fetchRandomMeals = async () => {
    setLoading(true);
    try {
      // Fetch 10 random meals
      const meals = [];
      for (let i = 0; i < 10; i++) {
        const response = await axios.get('https://www.themealdb.com/api/json/v1/1/random.php');
        if (response.data.meals[0]) {
          meals.push(response.data.meals[0]);
        }
      }
      setGachaResults(meals);
    } catch (error) {
      console.error('Error fetching random meals:', error);
    } finally {
      setLoading(false);
    }
  };

  const startGachaAnimation = () => {
    Animated.sequence([
      Animated.timing(spinAnimation, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(spinAnimation, {
        toValue: 0,
        duration: 0,
        useNativeDriver: true,
      }),
    ]).start(() => {
      fetchRandomMeals();
    });
  };

  const spin = spinAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.titleContainer}>
          <Text style={styles.headerTitle}>Misteri Makanan</Text>
          <Text style={styles.headerSubtitle}>Temukan Makanan Misterius!</Text>
        </View>
      </View>

      <View style={styles.gachaContainer}>
        <Animated.View style={[styles.gachaIcon, { transform: [{ rotate: spin }] }]}>
          <MaterialCommunityIcons name="food-variant" size={80} color="#FF6B6B" />
        </Animated.View>
        
        <TouchableOpacity
          style={styles.gachaButton}
          onPress={startGachaAnimation}
          disabled={loading}
        >
          <Text style={styles.gachaButtonText}>
            {loading ? 'Mencari Makanan...' : 'Mulai!'}
          </Text>
        </TouchableOpacity>
      </View>

      {loading ? (
        <ActivityIndicator size="large" color="#FF6B6B" style={styles.loader} />
      ) : (
        <ScrollView style={styles.resultsContainer}>
          <View style={styles.resultsGrid}>
            {gachaResults.map((meal, index) => (
              <TouchableOpacity
                key={`${meal.idMeal}-${index}`}
                style={styles.mealCard}
                onPress={() => setSelectedRecipe(meal)}
              >
                <Image
                  source={{ uri: meal.strMealThumb }}
                  style={styles.mealImage}
                />
                <View style={styles.mealInfo}>
                  <Text style={styles.mealTitle} numberOfLines={2}>
                    {meal.strMeal}
                  </Text>
                  <Text style={styles.mealCategory}>
                    {meal.strCategory}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      )}

      {/* Gunakan RecipeDetailModal yang sudah ada */}
      {selectedRecipe && (
        <Modal
          animationType="slide"
          visible={true}
          onRequestClose={() => setSelectedRecipe(null)}
        >
          <View style={styles.modalContainer}>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setSelectedRecipe(null)}
            >
              <MaterialCommunityIcons name="close" size={24} color="#333" />
            </TouchableOpacity>
            <Image
              source={{ uri: selectedRecipe.strMealThumb }}
              style={styles.detailImage}
            />
            <ScrollView style={styles.detailContent}>
              <Text style={styles.detailTitle}>{selectedRecipe.strMeal}</Text>
              <Text style={styles.detailCategory}>{selectedRecipe.strCategory}</Text>
              <Text style={styles.detailInstructions}>{selectedRecipe.strInstructions}</Text>
            </ScrollView>
          </View>
        </Modal>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F6FA',
  },
  header: {
    backgroundColor: '#FF6B6B',
    paddingTop: 20,
    paddingBottom: 20,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
    elevation: 5,
  },
  titleContainer: {
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 5,
  },
  headerSubtitle: {
    fontSize: 16,
    color: 'white',
    opacity: 0.9,
  },
  gachaContainer: {
    alignItems: 'center',
    padding: 20,
  },
  gachaIcon: {
    marginBottom: 20,
  },
  gachaButton: {
    backgroundColor: '#FF6B6B',
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 25,
    elevation: 3,
  },
  gachaButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  loader: {
    marginTop: 20,
  },
  resultsContainer: {
    flex: 1,
    padding: 10,
  },
  resultsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  mealCard: {
    width: (width - 30) / 2,
    backgroundColor: 'white',
    borderRadius: 15,
    marginBottom: 10,
    elevation: 3,
    overflow: 'hidden',
  },
  mealImage: {
    width: '100%',
    height: 150,
    resizeMode: 'cover',
  },
  mealInfo: {
    padding: 10,
  },
  mealTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1A1D2E',
    marginBottom: 5,
  },
  mealCategory: {
    fontSize: 14,
    color: '#666666',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'white',
  },
  closeButton: {
    position: 'absolute',
    top: 40,
    right: 20,
    zIndex: 1,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 8,
    elevation: 3,
  },
  detailImage: {
    width: '100%',
    height: 300,
    resizeMode: 'cover',
  },
  detailContent: {
    padding: 20,
  },
  detailTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1A1D2E',
    marginBottom: 10,
  },
  detailCategory: {
    fontSize: 16,
    color: '#666666',
    marginBottom: 20,
  },
  detailInstructions: {
    fontSize: 16,
    lineHeight: 24,
    color: '#1A1D2E',
  },
});