import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, SafeAreaView, Alert, ActivityIndicator } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function ProfileScreen({ navigation, route }) {
  const [githubData, setGithubData] = useState(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    fetchGithubProfile();
  }, []);

  const fetchGithubProfile = async () => {
    try {
      const response = await fetch('https://api.github.com/users/anotherimm');
      const data = await response.json();
      setGithubData(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching GitHub data:', error);
      setLoading(false);
      Alert.alert('Error', 'Failed to load GitHub profile');
    }
  };

  const MenuItem = ({ icon, title, onPress }) => (
    <TouchableOpacity style={styles.menuItem} onPress={onPress}>
      <View style={styles.menuContent}>
        <MaterialCommunityIcons name={icon} size={24} color="#555" />
        <Text style={styles.menuText}>{title}</Text>
      </View>
      <MaterialCommunityIcons name="chevron-right" size={24} color="#999" />
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container}>
        {loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#FF6B6B" />
          </View>
        ) : githubData ? (
          <View style={styles.githubContainer}>
            <View style={styles.profileHeader}>
              <Image
                source={{ uri: githubData.avatar_url }}
                style={styles.profileImage}
              />
              <View style={styles.profileInfo}>
                <Text style={styles.name}>{githubData.name}</Text>
                <Text style={styles.username}>@{githubData.login}</Text>
                <Text style={styles.bio}>{githubData.bio}</Text>
              </View>
            </View>

            <View style={styles.statsContainer}>
              <View style={styles.statItem}>
                <Text style={styles.statNumber}>{githubData.followers}</Text>
                <Text style={styles.statLabel}>Followers</Text>
              </View>
              <View style={styles.divider} />
              <View style={styles.statItem}>
                <Text style={styles.statNumber}>{githubData.following}</Text>
                <Text style={styles.statLabel}>Following</Text>
              </View>
              <View style={styles.divider} />
              <View style={styles.statItem}>
                <Text style={styles.statNumber}>{githubData.public_repos}</Text>
                <Text style={styles.statLabel}>Repositories</Text>
              </View>
            </View>

            <View style={styles.menuContainer}>
              <Text style={styles.menuHeader}>Pengaturan Akun</Text>
              
              <MenuItem 
                icon="help-circle-outline" 
                title="Bantuan"
                onPress={() => {navigation.navigate('Help')}}
              />
              
              <MenuItem 
                icon="shield-lock-outline" 
                title="Kebijakan Privasi"
                onPress={() => {navigation.navigate('Privacy')}}
              />
              
              <MenuItem 
                icon="file-document-outline" 
                title="Persyaratan Layanan"
                onPress={() => {navigation.navigate('Terms')}}
              />
              
              <MenuItem 
                icon="information-outline" 
                title="Tentang Aplikasi"
                onPress={() => navigation.navigate('About')}
              />
              
              <TouchableOpacity 
                style={styles.logoutButton}
                onPress={() => {
                  navigation.reset({
                    index: 0,
                    routes: [{ name: 'SplashScreen' }] 
                  });
                }}
              >
                <Text style={styles.logoutText}>Keluar</Text>
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>Failed to load GitHub profile</Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  container: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    color: '#FF6B6B',
    fontSize: 16,
    textAlign: 'center',
  },
  githubContainer: {
    flex: 1,
  },
  profileHeader: {
    backgroundColor: '#fff',
    padding: 20,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 15,
  },
  profileInfo: {
    alignItems: 'center',
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  username: {
    fontSize: 16,
    color: '#666',
    marginBottom: 10,
  },
  bio: {
    fontSize: 14,
    color: '#777',
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  statsContainer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: 15,
    marginTop: 10,
    marginBottom: 10,
    justifyContent: 'center',
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  divider: {
    width: 1,
    backgroundColor: '#eee',
    marginHorizontal: 20,
  },
  statNumber: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FF6B6B',
  },
  statLabel: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },
  menuContainer: {
    backgroundColor: '#fff',
    paddingTop: 10,
  },
  menuHeader: {
    fontSize: 16,
    fontWeight: '600',
    color: '#666',
    marginLeft: 15,
    marginBottom: 10,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#fff',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  menuContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuText: {
    fontSize: 16,
    marginLeft: 15,
    color: '#333',
  },
  logoutButton: {
    margin: 20,
    padding: 15,
    backgroundColor: '#FF6B6B',
    borderRadius: 10,
    alignItems: 'center',
  },
  logoutText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});