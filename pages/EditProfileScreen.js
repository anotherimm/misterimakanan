import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
  ScrollView,
  Alert,
} from 'react-native';

export default function EditProfileScreen({ navigation, route }) {
    const [username, setUsername] = useState(route.params?.currentUsername || 'Nama Pengguna');
    
    const handleSave = () => {
      if (username.trim().length < 3) {
        Alert.alert('Error', 'Nama pengguna harus minimal 3 karakter');
        return;
      }
  
      navigation.navigate('Profile', { updatedUsername: username });
    };
  
    return (
      <SafeAreaView style={styles.safeArea}>
        <ScrollView style={styles.container}>
          <View style={styles.header}>
            <View style={styles.profileImageContainer}>
              <Image
                source={{ uri: route.params?.photo || 'https://instagram.fsrg6-1.fna.fbcdn.net/v/t51.2885-19/435132890_1229141318491884_4194860436136606680_n.jpg?stp=dst-jpg_s150x150&_nc_ht=instagram.fsrg6-1.fna.fbcdn.net&_nc_cat=100&_nc_ohc=aUSDo6JnIRcQ7kNvgERyKGa&_nc_gid=d93bdae313ba4c19b42389a145284339&edm=AP4sbd4BAAAA&ccb=7-5&oh=00_AYCTD6aWR3lCgfbEShJEFxma1Bzh4J6EkrXv_hzajKkNDg&oe=672A0CBC&_nc_sid=7a9f4b' }}
                style={styles.profileImage}
              />
            </View>
          </View>
  
          <View style={styles.formContainer}>
            <Text style={styles.label}>Nama Pengguna</Text>
            <TextInput
              style={styles.input}
              value={username}
              onChangeText={setUsername}
              placeholder="Masukkan nama pengguna"
              autoCapitalize="words"
            />
          </View>
  
          <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
            <Text style={styles.saveButtonText}>Simpan Perubahan</Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    );
  }
  


const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
  },
  header: {
    alignItems: 'center',
    padding: 20,
  },
  profileImageContainer: {
    position: 'relative',
    marginBottom: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  formContainer: {
    padding: 20,
  },
  label: {
    fontSize: 16,
    color: '#666',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    marginBottom: 20,
  },
  saveButton: {
    backgroundColor: '#FF6B6B',
    marginHorizontal: 20,
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  saveButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});