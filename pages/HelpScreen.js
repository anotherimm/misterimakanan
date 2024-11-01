import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  SafeAreaView, 
  TouchableOpacity,
  Animated,
  LayoutAnimation,
  Platform,
  UIManager 
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

// Enable LayoutAnimation for Android
if (Platform.OS === 'android') {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

export default function HelpScreen({ navigation }) {
  const FaqItem = ({ question, answer }) => {
    const [isExpanded, setIsExpanded] = useState(false);

    const toggleExpand = () => {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
      setIsExpanded(!isExpanded);
    };

    return (
      <TouchableOpacity 
        style={styles.faqItem} 
        onPress={toggleExpand}
        activeOpacity={0.7}
      >
        <View style={styles.faqHeader}>
          <Text style={styles.faqQuestion}>{question}</Text>
          <MaterialCommunityIcons 
            name={isExpanded ? "chevron-up" : "chevron-down"} 
            size={24} 
            color="#666"
          />
        </View>
        {isExpanded && (
          <Text style={styles.faqAnswer}>{answer}</Text>
        )}
      </TouchableOpacity>
    );
  };

  const HelpSection = ({ title, items }) => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{title}</Text>
      {items.map((item, index) => (
        <FaqItem 
          key={index}
          question={item.question}
          answer={item.answer}
        />
      ))}
    </View>
  );

  const generalFaqs = [
    {
      question: "Bagaimana cara membuat akun?",
      answer: "Untuk membuat akun, tekan tombol 'Daftar' di halaman utama. Isi formulir pendaftaran dengan email dan kata sandi Anda. Anda juga bisa mendaftar menggunakan akun Google atau Facebook."
    },
    {
      question: "Bagaimana cara mengubah kata sandi?",
      answer: "Masuk ke menu Pengaturan > Keamanan Akun > Ubah Kata Sandi. Masukkan kata sandi lama Anda dan kata sandi baru yang diinginkan."
    },
    {
      question: "Bagaimana cara menghapus akun?",
      answer: "Untuk menghapus akun, masuk ke menu Pengaturan > Akun Saya > Hapus Akun. Anda akan diminta mengonfirmasi tindakan ini. Perlu diingat bahwa penghapusan akun bersifat permanen."
    }
  ];

  const recipeFaqs = [
    {
      question: "Bagaimana cara mengunggah resep?",
      answer: "Tekan tombol '+' di halaman utama, pilih 'Unggah Resep'. Isi formulir dengan nama resep, bahan-bahan, langkah-langkah, dan foto. Pastikan semua informasi lengkap sebelum mengunggah."
    },
    {
      question: "Bagaimana cara menyimpan resep favorit?",
      answer: "Tekan ikon bookmark pada resep yang ingin Anda simpan. Resep yang disimpan dapat ditemukan di menu 'Favorit Saya'."
    },
    {
      question: "Bagaimana cara berbagi resep?",
      answer: "Buka resep yang ingin dibagikan, tekan tombol 'Bagikan' di pojok kanan atas. Anda bisa membagikan resep melalui berbagai platform seperti WhatsApp, Email, atau media sosial."
    }
  ];

  const technicalFaqs = [
    {
      question: "Bagaimana jika aplikasi tidak berjalan dengan baik?",
      answer: "Cobalah langkah berikut:\n1. Tutup dan buka kembali aplikasi\n2. Periksa koneksi internet Anda\n3. Perbarui aplikasi ke versi terbaru\n4. Hapus cache aplikasi\nJika masalah berlanjut, silakan hubungi tim dukungan kami."
    },
    {
      question: "Mengapa saya tidak bisa mengunggah foto?",
      answer: "Pastikan:\n1. Aplikasi memiliki izin akses kamera/galeri\n2. Foto tidak melebihi 10MB\n3. Koneksi internet stabil\n4. Format foto didukung (JPG, PNG)"
    },
    {
      question: "Bagaimana cara memperbarui aplikasi?",
      answer: "Anda dapat memperbarui aplikasi melalui Play Store (Android) atau App Store (iOS). Aktifkan 'Update Otomatis' untuk selalu mendapatkan versi terbaru."
    }
  ];

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <MaterialCommunityIcons name="arrow-left" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Pusat Bantuan</Text>
      </View>

      <ScrollView style={styles.container}>
        <View style={styles.contentContainer}>
          <Text style={styles.introduction}>
            Selamat datang di Pusat Bantuan Misteri Makanan. 
            Temukan jawaban untuk pertanyaan umum Anda di bawah ini.
          </Text>

          <HelpSection title="Umum" items={generalFaqs} />
          <HelpSection title="Resep" items={recipeFaqs} />
          <HelpSection title="Teknis" items={technicalFaqs} />

          <View style={styles.contactInfo}>
            <Text style={styles.contactTitle}>Masih Butuh Bantuan?</Text>
            <Text style={styles.contactText}>
              Jika Anda tidak menemukan jawaban yang Anda cari, silakan hubungi tim dukungan kami:
            </Text>
            <TouchableOpacity style={styles.contactButton}>
              <MaterialCommunityIcons name="email-outline" size={20} color="#FFF" />
              <Text style={styles.contactButtonText}>Hubungi Dukungan</Text>
            </TouchableOpacity>
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
    marginBottom: 12,
  },
  faqItem: {
    backgroundColor: '#F8F9FA',
    borderRadius: 8,
    marginBottom: 8,
    padding: 16,
  },
  faqHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  faqQuestion: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
    flex: 1,
    marginRight: 16,
  },
  faqAnswer: {
    fontSize: 14,
    color: '#666',
    marginTop: 12,
    lineHeight: 20,
  },
  contactInfo: {
    marginTop: 20,
    padding: 16,
    backgroundColor: '#F8F9FA',
    borderRadius: 12,
    alignItems: 'center',
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
    marginBottom: 16,
    textAlign: 'center',
  },
  contactButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FF6B6B',
    padding: 12,
    borderRadius: 8,
    paddingHorizontal: 24,
  },
  contactButtonText: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: '500',
    marginLeft: 8,
  },
});