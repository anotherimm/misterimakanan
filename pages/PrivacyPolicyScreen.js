import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  SafeAreaView, 
  TouchableOpacity 
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function PrivacyPolicyScreen({ navigation }) {
  const PolicySection = ({ title, content }) => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <Text style={styles.sectionContent}>{content}</Text>
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
        <Text style={styles.headerTitle}>Kebijakan Privasi</Text>
      </View>

      <ScrollView style={styles.container}>
        <View style={styles.contentContainer}>
          <Text style={styles.lastUpdated}>
            Terakhir diperbarui: 1 November 2024
          </Text>

          <Text style={styles.introduction}>
            Misteri Makanan berkomitmen untuk melindungi dan menghormati privasi Anda. 
            Kebijakan privasi ini menjelaskan bagaimana kami mengumpulkan, menggunakan, 
            dan melindungi informasi pribadi Anda.
          </Text>

          <PolicySection 
            title="1. Informasi yang Kami Kumpulkan"
            content="Kami mengumpulkan informasi seperti: nama, alamat email, foto profil, dan preferensi makanan Anda. Kami juga mengumpulkan informasi tentang penggunaan aplikasi seperti resep yang Anda lihat dan simpan."
          />

          <PolicySection 
            title="2. Penggunaan Informasi"
            content="Kami menggunakan informasi Anda untuk:
• Menyediakan dan memelihara layanan aplikasi
• Mengirimkan pembaruan dan pemberitahuan penting
• Meningkatkan pengalaman pengguna
• Menyesuaikan konten dan rekomendasi resep"
          />

          <PolicySection 
            title="3. Penyimpanan Data"
            content="Data Anda disimpan secara aman di server kami dengan enkripsi standar industri. Kami menyimpan data Anda selama akun Anda aktif atau selama diperlukan untuk memberikan layanan."
          />

          <PolicySection 
            title="4. Berbagi Informasi"
            content="Kami tidak akan menjual atau menyewakan informasi pribadi Anda kepada pihak ketiga. Kami hanya membagikan informasi Anda dalam situasi berikut:
• Dengan persetujuan Anda
• Untuk memenuhi kewajiban hukum
• Untuk melindungi hak dan keamanan pengguna kami"
          />

          <PolicySection 
            title="5. Cookies dan Teknologi Pelacakan"
            content="Kami menggunakan cookies dan teknologi serupa untuk meningkatkan pengalaman pengguna dan menganalisis penggunaan aplikasi. Anda dapat mengatur preferensi cookies Anda melalui pengaturan aplikasi."
          />

          <PolicySection 
            title="6. Hak Pengguna"
            content="Anda memiliki hak untuk:
• Mengakses data pribadi Anda
• Meminta koreksi data yang tidak akurat
• Meminta penghapusan data Anda
• Menolak pemrosesan data tertentu
• Meminta portabilitas data"
          />

          <PolicySection 
            title="7. Keamanan Data"
            content="Kami menerapkan langkah-langkah keamanan teknis dan organisasi yang sesuai untuk melindungi data Anda dari akses yang tidak sah, pengubahan, pengungkapan, atau penghancuran yang tidak sah."
          />

          <PolicySection 
            title="8. Perubahan Kebijakan"
            content="Kami dapat memperbarui kebijakan privasi ini dari waktu ke waktu. Kami akan memberi tahu Anda tentang perubahan signifikan melalui email atau pemberitahuan dalam aplikasi."
          />

          <View style={styles.contactInfo}>
            <Text style={styles.contactTitle}>Hubungi Kami</Text>
            <Text style={styles.contactText}>
              Jika Anda memiliki pertanyaan tentang kebijakan privasi ini atau penanganan data Anda, silakan hubungi Petugas Perlindungan Data kami di:
            </Text>
            <Text style={styles.contactEmail}>privacy@misterimakanan.com</Text>
          </View>
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
    marginTop: 30,
  },
  container: {
    flex: 1,
  },
  contentContainer: {
    padding: 20,
  },
  lastUpdated: {
    fontSize: 14,
    color: '#666',
    marginBottom: 12,
    fontStyle: 'italic',
  },
  introduction: {
    fontSize: 14,
    color: '#555',
    lineHeight: 20,
    marginBottom: 24,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  sectionContent: {
    fontSize: 14,
    color: '#555',
    lineHeight: 20,
  },
  contactInfo: {
    marginTop: 20,
    padding: 16,
    backgroundColor: '#F8F9FA',
    borderRadius: 12,
  },
  contactTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  contactText: {
    fontSize: 14,
    color: '#555',
    marginBottom: 8,
  },
  contactEmail: {
    fontSize: 14,
    color: '#FF6B6B',
    fontWeight: '500',
  },
});