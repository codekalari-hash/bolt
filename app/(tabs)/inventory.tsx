import { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, TextInput, Modal } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../../contexts/AuthContext';
import { getInventoryItems } from '../../services/database';

export default function Inventory() {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);

  useEffect(() => {
    if (user) {
      loadInventory();
    }
  }, [user]);

  const loadInventory = async () => {
    if (!user) return;

    try {
      const data = await getInventoryItems(user.id);
      setItems(data);
    } catch (error) {
      console.error('Error loading inventory:', error);
    } finally {
      setLoading(false);
    }
  };

  const categories = ['All', 'Dairy', 'Meat', 'Vegetables', 'Bakery', 'Others'];

  const filteredItems = items.filter(
    (item) =>
      (categoryFilter === 'All' || item.category === categoryFilter) &&
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const expiringItems = items.filter((item) => item.daysUntilExpiry <= 3);

  const getExpiryColor = (days: number) => {
    if (days <= 1) return ['#ef4444', '#dc2626'];
    if (days <= 3) return ['#f59e0b', '#d97706'];
    return ['#10b981', '#059669'];
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <LinearGradient
          colors={['#ec4899', '#f97316', '#f0fdf4']}
          style={styles.header}
        >
          <View style={styles.headerContent}>
            <Text style={styles.headerTitle}>Inventory</Text>
            <Text style={styles.headerSubtitle}>Track your food items</Text>
          </View>
        </LinearGradient>
        <View style={styles.loadingContent}>
          <Text style={styles.loadingText}>Loading inventory...</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#ec4899', '#f97316', '#f0fdf4']}
        style={styles.header}
      >
        <View style={styles.headerContent}>
          <Text style={styles.headerTitle}>Inventory</Text>
          <Text style={styles.headerSubtitle}>Track your food items</Text>
        </View>
      </LinearGradient>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {expiringItems.length > 0 && (
          <BlurView intensity={30} tint="light" style={styles.alertCard}>
            <LinearGradient
              colors={['rgba(251, 146, 60, 0.1)', 'rgba(239, 68, 68, 0.1)']}
              style={styles.alertGradient}
            >
              <View style={styles.alertHeader}>
                <Ionicons name="warning" size={24} color="#f59e0b" />
                <Text style={styles.alertTitle}>
                  {expiringItems.length} item(s) expiring soon
                </Text>
              </View>
              <Text style={styles.alertText}>
                {expiringItems.map((item) => item.name).join(', ')}
              </Text>
            </LinearGradient>
          </BlurView>
        )}

        <View style={styles.searchContainer}>
          <BlurView intensity={30} tint="light" style={styles.searchBlur}>
            <View style={styles.searchInput}>
              <Ionicons name="search" size={20} color="#6b7280" />
              <TextInput
                style={styles.searchText}
                placeholder="Search items..."
                value={searchTerm}
                onChangeText={setSearchTerm}
                placeholderTextColor="#9ca3af"
              />
            </View>
          </BlurView>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.categoriesContainer}
          contentContainerStyle={styles.categoriesContent}
        >
          {categories.map((category) => (
            <TouchableOpacity
              key={category}
              onPress={() => setCategoryFilter(category)}
            >
              <BlurView
                intensity={categoryFilter === category ? 40 : 20}
                tint="light"
                style={[
                  styles.categoryChip,
                  categoryFilter === category && styles.categoryChipActive
                ]}
              >
                {categoryFilter === category ? (
                  <LinearGradient
                    colors={['#ec4899', '#f97316']}
                    style={styles.categoryGradient}
                  >
                    <Text style={styles.categoryTextActive}>{category}</Text>
                  </LinearGradient>
                ) : (
                  <Text style={styles.categoryText}>{category}</Text>
                )}
              </BlurView>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <View style={styles.itemsGrid}>
          {filteredItems.map((item) => (
            <BlurView key={item.id} intensity={30} tint="light" style={styles.itemCard}>
              <LinearGradient
                colors={['rgba(236, 72, 153, 0.05)', 'rgba(249, 115, 22, 0.05)']}
                style={styles.itemGradient}
              >
                <View style={styles.itemHeader}>
                  <View style={styles.itemLeft}>
                    <Text style={styles.itemName}>{item.name}</Text>
                    <Text style={styles.itemCategory}>{item.category}</Text>
                  </View>
                  <View style={styles.expiryBadge}>
                    <LinearGradient
                      colors={getExpiryColor(item.daysUntilExpiry)}
                      style={styles.expiryGradient}
                    >
                      <Ionicons name="time" size={12} color="#fff" />
                      <Text style={styles.expiryText}>
                        {item.daysUntilExpiry}d
                      </Text>
                    </LinearGradient>
                  </View>
                </View>

                <View style={styles.itemDetails}>
                  <View style={styles.detailRow}>
                    <Ionicons name="cube-outline" size={16} color="#6b7280" />
                    <Text style={styles.detailText}>
                      {item.quantity} {item.unit}
                    </Text>
                  </View>
                  <View style={styles.detailRow}>
                    <Ionicons name="leaf-outline" size={16} color="#10b981" />
                    <Text style={styles.detailText}>{item.carbonScore} kg CO₂</Text>
                  </View>
                  <View style={styles.detailRow}>
                    <Ionicons name="calendar-outline" size={16} color="#6b7280" />
                    <Text style={styles.detailText}>{item.expiryDate}</Text>
                  </View>
                </View>

                <View style={styles.itemActions}>
                  <TouchableOpacity style={styles.actionButton}>
                    <Text style={styles.actionButtonText}>Edit</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.actionButtonDanger}>
                    <Text style={styles.actionButtonTextDanger}>Remove</Text>
                  </TouchableOpacity>
                </View>
              </LinearGradient>
            </BlurView>
          ))}
        </View>

        {filteredItems.length === 0 && (
          <BlurView intensity={30} tint="light" style={styles.emptyCard}>
            <Ionicons name="cube-outline" size={64} color="#9ca3af" />
            <Text style={styles.emptyText}>No items found</Text>
            <Text style={styles.emptySubtext}>Add items to track your inventory</Text>
          </BlurView>
        )}

        <View style={{ height: 100 }} />
      </ScrollView>

      <TouchableOpacity
        style={styles.fab}
        onPress={() => setShowAddModal(true)}
      >
        <LinearGradient
          colors={['#ec4899', '#f97316']}
          style={styles.fabGradient}
        >
          <Ionicons name="add" size={32} color="#fff" />
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0fdf4',
  },
  loadingContainer: {
    flex: 1,
    backgroundColor: '#f0fdf4',
  },
  loadingContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingText: {
    fontSize: 16,
    color: '#6b7280',
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
  alertCard: {
    borderRadius: 24,
    overflow: 'hidden',
    marginBottom: 20,
  },
  alertGradient: {
    padding: 16,
  },
  alertHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  alertTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#f59e0b',
    marginLeft: 8,
  },
  alertText: {
    fontSize: 14,
    color: '#6b7280',
  },
  searchContainer: {
    marginBottom: 16,
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
  categoriesContainer: {
    marginBottom: 20,
  },
  categoriesContent: {
    gap: 8,
    paddingRight: 20,
  },
  categoryChip: {
    borderRadius: 16,
    overflow: 'hidden',
  },
  categoryChipActive: {
    borderRadius: 16,
  },
  categoryGradient: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  categoryText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6b7280',
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  categoryTextActive: {
    fontSize: 14,
    fontWeight: '600',
    color: '#fff',
  },
  itemsGrid: {
    gap: 16,
  },
  itemCard: {
    borderRadius: 24,
    overflow: 'hidden',
  },
  itemGradient: {
    padding: 20,
  },
  itemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  itemLeft: {
    flex: 1,
  },
  itemName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 4,
  },
  itemCategory: {
    fontSize: 14,
    color: '#6b7280',
  },
  expiryBadge: {
    borderRadius: 12,
    overflow: 'hidden',
  },
  expiryGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 6,
    gap: 4,
  },
  expiryText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#fff',
  },
  itemDetails: {
    gap: 8,
    marginBottom: 16,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  detailText: {
    fontSize: 14,
    color: '#4b5563',
  },
  itemActions: {
    flexDirection: 'row',
    gap: 8,
  },
  actionButton: {
    flex: 1,
    backgroundColor: 'rgba(236, 72, 153, 0.1)',
    borderRadius: 12,
    paddingVertical: 10,
    alignItems: 'center',
  },
  actionButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#ec4899',
  },
  actionButtonDanger: {
    flex: 1,
    backgroundColor: 'rgba(239, 68, 68, 0.1)',
    borderRadius: 12,
    paddingVertical: 10,
    alignItems: 'center',
  },
  actionButtonTextDanger: {
    fontSize: 14,
    fontWeight: '600',
    color: '#ef4444',
  },
  emptyCard: {
    borderRadius: 24,
    padding: 48,
    alignItems: 'center',
    overflow: 'hidden',
  },
  emptyText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#6b7280',
    marginTop: 16,
  },
  emptySubtext: {
    fontSize: 14,
    color: '#9ca3af',
    marginTop: 4,
  },
  fab: {
    position: 'absolute',
    bottom: 90,
    right: 20,
    borderRadius: 28,
    overflow: 'hidden',
    shadowColor: '#ec4899',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.4,
    shadowRadius: 16,
    elevation: 8,
  },
  fabGradient: {
    width: 56,
    height: 56,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
