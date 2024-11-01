import React, { useState, useEffect } from 'react';
import { 
  View, 
  ScrollView,
  Text, 
  FlatList, 
  TouchableOpacity, 
  StyleSheet,
  ActivityIndicator,
  Image,
  Dimensions,
  RefreshControl,
  Modal,
  Linking
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import axios from 'axios';

const { width } = Dimensions.get('window');

const RecipeDetailModal = ({ recipe, onClose }) => {
  if (!recipe) return null;

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

  const ingredients = getIngredientsList(recipe);
  const instructions = recipe.strInstructions ? recipe.strInstructions.split('\r\n').filter(inst => inst.trim() !== '') : [];

  return (
    <Modal
      animationType="slide"
      visible={true}
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <ScrollView>
          <View style={styles.modalHeader}>
            <TouchableOpacity 
              style={styles.closeButton}
              onPress={onClose}
            >
              <MaterialCommunityIcons name="close" size={24} color="#333" />
            </TouchableOpacity>
          </View>

          <Image
            source={{ uri: recipe.strMealThumb }}
            style={styles.detailImage}
          />
          
          <View style={styles.detailContent}>
            <Text style={styles.detailTitle}>{recipe.strMeal}</Text>
            
            <View style={styles.categoryArea}>
              <View style={styles.metaItem}>
                <MaterialCommunityIcons name="food" size={18} color="#666" />
                <Text style={styles.categoryAreaText}>{recipe.strCategory}</Text>
              </View>
              {recipe.strArea && (
                <View style={styles.metaItem}>
                  <MaterialCommunityIcons name="map-marker" size={18} color="#666" />
                  <Text style={styles.categoryAreaText}>{recipe.strArea}</Text>
                </View>
              )}
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
              <View style={styles.ingredientsContainer}>
                {ingredients.map((item, index) => (
                  <View key={index} style={styles.ingredientRow}>
                    <MaterialCommunityIcons name="circle-small" size={20} color="#FF6B6B" />
                    <Text style={styles.ingredientText}>
                      {item.measure} {item.ingredient}
                    </Text>
                  </View>
                ))}
              </View>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Cara Membuat</Text>
              {instructions.map((instruction, index) => (
                <View key={index} style={styles.instructionRow}>
                  <Text style={styles.instructionNumber}>{index + 1}</Text>
                  <Text style={styles.instructionText}>{instruction.trim()}</Text>
                </View>
              ))}
            </View>

            {recipe.strYoutube && (
              <TouchableOpacity 
                style={styles.youtubeButton}
                onPress={() => Linking.openURL(recipe.strYoutube)}
              >
                <MaterialCommunityIcons name="youtube" size={24} color="white" />
                <Text style={styles.youtubeButtonText}>Tonton Video Tutorial</Text>
              </TouchableOpacity>
            )}
          </View>
        </ScrollView>
      </View>
    </Modal>
  );
};

export default function HomeScreen({ navigation }) {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [categoryRecipes, setCategoryRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [refreshing, setRefreshing] = useState(false);

  const fetchCategories = async () => {
    try {
      const response = await axios.get('https://www.themealdb.com/api/json/v1/1/categories.php');
      setCategories(response.data.categories);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const fetchCategoryRecipes = async (category) => {
    if (!category) return;
    setLoading(true);
    try {
      const response = await axios.get(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`);
      setCategoryRecipes(response.data.meals || []);
    } catch (error) {
      console.error('Error fetching category recipes:', error);
      setCategoryRecipes([]);
    } finally {
      setLoading(false);
    }
  };

  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);
    try {
      await fetchCategories();
      if (selectedCategory) {
        await fetchCategoryRecipes(selectedCategory);
      }
    } catch (error) {
      console.error('Error refreshing data:', error);
    } finally {
      setRefreshing(false);
    }
  }, [selectedCategory]);

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    fetchCategoryRecipes(selectedCategory);
  }, [selectedCategory]);

  const renderCategory = ({ item }) => {
    const isSelected = selectedCategory === item.strCategory;
    return (
      <TouchableOpacity
        style={[styles.categoryCard, isSelected && styles.selectedCategoryCard]}
        onPress={() => setSelectedCategory(item.strCategory)}
      >
        <Image
          source={{ uri: item.strCategoryThumb }}
          style={styles.categoryImage}
        />
        <Text style={[styles.categoryName, isSelected && styles.selectedCategoryName]}>
          {item.strCategory}
        </Text>
      </TouchableOpacity>
    );
  };

  const renderCategoryRecipe = ({ item }) => (
    <TouchableOpacity
      style={styles.categoryRecipeCard}
      onPress={async () => {
        try {
          const response = await axios.get(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${item.idMeal}`);
          setSelectedRecipe(response.data.meals[0]);
        } catch (error) {
          console.error('Error fetching recipe details:', error);
        }
      }}
    >
      <Image
        source={{ uri: item.strMealThumb }}
        style={styles.categoryRecipeImage}
      />
      <View style={styles.categoryRecipeInfo}>
        <Text style={styles.categoryRecipeTitle} numberOfLines={2}>
          {item.strMeal}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {/* Rest of the JSX remains the same */}
        <View style={styles.header}>
          <View style={styles.logoContainer}>
            <Image
              source={require('../assets/app-icon.png')}  // Pastikan file logo.png ada di folder assets
              style={styles.logo}
              resizeMode="contain"
            />
          </View>
          <View style={styles.titleContainer}>
            <Text style={styles.headerTitle}>Misteri Makanan</Text>
            <Text style={styles.headerSubtitle}>Temukan Resep Yang Anda Inginkan</Text>
          </View>
        </View>

        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Kategori</Text>
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={categories}
            renderItem={renderCategory}
            keyExtractor={item => item.idCategory}
            contentContainerStyle={styles.categoryList}
          />
        </View>

        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>
            {selectedCategory ? `Resep ${selectedCategory}` : 'Pilih Kategori'}
          </Text>
          {loading ? (
            <ActivityIndicator style={styles.loader} size="large" color="#FF6B6B" />
          ) : categoryRecipes.length > 0 ? (
            <View style={styles.categoryRecipesGrid}>
              {categoryRecipes.map((recipe) => (
                <View key={recipe.idMeal} style={styles.categoryRecipeWrapper}>
                  {renderCategoryRecipe({ item: recipe })}
                </View>
              ))}
            </View>
          ) : (
            <Text style={styles.emptyText}>Tidak ada resep ditemukan</Text>
          )}
        </View>
      </ScrollView>

      {selectedRecipe && (
        <RecipeDetailModal 
          recipe={selectedRecipe} 
          onClose={() => setSelectedRecipe(null)} 
        />
      )}
    </View>
  );
}


const colors = {
  primary: '#FF6B6B', // Warna utama untuk tombol dan elemen terpilih
  secondary: '#1A1D2E', // Warna teks utama
  background: '#F5F6FA', // Warna latar belakang
  white: '#FFFFFF', // Putih untuk latar belakang kartu
  gray: '#666666', // Warna teks abu-abu
  lightGray: '#EBEDF5', // Warna garis pemisah
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    marginTop: 20,
  },
  // Header Styles
  header: {
    backgroundColor: '#FF6B6B', 
    paddingTop: 20,
    paddingBottom: 20,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 10,
  },
  logo: {
    width: 80,
    height: 80,
    borderRadius: 40, // Membuat logo berbentuk lingkaran
    backgroundColor: 'white', // Background putih untuk logo
    padding: 10,
  },
  titleContainer: {
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
    marginBottom: 5,
  },
  headerSubtitle: {
    fontSize: 16,
    color: 'white',
    textAlign: 'center',
    opacity: 0.9,
  },
  // Section Styles
  sectionContainer: {
    marginTop: 20,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: colors.secondary,
    marginBottom: 15,
  },
  // Category Styles
  categoryList: {
    paddingVertical: 10,
  },
  categoryCard: {
    width: 100,
    alignItems: 'center',
    marginRight: 15,
    padding: 10,
    backgroundColor: colors.white,
    borderRadius: 15, // Konsisten dengan sudut lainnya
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  selectedCategoryCard: {
    backgroundColor: colors.primary,
  },
  categoryImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  categoryName: {
    marginTop: 8,
    fontSize: 14,
    color: colors.secondary,
    textAlign: 'center',
  },
  selectedCategoryName: {
    color: colors.white,
    fontWeight: '600',
  },
  // Recipe Card Styles
  categoryRecipesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 5,
  },
  categoryRecipeWrapper: {
    width: '48%',
    marginBottom: 15,
  },
  categoryRecipeCard: {
    backgroundColor: colors.white,
    borderRadius: 15,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  categoryRecipeImage: {
    width: '100%',
    height: 150,
    resizeMode: 'cover',
  },
  categoryRecipeInfo: {
    padding: 12,
  },
  categoryRecipeTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.secondary,
    marginBottom: 8,
  },
  categoryRecipeMeta: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  metaText: {
    marginLeft: 4,
    fontSize: 12,
    color: colors.gray,
  },
  loader: {
    marginVertical: 20,
  },
  emptyText: {
    textAlign: 'center',
    color: colors.gray,
    marginTop: 20,
    fontSize: 16,
  },
  // Modal Styles
  modalContainer: {
    flex: 1,
    backgroundColor: colors.white,
  },
  modalHeader: {
    position: 'absolute',
    top: 40,
    left: 0,
    right: 0,
    zIndex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingHorizontal: 15,
  },
  closeButton: {
    backgroundColor: colors.white,
    borderRadius: 20,
    padding: 8,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
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
    color: colors.secondary,
    marginBottom: 15,
  },
  categoryArea: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 15,
    marginBottom: 15,
  },
  categoryAreaText: {
    marginLeft: 5,
    fontSize: 14,
    color: colors.gray,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 20,
  },
  tagChip: {
    backgroundColor: colors.background,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  tagText: {
    color: colors.gray,
    fontSize: 14,
  },
  section: {
    marginTop: 25,
  },
  ingredientsContainer: {
    backgroundColor: colors.background,
    padding: 15,
    borderRadius: 15,
  },
  ingredientRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  ingredientText: {
    flex: 1,
    fontSize: 15,
    color: colors.secondary,
  },
  instructionRow: {
    flexDirection: 'row',
    marginBottom: 15,
    backgroundColor: colors.background,
    padding: 15,
    borderRadius: 15,
  },
  instructionNumber: {
    width: 24,
    fontSize: 16,
    fontWeight: '600',
    color: colors.primary,
  },
  instructionText: {
    flex: 1,
    fontSize: 15,
    color: colors.secondary,
    lineHeight: 22,
  },
  youtubeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FF0000',
    padding: 15,
    borderRadius: 12,
    marginTop: 25,
  },
  youtubeButtonText: {
    color: colors.white,
    fontWeight: '600',
    fontSize: 16,
    marginLeft: 8,
  },
});
