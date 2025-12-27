import { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Modal, TextInput, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

export default function EcoWatt() {
  const [showModal, setShowModal] = useState(false);
  const [appliance, setAppliance] = useState('');
  const [usage, setUsage] = useState('');
  const [cost, setCost] = useState('');

  const summary = {
    monthlyUsage: 458,
    monthlyCost: 89,
    changePercentage: -5,
  };

  const appliances = [
    { name: 'Air Conditioner', usage: 180, percentage: 39, color: ['#f59e0b', '#d97706'] },
    { name: 'Refrigerator', usage: 120, percentage: 26, color: ['#3b82f6', '#2563eb'] },
    { name: 'Water Heater', usage: 80, percentage: 17, color: ['#8b5cf6', '#7c3aed'] },
    { name: 'Lighting', usage: 45, percentage: 10, color: ['#10b981', '#059669'] },
    { name: 'Others', usage: 33, percentage: 8, color: ['#6b7280', '#4b5563'] },
  ];

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#f59e0b', '#ef4444', '#f0fdf4']}
        style={styles.header}
      >
        <View style={styles.headerContent}>
          <Text style={styles.headerTitle}>EcoWatt</Text>
          <Text style={styles.headerSubtitle}>Track your energy consumption</Text>
        </View>
      </LinearGradient>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <BlurView intensity={30} tint="light" style={styles.summaryCard}>
          <LinearGradient
            colors={['rgba(251, 146, 60, 0.1)', 'rgba(239, 68, 68, 0.1)']}
            style={styles.summaryGradient}
          >
            <View style={styles.summaryRow}>
              <View style={styles.summaryItem}>
                <LinearGradient
                  colors={['#f59e0b', '#d97706']}
                  style={styles.summaryIcon}
                >
                  <Ionicons name="flash" size={32} color="#fff" />
                </LinearGradient>
                <View style={styles.summaryText}>
                  <Text style={styles.summaryLabel}>Monthly Usage</Text>
                  <Text style={styles.summaryValue}>{summary.monthlyUsage}</Text>
                  <Text style={styles.summaryUnit}>kWh</Text>
                </View>
              </View>
            </View>

            <View style={styles.statsGrid}>
              <View style={styles.statBox}>
                <Ionicons name="cash-outline" size={20} color="#10b981" />
                <Text style={styles.statLabel}>Cost</Text>
                <Text style={styles.statValue}>${summary.monthlyCost}</Text>
              </View>
              <View style={styles.statBox}>
                <Ionicons
                  name={summary.changePercentage < 0 ? "trending-down" : "trending-up"}
                  size={20}
                  color={summary.changePercentage < 0 ? "#10b981" : "#ef4444"}
                />
                <Text style={styles.statLabel}>Change</Text>
                <Text style={[
                  styles.statValue,
                  { color: summary.changePercentage < 0 ? '#10b981' : '#ef4444' }
                ]}>
                  {summary.changePercentage}%
                </Text>
              </View>
            </View>
          </LinearGradient>
        </BlurView>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Appliance Breakdown</Text>
            <TouchableOpacity
              style={styles.addButton}
              onPress={() => setShowModal(true)}
            >
              <LinearGradient
                colors={['#f59e0b', '#d97706']}
                style={styles.addButtonGradient}
              >
                <Ionicons name="add" size={24} color="#fff" />
              </LinearGradient>
            </TouchableOpacity>
          </View>

          {appliances.map((item, index) => (
            <BlurView key={index} intensity={20} tint="light" style={styles.applianceCard}>
              <View style={styles.applianceContent}>
                <LinearGradient
                  colors={item.color}
                  style={styles.applianceIcon}
                >
                  <Ionicons name="bulb" size={20} color="#fff" />
                </LinearGradient>
                <View style={styles.applianceInfo}>
                  <Text style={styles.applianceName}>{item.name}</Text>
                  <View style={styles.progressContainer}>
                    <View style={styles.progressBg}>
                      <LinearGradient
                        colors={item.color}
                        style={[styles.progressFill, { width: `${item.percentage}%` }]}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                      />
                    </View>
                    <Text style={styles.progressText}>{item.percentage}%</Text>
                  </View>
                </View>
                <Text style={styles.applianceUsage}>{item.usage} kWh</Text>
              </View>
            </BlurView>
          ))}
        </View>

        <BlurView intensity={30} tint="light" style={styles.tipsCard}>
          <LinearGradient
            colors={['rgba(59, 130, 246, 0.1)', 'rgba(99, 102, 241, 0.1)']}
            style={styles.tipsGradient}
          >
            <View style={styles.tipsHeader}>
              <LinearGradient
                colors={['#3b82f6', '#6366f1']}
                style={styles.tipsIcon}
              >
                <Ionicons name="bulb-outline" size={24} color="#fff" />
              </LinearGradient>
              <Text style={styles.tipsTitle}>Energy Saving Tips</Text>
            </View>
            <View style={styles.tipsList}>
              <View style={styles.tipItem}>
                <View style={styles.tipDot} />
                <Text style={styles.tipText}>Unplug devices when not in use</Text>
              </View>
              <View style={styles.tipItem}>
                <View style={styles.tipDot} />
                <Text style={styles.tipText}>Use LED bulbs - 75% less energy</Text>
              </View>
              <View style={styles.tipItem}>
                <View style={styles.tipDot} />
                <Text style={styles.tipText}>Set AC to 24°C for efficiency</Text>
              </View>
              <View style={styles.tipItem}>
                <View style={styles.tipDot} />
                <Text style={styles.tipText}>Run dishwasher only when full</Text>
              </View>
            </View>
          </LinearGradient>
        </BlurView>

        <View style={{ height: 100 }} />
      </ScrollView>

      <Modal
        visible={showModal}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowModal(false)}
      >
        <View style={styles.modalContainer}>
          <BlurView intensity={50} tint="dark" style={styles.modalBlur}>
            <View style={styles.modalContent}>
              <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>Add Energy Usage</Text>
                <TouchableOpacity onPress={() => setShowModal(false)}>
                  <Ionicons name="close" size={28} color="#1f2937" />
                </TouchableOpacity>
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Appliance Name</Text>
                <TextInput
                  style={styles.input}
                  placeholder="e.g., Air Conditioner"
                  value={appliance}
                  onChangeText={setAppliance}
                  placeholderTextColor="#9ca3af"
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Usage (kWh)</Text>
                <TextInput
                  style={styles.input}
                  placeholder="e.g., 12.5"
                  value={usage}
                  onChangeText={setUsage}
                  keyboardType="decimal-pad"
                  placeholderTextColor="#9ca3af"
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Cost ($)</Text>
                <TextInput
                  style={styles.input}
                  placeholder="e.g., 2.15"
                  value={cost}
                  onChangeText={setCost}
                  keyboardType="decimal-pad"
                  placeholderTextColor="#9ca3af"
                />
              </View>

              <TouchableOpacity style={styles.submitButton}>
                <LinearGradient
                  colors={['#f59e0b', '#d97706']}
                  style={styles.submitGradient}
                >
                  <Text style={styles.submitText}>Add Usage</Text>
                </LinearGradient>
              </TouchableOpacity>
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
  summaryCard: {
    borderRadius: 32,
    overflow: 'hidden',
    marginBottom: 24,
  },
  summaryGradient: {
    padding: 24,
  },
  summaryRow: {
    marginBottom: 20,
  },
  summaryItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  summaryIcon: {
    width: 72,
    height: 72,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  summaryText: {
    flex: 1,
  },
  summaryLabel: {
    fontSize: 14,
    color: '#6b7280',
    fontWeight: '600',
    marginBottom: 4,
  },
  summaryValue: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#f59e0b',
  },
  summaryUnit: {
    fontSize: 14,
    color: '#6b7280',
  },
  statsGrid: {
    flexDirection: 'row',
    gap: 12,
  },
  statBox: {
    flex: 1,
    backgroundColor: 'rgba(255,255,255,0.5)',
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
  },
  statLabel: {
    fontSize: 12,
    color: '#6b7280',
    fontWeight: '600',
    marginTop: 8,
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1f2937',
    marginTop: 4,
  },
  section: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1f2937',
  },
  addButton: {
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#f59e0b',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
  },
  addButtonGradient: {
    width: 48,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
  },
  applianceCard: {
    borderRadius: 20,
    overflow: 'hidden',
    marginBottom: 12,
  },
  applianceContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  applianceIcon: {
    width: 48,
    height: 48,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  applianceInfo: {
    flex: 1,
  },
  applianceName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 8,
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  progressBg: {
    flex: 1,
    height: 6,
    backgroundColor: '#e5e7eb',
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 3,
  },
  progressText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#6b7280',
    width: 35,
  },
  applianceUsage: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#1f2937',
  },
  tipsCard: {
    borderRadius: 24,
    overflow: 'hidden',
    marginBottom: 24,
  },
  tipsGradient: {
    padding: 20,
  },
  tipsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  tipsIcon: {
    width: 48,
    height: 48,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  tipsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1f2937',
  },
  tipsList: {
    gap: 12,
  },
  tipItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  tipDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#3b82f6',
    marginRight: 12,
  },
  tipText: {
    flex: 1,
    fontSize: 14,
    color: '#4b5563',
  },
  modalContainer: {
    flex: 1,
  },
  modalBlur: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    padding: 24,
    maxHeight: '80%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1f2937',
  },
  inputGroup: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#f3f4f6',
    borderRadius: 16,
    padding: 16,
    fontSize: 16,
    color: '#1f2937',
  },
  submitButton: {
    borderRadius: 20,
    overflow: 'hidden',
    marginTop: 8,
  },
  submitGradient: {
    padding: 18,
    alignItems: 'center',
  },
  submitText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
});
