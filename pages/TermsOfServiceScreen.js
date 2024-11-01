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

export default function TermsOfServiceScreen({ navigation }) {
  const TermsSection = ({ title, content }) => (
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
        <Text style={styles.headerTitle}>Persyaratan Layanan</Text>
      </View>

      <ScrollView style={styles.container}>
        <View style={styles.contentContainer}>
          <Text style={styles.lastUpdated}>
            Terakhir diperbarui: 1 November 2024
          </Text>

          <TermsSection 
            title="1. Penerimaan Persyaratan"
            content="Dengan mengakses dan menggunakan aplikasi Misteri Makanan, Anda menyetujui untuk terikat dengan persyaratan layanan ini. Jika Anda tidak setuju dengan bagian apapun dari persyaratan ini, Anda tidak diperkenankan menggunakan aplikasi ini."
          />

          <TermsSection 
            title="2. Penggunaan Aplikasi"
            content="Anda setuju untuk menggunakan aplikasi ini hanya untuk tujuan yang sah dan sesuai dengan semua hukum dan peraturan yang berlaku. Dilarang menggunakan aplikasi ini untuk tujuan ilegal atau yang dilarang oleh persyaratan ini."
          />

          <TermsSection 
            title="3. Akun Pengguna"
            content="Anda bertanggung jawab untuk menjaga kerahasiaan kredensial akun Anda dan semua aktivitas yang terjadi di bawah akun Anda. Anda harus segera memberitahukan kepada kami tentang penggunaan yang tidak sah atas akun Anda."
          />

          <TermsSection 
            title="4. Konten Pengguna"
            content="Dengan mengunggah konten ke aplikasi, Anda memberikan kami lisensi non-eksklusif untuk menggunakan, memodifikasi, menampilkan, dan mendistribusikan konten tersebut. Anda tetap mempertahankan hak atas konten Anda."
          />

          <TermsSection 
            title="5. Hak Kekayaan Intelektual"
            content="Semua hak kekayaan intelektual dalam aplikasi ini adalah milik kami atau pemberi lisensi kami. Tidak ada hak atau lisensi yang diberikan kepada Anda untuk menggunakan hak kekayaan intelektual tersebut tanpa persetujuan tertulis."
          />

          <TermsSection 
            title="6. Batasan Tanggung Jawab"
            content="Kami tidak bertanggung jawab atas kerugian langsung, tidak langsung, insidental, khusus atau konsekuensial yang timbul dari penggunaan atau ketidakmampuan menggunakan aplikasi ini."
          />

          <TermsSection 
            title="7. Perubahan Layanan"
            content="Kami berhak untuk memodifikasi atau menghentikan layanan ini dengan atau tanpa pemberitahuan. Kami tidak bertanggung jawab kepada Anda atau pihak ketiga atas modifikasi atau penghentian layanan."
          />

          <TermsSection 
            title="8. Hukum yang Berlaku"
            content="Persyaratan ini diatur oleh dan ditafsirkan sesuai dengan hukum Indonesia. Setiap perselisihan yang timbul akan diselesaikan di pengadilan yang berwenang di Indonesia."
          />

          <View style={styles.contactInfo}>
            <Text style={styles.contactTitle}>Hubungi Kami</Text>
            <Text style={styles.contactText}>
              Jika Anda memiliki pertanyaan tentang Persyaratan Layanan ini, silakan hubungi kami di:
            </Text>
            <Text style={styles.contactEmail}>support@misterimakanan.com</Text>
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
    marginBottom: 20,
    fontStyle: 'italic',
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