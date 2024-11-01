import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
  SafeAreaView,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function AddScreen({ navigation }) {
  const [recipeData, setRecipeData] = useState({
    name: '',
    description: '',
    cookTime: '',
    servings: '',
    ingredients: '',
    instructions: '',
    imageUri: null,
  });

  const handleSubmit = () => {
    // Validate required fields
    if (!recipeData.name || !recipeData.ingredients || !recipeData.instructions) {
      Alert.alert('Error', 'Mohon isi nama resep, bahan-bahan, dan cara membuat');
      return;
    }

    // Here you would typically make an API call to save the recipe
    Alert.alert(
      'Sukses',
      'Resep berhasil ditambahkan',
      [
        {
          text: 'OK',
          onPress: () => navigation.goBack()
        }
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.imageContainer}>
          {recipeData.imageUri ? (
            <Image 
              source={{ uri: recipeData.imageUri }} 
              style={styles.image} 
            />
          ) : (
            <View style={styles.imagePlaceholder}>
              <MaterialCommunityIcons name="camera" size={40} color="#666" />
              <Text style={styles.imagePlaceholderText}>Tambah Foto Makanan</Text>
            </View>
          )}
          <TouchableOpacity 
            style={styles.addImageButton}
            onPress={() => {
              // Here you would implement image picker functionality
              Alert.alert('Info', 'Fitur upload gambar akan segera hadir');
            }}
          >
            <Text style={styles.addImageButtonText}>
              {recipeData.imageUri ? 'Ubah Foto' : 'Tambah Foto'}
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.formContainer}>
          <Text style={styles.label}>Nama Resep*</Text>
          <TextInput
            style={styles.input}
            value={recipeData.name}
            onChangeText={(text) => setRecipeData({...recipeData, name: text})}
            placeholder="Masukkan nama resep"
          />

          <Text style={styles.label}>Deskripsi</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            value={recipeData.description}
            onChangeText={(text) => setRecipeData({...recipeData, description: text})}
            placeholder="Deskripsikan resep Anda"
            multiline={true}
            numberOfLines={4}
          />

          <View style={styles.row}>
            <View style={styles.halfColumn}>
              <Text style={styles.label}>Waktu Memasak</Text>
              <TextInput
                style={styles.input}
                value={recipeData.cookTime}
                onChangeText={(text) => setRecipeData({...recipeData, cookTime: text})}
                placeholder="Contoh: 30 menit"
                keyboardType="number-pad"
              />
            </View>
            
            <View style={styles.halfColumn}>
              <Text style={styles.label}>Porsi</Text>
              <TextInput
                style={styles.input}
                value={recipeData.servings}
                onChangeText={(text) => setRecipeData({...recipeData, servings: text})}
                placeholder="Contoh: 4 orang"
                keyboardType="number-pad"
              />
            </View>
          </View>

          <Text style={styles.label}>Bahan-bahan*</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            value={recipeData.ingredients}
            onChangeText={(text) => setRecipeData({...recipeData, ingredients: text})}
            placeholder="Masukkan bahan-bahan"
            multiline={true}
            numberOfLines={6}
          />

          <Text style={styles.label}>Cara Membuat*</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            value={recipeData.instructions}
            onChangeText={(text) => setRecipeData({...recipeData, instructions: text})}
            placeholder="Masukkan langkah-langkah memasak"
            multiline={true}
            numberOfLines={8}
          />

          <TouchableOpacity 
            style={styles.submitButton}
            onPress={handleSubmit}
          >
            <Text style={styles.submitButtonText}>Simpan Resep</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  imageContainer: {
    alignItems: 'center',
    padding: 20,
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 8,
  },
  imagePlaceholder: {
    width: '100%',
    height: 200,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imagePlaceholderText: {
    marginTop: 30,
    color: '#666',
    fontSize: 16,
  },
  addImageButton: {
    marginTop: 10,
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#FF6B6B',
  },
  addImageButtonText: {
    color: 'white',
    fontSize: 14,
  },
  formContainer: {
    padding: 20,
  },
  label: {
    fontSize: 16,
    color: '#333',
    marginBottom: 8,
    fontWeight: '500',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    marginBottom: 20,
    backgroundColor: '#fff',
  },
  textArea: {
    height: 120,
    textAlignVertical: 'top',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  halfColumn: {
    flex: 0.48,
  },
  submitButton: {
    backgroundColor: '#FF6B6B',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  submitButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});