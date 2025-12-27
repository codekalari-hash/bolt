import { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, TextInput, Modal } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { Ionicons } from '@expo/vector-icons';

export default function EcoScan() {
  const [showScanner, setShowScanner] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const recentScans = [
    { id: 1, name: 'Organic Milk', carbon: 2.5, alternative: 'Oat Milk', savings: 40 },
    { id: 2, name: 'Beef Patty', carbon: 8.2, alternative: 'Plant Burger', savings: 75 },
    { id: 3, name: 'Plastic Water Bottle', carbon: 1.2, alternative: 'Reusable Bottle', savings: 95 },
  ];

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#8b5cf6', '#06b6d4', '#f0fdf4']}
        style={styles.header}
      >
        <View style={styles.headerContent}>
          <Text style={styles.headerTitle}>EcoScan</Text>
          <Text style={styles.headerSubtitle}>Scan products to see their impact</Text>
        </View>
      </LinearGradient>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.searchContainer}>
          <BlurView intensity={30} tint="light" style={styles.searchBlur}>
            <View style={styles.searchInput}>
              <Ionicons name="search" size={20} color="#6b7280" />
              <TextInput
                style={styles.searchText}
                placeholder="Search products..."
                value={searchQuery}
                onChangeText={setSearchQuery}
                placeholderTextColor="#9ca3af"
              />
            </View>
          </BlurView>
        </View>

        <TouchableOpacity
          style={styles.scanButton}
          onPress={() => setShowScanner(true)}
        >
          <LinearGradient
            colors={['#8b5cf6', '#6366f1']}
            style={styles.scanGradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <View style={styles.scanIconContainer}>
              <Ionicons name="scan" size={64} color="#fff" />
            </View>
            <Text style={styles.scanText}>Scan Barcode</Text>
            <Text style={styles.scanSubtext}>Point camera at product barcode</Text>
          </LinearGradient>
        </TouchableOpacity>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recent Scans</Text>
          {recentScans.map((scan) => (
            <BlurView key={scan.id} intensity={30} tint="light" style={styles.scanCard}>
              <LinearGradient
                colors={['rgba(139, 92, 246, 0.05)', 'rgba(6, 182, 212, 0.05)']}
                style={styles.scanCardGradient}
              >
                <View style={styles.scanCardHeader}>
                  <View style={styles.scanCardLeft}>
                    <Text style={styles.scanCardName}>{scan.name}</Text>
                    <View style={styles.carbonBadge}>
                      <Ionicons name="leaf-outline" size={14} color="#ef4444" />
                      <Text style={styles.carbonText}>{scan.carbon} kg CO₂</Text>
                    </View>
                  </View>
                  <LinearGradient
                    colors={['#8b5cf6', '#6366f1']}
                    style={styles.scanIcon}
                  >
                    <Ionicons name="cube-outline" size={24} color="#fff" />
                  </LinearGradient>
                </View>

                <View style={styles.alternativeContainer}>
                  <View style={styles.alternativeHeader}>
                    <Ionicons name="swap-horizontal" size={16} color="#10b981" />
                    <Text style={styles.alternativeLabel}>Better Alternative</Text>
                  </View>
                  <View style={styles.alternativeContent}>
                    <Text style={styles.alternativeName}>{scan.alternative}</Text>
                    <View style={styles.savingsBadge}>
                      <Ionicons name="arrow-down" size={12} color="#10b981" />
                      <Text style={styles.savingsText}>{scan.savings}% less carbon</Text>
                    </View>
                  </View>
                </View>
              </LinearGradient>
            </BlurView>
          ))}
        </View>

        <View style={{ height: 100 }} />
      </ScrollView>

      <Modal
        visible={showScanner}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowScanner(false)}
      >
        <View style={styles.modalContainer}>
          <BlurView intensity={50} tint="dark" style={styles.modalBlur}>
            <View style={styles.scannerContainer}>
              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => setShowScanner(false)}
              >
                <Ionicons name="close" size={32} color="#fff" />
              </TouchableOpacity>

              <View style={styles.scanFrame}>
                <View style={styles.scanCorner} />
                <View style={[styles.scanCorner, styles.scanCornerTopRight]} />
                <View style={[styles.scanCorner, styles.scanCornerBottomLeft]} />
                <View style={[styles.scanCorner, styles.scanCornerBottomRight]} />
              </View>

              <Text style={styles.scannerText}>Position barcode within frame</Text>
            </View>
          </BlurView>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0fdf4',
  },
  header: {
    paddingTop: 60,
    paddingBottom: 32,
    paddingHorizontal: 24,
  },
  headerContent: {
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 16,
    color: 'rgba(255,255,255,0.8)',
  },
  content: {
    flex: 1,
    padding: 20,
    marginTop: -20,
  },
  searchContainer: {
    marginBottom: 20,
  },
  searchBlur: {
    borderRadius: 24,
    overflow: 'hidden',
  },
  searchInput: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    gap: 12,
  },
  searchText: {
    flex: 1,
    fontSize: 16,
    color: '#1f2937',
  },
  scanButton: {
    marginBottom: 32,
    borderRadius: 32,
    overflow: 'hidden',
    shadowColor: '#8b5cf6',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 8,
  },
  scanGradient: {
    padding: 40,
    alignItems: 'center',
  },
  scanIconContainer: {
    marginBottom: 16,
  },
  scanText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
  },
  scanSubtext: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.8)',
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 16,
  },
  scanCard: {
    borderRadius: 24,
    overflow: 'hidden',
    marginBottom: 16,
  },
  scanCardGradient: {
    padding: 20,
  },
  scanCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  scanCardLeft: {
    flex: 1,
  },
  scanCardName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 8,
  },
  carbonBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(239, 68, 68, 0.1)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    alignSelf: 'flex-start',
  },
  carbonText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#ef4444',
    marginLeft: 4,
  },
  scanIcon: {
    width: 56,
    height: 56,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  alternativeContainer: {
    backgroundColor: 'rgba(16, 185, 129, 0.05)',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: 'rgba(16, 185, 129, 0.2)',
  },
  alternativeHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  alternativeLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#10b981',
    marginLeft: 6,
  },
  alternativeContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  alternativeName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1f2937',
  },
  savingsBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(16, 185, 129, 0.1)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 10,
  },
  savingsText: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#10b981',
    marginLeft: 4,
  },
  modalContainer: {
    flex: 1,
  },
  modalBlur: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scannerContainer: {
    alignItems: 'center',
  },
  closeButton: {
    position: 'absolute',
    top: -120,
    right: 20,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  scanFrame: {
    width: 280,
    height: 280,
    borderWidth: 2,
    borderColor: '#fff',
    borderRadius: 24,
    position: 'relative',
  },
  scanCorner: {
    position: 'absolute',
    width: 40,
    height: 40,
    borderTopWidth: 4,
    borderLeftWidth: 4,
    borderColor: '#10b981',
    top: -2,
    left: -2,
  },
  scanCornerTopRight: {
    borderTopWidth: 4,
    borderLeftWidth: 0,
    borderRightWidth: 4,
    left: undefined,
    right: -2,
  },
  scanCornerBottomLeft: {
    borderTopWidth: 0,
    borderBottomWidth: 4,
    top: undefined,
    bottom: -2,
  },
  scanCornerBottomRight: {
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 4,
    borderBottomWidth: 4,
    top: undefined,
    bottom: -2,
    left: undefined,
    right: -2,
  },
  scannerText: {
    fontSize: 16,
    color: '#fff',
    marginTop: 24,
    fontWeight: '600',
  },
});
