import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  SafeAreaView, 
  Image, 
  TouchableOpacity, 
  Linking 
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function AboutScreen({ navigation }) {
  const appVersion = "1.0.0"; // You can change this to match your app version

  const FeatureItem = ({ icon, title, description }) => (
    <View style={styles.featureItem}>
      <MaterialCommunityIcons name={icon} size={32} color="#FF6B6B" />
      <Text style={styles.featureTitle}>{title}</Text>
      <Text style={styles.featureDescription}>{description}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <MaterialCommunityIcons name="arrow-left" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Tentang Aplikasi</Text>
      </View>

      <ScrollView style={styles.container}>
        <View style={styles.logoContainer}>
          <Image 
            source={require('../assets/app-icon.png')} // Make sure to add your app icon
            style={styles.logo}
          />
          <Text style={styles.appName}>Misteri Makanan</Text>
          <Text style={styles.version}>Versi {appVersion}</Text>
        </View>

        <View style={styles.descriptionContainer}>
          <Text style={styles.descriptionText}>
            Aplikasi Misteri Makanan adalah platform lengkap untuk menemukan dan 
            membagikan berbagai resep masakan. Dibuat dengan passion untuk 
            kuliner dan komitmen untuk memudahkan pengguna dalam memasak.
          </Text>
        </View>

        <View style={styles.featuresContainer}>
          <Text style={styles.sectionTitle}>Fitur Utama</Text>
          
          <FeatureItem 
            icon="book-open-variant"
            title="Koleksi Resep Lengkap"
            description="Ribuan resep dari berbagai kategori dan daerah"
          />
          
          <FeatureItem 
            icon="bookmark-multiple"
            title="Simpan Favorit"
            description="Simpan resep favorit Anda untuk akses mudah"
          />
          
          <FeatureItem 
            icon="share-variant"
            title="Bagikan Resep"
            description="Bagikan resep favorit dengan teman dan keluarga"
          />
        </View>

        <View style={styles.contactContainer}>
          <Text style={styles.sectionTitle}>Hubungi Kami</Text>
          
          <TouchableOpacity 
            style={styles.contactItem}
            onPress={() => Linking.openURL('mailto:support@misterimakanan.com')}
          >
            <MaterialCommunityIcons name="email" size={20} color="#666" />
            <Text style={styles.contactText}>support@misterimakanan.com</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.contactItem}
            onPress={() => Linking.openURL('https://www.misterimakanan.com')}
          >
            <MaterialCommunityIcons name="web" size={20} color="#666" />
            <Text style={styles.contactText}>www.misterimakanan.com</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.copyrightContainer}>
          <Text style={styles.copyrightText}>
            © 2024 Misteri Makanan. All rights reserved.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#EBEDF5',
  },
  backButton: {
    marginRight: 16,
    marginTop: 30,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginTop:30,
  },
  container: {
    flex: 1,
    
  },
  logoContainer: {
    alignItems: 'center',
    padding: 24,
  },
  logo: {
    width: 100,
    height: 100,
    borderRadius: 20,
  },
  appName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 12,
  },
  version: {
    fontSize: 16,
    color: '#666',
    marginTop: 4,
  },
  descriptionContainer: {
    padding: 20,
    backgroundColor: '#F8F9FA',
  },
  descriptionText: {
    fontSize: 15,
    color: '#555',
    lineHeight: 22,
    textAlign: 'center',
  },
  featuresContainer: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 16,
  },
  featureItem: {
    backgroundColor: '#F8F9FA',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    alignItems: 'center',
  },
  featureTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginTop: 8,
    marginBottom: 4,
  },
  featureDescription: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
  contactContainer: {
    padding: 20,
    backgroundColor: '#F8F9FA',
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
  },
  contactText: {
    fontSize: 14,
    color: '#666',
    marginLeft: 8,
  },
  copyrightContainer: {
    padding: 20,
    alignItems: 'center',
  },
  copyrightText: {
    fontSize: 12,
    color: '#999',
  },
});