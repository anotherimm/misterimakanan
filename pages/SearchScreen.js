import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  StyleSheet,
  ActivityIndicator,
  TextInput,
  Image,
  ScrollView,
  Linking,
  Dimensions
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import axios from 'axios';

const { width } = Dimensions.get('window');
const CARD_WIDTH = (width - 48) / 2;

export default function SearchScreen() {
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  const fetchRecipes = async () => {
    if (!searchQuery) return;
    
    setLoading(true);
    try {
      const response = await axios.get(
        `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchQuery}`
      );
      setSearchResults(response.data.meals || []);
    } catch (error) {
      console.error('Error fetching recipes:', error);
      alert('Error fetching recipes. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const getIngredientsList = (meal) => {
    const ingredients = [];
    for (let i = 1; i <= 20; i++) {
      const ingredient = meal[`strIngredient${i}`];
      const measure = meal[`strMeasure${i}`];
      if (ingredient && ingredient.trim() !== '') {
        ingredients.push({
          ingredient: ingredient,
          measure: measure
        });
      }
    }
    return ingredients;
  };

  const handleRecipePress = (recipe) => {
    setSelectedRecipe(recipe);
  };

  const RecipeCard = ({ item }) => (
    <TouchableOpacity 
      style={styles.recipeCard}
      onPress={() => handleRecipePress(item)}
    >
      <Image source={{ uri: item.strMealThumb }} style={styles.recipeCardImage} />
      <View style={styles.recipeCardContent}>
        <Text style={styles.recipeCardTitle} numberOfLines={2}>{item.strMeal}</Text>
        <View style={styles.recipeCardMeta}>
          <Text style={styles.recipeCardCategory}>{item.strCategory}</Text>
          <Text style={styles.recipeCardDot}>•</Text>
          <Text style={styles.recipeCardArea}>{item.strArea}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  const RecipeDetailModal = ({ recipe }) => {
    if (!recipe) return null;

    const ingredients = getIngredientsList(recipe);
    const instructions = recipe.strInstructions.split('\r\n');

    return (
      <View style={styles.modalContainer}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.modalImageContainer}>
            <Image
              source={{ uri: recipe.strMealThumb }}
              style={styles.detailImage}
            />
            <TouchableOpacity 
              style={styles.closeButton}
              onPress={() => setSelectedRecipe(null)}
            >
              <MaterialCommunityIcons name="close" size={24} color="#333" />
            </TouchableOpacity>
          </View>
          
          <View style={styles.detailContent}>
            <Text style={styles.detailTitle}>{recipe.strMeal}</Text>
            
            <View style={styles.categoryArea}>
              <View style={styles.categoryChip}>
                <MaterialCommunityIcons name="food-variant" size={16} color="#666" />
                <Text style={styles.categoryText}>{recipe.strCategory}</Text>
              </View>
              <View style={styles.categoryChip}>
                <MaterialCommunityIcons name="map-marker" size={16} color="#666" />
                <Text style={styles.categoryText}>{recipe.strArea}</Text>
              </View>
            </View>

            {recipe.strTags && (
              <View style={styles.tagsContainer}>
                {recipe.strTags.split(',').map((tag, index) => (
                  <View key={index} style={styles.tagChip}>
                    <Text style={styles.tagText}>{tag.trim()}</Text>
                  </View>
                ))}
              </View>
            )}

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Bahan-bahan</Text>
              {ingredients.map((item, index) => (
                <View key={index} style={styles.ingredientRow}>
                  <View style={styles.ingredientBullet} />
                  <Text style={styles.ingredientText}>
                    <Text style={styles.ingredientMeasure}>{item.measure}</Text> {item.ingredient}
                  </Text>
                </View>
              ))}
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Cara Membuat</Text>
              {instructions.map((instruction, index) => (
                instruction.trim() && (
                  <View key={index} style={styles.instructionRow}>
                    <View style={styles.instructionNumber}>
                      <Text style={styles.instructionNumberText}>{index + 1}</Text>
                    </View>
                    <Text style={styles.instructionText}>{instruction.trim()}</Text>
                  </View>
                )
              ))}
            </View>

            {recipe.strYoutube && (
              <TouchableOpacity 
                style={styles.youtubeButton}
                onPress={() => Linking.openURL(recipe.strYoutube)}
              >
                <MaterialCommunityIcons name="youtube" size={24} color="white" />
                <Text style={styles.youtubeButtonText}>Tonton Tutorial</Text>
              </TouchableOpacity>
            )}
          </View>
        </ScrollView>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Cari Resep</Text>
        <Text style={styles.headerSubtitle}>Temukan ribuan resep lezat</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.searchContainer}>
          <View style={styles.searchInputContainer}>
            <MaterialCommunityIcons name="magnify" size={24} color="#666" />
            <TextInput
              style={styles.searchInput}
              value={searchQuery}
              onChangeText={setSearchQuery}
              placeholder="Mau masak apa hari ini?"
              placeholderTextColor="#999"
              onSubmitEditing={fetchRecipes}
            />
          </View>
          <TouchableOpacity 
            style={styles.searchButton}
            onPress={fetchRecipes}
          >
            <MaterialCommunityIcons name="magnify" size={24} color="#fff" />
          </TouchableOpacity>
        </View>

        <View style={styles.resultsContainer}>
          {loading ? (
            <ActivityIndicator size="large" color="#007AFF" style={styles.loader} />
          ) : (
            <View style={styles.recipeGrid}>
              {searchResults.map((item) => (
                <RecipeCard key={item.idMeal} item={item} />
              ))}
            </View>
          )}
          {searchResults.length === 0 && searchQuery && !loading && (
            <View style={styles.emptyState}>
              <MaterialCommunityIcons name="food-off" size={48} color="#ccc" />
              <Text style={styles.emptyText}>Resep tidak ditemukan</Text>
              <Text style={styles.emptySubtext}>Coba kata kunci lain</Text>
            </View>
          )}
        </View>
      </ScrollView>

      {selectedRecipe && (
        <RecipeDetailModal recipe={selectedRecipe} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    paddingTop: 60,
    paddingHorizontal: 16,
    paddingBottom: 16,
    backgroundColor: '#fff',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#666',
    marginTop: 4,
  },
  searchContainer: {
    flexDirection: 'row',
    padding: 16,
    gap: 12,
  },
  searchInputContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    borderRadius: 12,
    paddingHorizontal: 16,
  },
  searchInput: {
    flex: 1,
    height: 48,
    marginLeft: 12,
    fontSize: 16,
    color: '#333',
  },
  searchButton: {
    width: 48,
    height: 48,
    backgroundColor: '#FF6B6B',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  resultsContainer: {
    flex: 1,
    paddingHorizontal: 16,
  },
  recipeGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 16,
  },
  recipeCard: {
    width: CARD_WIDTH,
    backgroundColor: '#fff',
    borderRadius: 16,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  recipeCardImage: {
    width: '100%',
    height: CARD_WIDTH,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  recipeCardContent: {
    padding: 12,
  },
  recipeCardTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  recipeCardMeta: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  recipeCardCategory: {
    fontSize: 12,
    color: '#666',
  },
  recipeCardDot: {
    fontSize: 12,
    color: '#666',
    marginHorizontal: 4,
  },
  recipeCardArea: {
    fontSize: 12,
    color: '#666',
  },
  modalContainer: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#fff',
  },
  modalImageContainer: {
    height: 300,
    width: '100%',
  },
  detailImage: {
    width: '100%',
    height: '100%',
  },
  closeButton: {
    position: 'absolute',
    top: 48,
    right: 16,
    backgroundColor: '#fff',
    borderRadius: 24,
    width: 48,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  detailContent: {
    padding: 24,
    backgroundColor: '#fff',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    marginTop: -24,
  },
  detailTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
  },
  categoryArea: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 16,
  },
  categoryChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
    gap: 6,
  },
  categoryText: {
    fontSize: 14,
    color: '#666',
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 24,
  },
  tagChip: {
    backgroundColor: '#FF6B6B15',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  tagText: {
    color: '#FF6B6B',
    fontSize: 14,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
  },
  ingredientRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  ingredientBullet: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#FF6B6B',
    marginRight: 12,
  },
  ingredientText: {
    fontSize: 16,
    color: '#333',
  },
  ingredientMeasure: {
    color: '#FF6B6B',
    fontWeight: '500',
  },
  instructionRow: {
    flexDirection: 'row',
    marginBottom: 16,
    gap: 16,
  },
  instructionNumber: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#FF6B6B',
    justifyContent: 'center',
    alignItems: 'center',
  },
  instructionNumberText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  instructionText: {
    flex: 1,
    fontSize: 16,
    lineHeight: 24,
    color: '#333',
  },
  youtubeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FF0000',
    padding: 16,
    borderRadius: 12,
    marginTop: 8,
  },
  youtubeButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 48,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#666',
    marginTop: 16,
},
emptySubtext: {
    fontSize: 14,
    color: '#999',
    marginTop: 8,
},
loader: {
    marginTop: 32,
}
});