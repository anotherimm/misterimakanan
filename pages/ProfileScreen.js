import React, { useState, } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, SafeAreaView, Alert } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function ProfileScreen({ navigation, route }) {
  // Menambahkan state untuk user data
  const [userData, setUserData] = useState({
    name: 'Nama Pengguna',
    photo: 'https://instagram.fsrg5-1.fna.fbcdn.net/v/t51.2885-19/435132890_1229141318491884_4194860436136606680_n.jpg?stp=dst-jpg_s150x150&_nc_ht=instagram.fsrg5-1.fna.fbcdn.net&_nc_cat=100&_nc_ohc=iHIzOOmJnOkQ7kNvgGphLp2&_nc_gid=c905777bae3944f2bcdab7d57dfa6d74&edm=AP4sbd4BAAAA&ccb=7-5&oh=00_AYCma2f6KRptaf_h0F0cecoe6u9AnvRGfelXbtT4FfOB_w&oe=674389BC&_nc_sid=7a9f4b'
  });
  
  React.useEffect(() => {
    if (route.params && route.params.updatedUsername) {
      setUserData(prevState => ({
        ...prevState,
        name: route.params.updatedUsername
      }));
  
      // Hapus `updatedUsername` setelah pembaruan agar tidak diproses ulang
      navigation.setParams({ updatedUsername: null });
    }
  }, [route.params?.updatedUsername]);
  

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
        <View style={styles.header}>
          <View style={styles.profileImageContainer}>
            <Image
              source={{ uri: userData.photo }}
              style={styles.profileImage}
            />
            <TouchableOpacity 
              style={styles.editImageButton}
              onPress={() => {
                Alert.alert('Info', 'Fitur upload gambar akan segera hadir');
              }}
            >
              <MaterialCommunityIcons name="camera" size={20} color="white" />
            </TouchableOpacity>
            
          </View>
          
          <Text style={styles.name}>{userData.name}</Text>
          <TouchableOpacity 
            style={styles.editProfileButton} 
            onPress={() => navigation.navigate('EditProfile', {
              currentUsername: userData.name
            })}
          >
            <Text style={styles.editProfileText}>Edit Profile</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>10</Text>
            <Text style={styles.statLabel}>Resep Favorit</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>5</Text>
            <Text style={styles.statLabel}>Resep Dibuat</Text>
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
              // Reset stack dan arahkan ke SplashScreen
              navigation.reset({
                index: 0, // Index pertama pada stack
                routes: [{ name: 'SplashScreen' }] 
              });
            }}
          >
            <Text style={styles.logoutText}>Keluar</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  header: {
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  profileImageContainer: {
    position: 'relative',
    marginBottom: 15,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  editImageButton: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    backgroundColor: '#FF6B6B',
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: '#fff',
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  editProfileButton: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#f0f0f0',
  },
  editProfileText: {
    color: '#FF6B6B',
    fontWeight: '600',
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