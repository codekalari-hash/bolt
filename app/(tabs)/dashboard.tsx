import { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../../contexts/AuthContext';
import { getCarbonSummary } from '../../services/database';

const { width } = Dimensions.get('window');

export default function Dashboard() {
  const { user } = useAuth();
  const [carbonSummary, setCarbonSummary] = useState({ today: 0, week: 0, month: 0, target: 150 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      loadDashboardData();
    }
  }, [user]);

  const loadDashboardData = async () => {
    if (!user) return;
    try {
      const summary = await getCarbonSummary(user.id);
      setCarbonSummary(summary);
    } catch (error) {
      console.error('Error loading dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const progress = (carbonSummary.month / carbonSummary.target) * 100;

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <LinearGradient
        colors={['#10b981', '#06b6d4', '#f0fdf4']}
        style={styles.header}
      >
        <View style={styles.headerContent}>
          <View>
            <Text style={styles.greeting}>Welcome back</Text>
            <Text style={styles.headerTitle}>Your Impact Today</Text>
          </View>
          <TouchableOpacity style={styles.notificationButton}>
            <Ionicons name="notifications-outline" size={24} color="#fff" />
          </TouchableOpacity>
        </View>
      </LinearGradient>

      <View style={styles.content}>
        <BlurView intensity={30} tint="light" style={styles.mainCard}>
          <LinearGradient
            colors={['rgba(16, 185, 129, 0.1)', 'rgba(6, 182, 212, 0.1)']}
            style={styles.mainCardGradient}
          >
            <View style={styles.mainCardContent}>
              <View style={styles.mainCardLeft}>
                <Text style={styles.mainCardLabel}>Today's Carbon</Text>
                <Text style={styles.mainCardValue}>{carbonSummary.today}</Text>
                <Text style={styles.mainCardUnit}>kg CO₂ saved</Text>
                <View style={styles.badge}>
                  <Ionicons name="trending-down" size={16} color="#10b981" />
                  <Text style={styles.badgeText}>8% better</Text>
                </View>
              </View>
              <LinearGradient
                colors={['#10b981', '#06b6d4']}
                style={styles.mainCardIcon}
              >
                <Ionicons name="leaf" size={48} color="#fff" />
              </LinearGradient>
            </View>
          </LinearGradient>
        </BlurView>

        <View style={styles.statsRow}>
          <BlurView intensity={30} tint="light" style={styles.statCard}>
            <LinearGradient
              colors={['rgba(59, 130, 246, 0.1)', 'rgba(99, 102, 241, 0.1)']}
              style={styles.statCardGradient}
            >
              <View style={styles.statIconContainer}>
                <LinearGradient
                  colors={['#3b82f6', '#6366f1']}
                  style={styles.statIcon}
                >
                  <Ionicons name="flash" size={24} color="#fff" />
                </LinearGradient>
              </View>
              <Text style={styles.statLabel}>This Week</Text>
              <Text style={styles.statValue}>{carbonSummary.week}</Text>
              <Text style={styles.statUnit}>kg CO₂</Text>
            </LinearGradient>
          </BlurView>

          <BlurView intensity={30} tint="light" style={styles.statCard}>
            <LinearGradient
              colors={['rgba(168, 85, 247, 0.1)', 'rgba(236, 72, 153, 0.1)']}
              style={styles.statCardGradient}
            >
              <View style={styles.statIconContainer}>
                <LinearGradient
                  colors={['#a855f7', '#ec4899']}
                  style={styles.statIcon}
                >
                  <Ionicons name="calendar" size={24} color="#fff" />
                </LinearGradient>
              </View>
              <Text style={styles.statLabel}>This Month</Text>
              <Text style={styles.statValue}>{carbonSummary.month}</Text>
              <Text style={styles.statUnit}>kg CO₂</Text>
            </LinearGradient>
          </BlurView>
        </View>

        <BlurView intensity={30} tint="light" style={styles.goalCard}>
          <LinearGradient
            colors={['rgba(251, 146, 60, 0.1)', 'rgba(251, 113, 133, 0.1)']}
            style={styles.goalCardGradient}
          >
            <View style={styles.goalHeader}>
              <View>
                <Text style={styles.goalLabel}>Monthly Goal</Text>
                <Text style={styles.goalValue}>{progress.toFixed(0)}%</Text>
              </View>
              <LinearGradient
                colors={['#fb923c', '#fb7185']}
                style={styles.goalIcon}
              >
                <Ionicons name="target" size={32} color="#fff" />
              </LinearGradient>
            </View>
            <View style={styles.progressBarContainer}>
              <View style={styles.progressBarBg}>
                <LinearGradient
                  colors={['#fb923c', '#fb7185']}
                  style={[styles.progressBar, { width: `${progress}%` }]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                />
              </View>
              <Text style={styles.progressText}>
                {carbonSummary.month} / {carbonSummary.target} kg CO₂
              </Text>
            </View>
          </LinearGradient>
        </BlurView>

        <View style={styles.quickActions}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.actionsGrid}>
            <TouchableOpacity style={styles.actionButton}>
              <LinearGradient
                colors={['#10b981', '#059669']}
                style={styles.actionGradient}
              >
                <Ionicons name="add-circle" size={32} color="#fff" />
              </LinearGradient>
              <Text style={styles.actionText}>Log Activity</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.actionButton}>
              <LinearGradient
                colors={['#3b82f6', '#2563eb']}
                style={styles.actionGradient}
              >
                <Ionicons name="analytics" size={32} color="#fff" />
              </LinearGradient>
              <Text style={styles.actionText}>View Stats</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.actionButton}>
              <LinearGradient
                colors={['#a855f7', '#9333ea']}
                style={styles.actionGradient}
              >
                <Ionicons name="trophy" size={32} color="#fff" />
              </LinearGradient>
              <Text style={styles.actionText}>Achievements</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.actionButton}>
              <LinearGradient
                colors={['#f59e0b', '#d97706']}
                style={styles.actionGradient}
              >
                <Ionicons name="bulb" size={32} color="#fff" />
              </LinearGradient>
              <Text style={styles.actionText}>Get Tips</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={{ height: 100 }} />
      </View>
    </ScrollView>
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  greeting: {
    fontSize: 16,
    color: 'rgba(255,255,255,0.8)',
    marginBottom: 4,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
  },
  notificationButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    padding: 20,
    marginTop: -20,
  },
  mainCard: {
    borderRadius: 32,
    overflow: 'hidden',
    marginBottom: 20,
  },
  mainCardGradient: {
    padding: 24,
  },
  mainCardContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  mainCardLeft: {
    flex: 1,
  },
  mainCardLabel: {
    fontSize: 14,
    color: '#6b7280',
    fontWeight: '600',
    marginBottom: 8,
  },
  mainCardValue: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#10b981',
  },
  mainCardUnit: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 12,
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(16, 185, 129, 0.1)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    alignSelf: 'flex-start',
  },
  badgeText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#10b981',
    marginLeft: 4,
  },
  mainCardIcon: {
    width: 80,
    height: 80,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    transform: [{ rotate: '10deg' }],
  },
  statsRow: {
    flexDirection: 'row',
    marginBottom: 20,
    gap: 12,
  },
  statCard: {
    flex: 1,
    borderRadius: 24,
    overflow: 'hidden',
  },
  statCardGradient: {
    padding: 20,
  },
  statIconContainer: {
    marginBottom: 12,
  },
  statIcon: {
    width: 48,
    height: 48,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  statLabel: {
    fontSize: 12,
    color: '#6b7280',
    fontWeight: '600',
    marginBottom: 4,
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1f2937',
  },
  statUnit: {
    fontSize: 12,
    color: '#6b7280',
  },
  goalCard: {
    borderRadius: 24,
    overflow: 'hidden',
    marginBottom: 24,
  },
  goalCardGradient: {
    padding: 24,
  },
  goalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  goalLabel: {
    fontSize: 14,
    color: '#6b7280',
    fontWeight: '600',
    marginBottom: 4,
  },
  goalValue: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#fb923c',
  },
  goalIcon: {
    width: 64,
    height: 64,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  progressBarContainer: {
    gap: 8,
  },
  progressBarBg: {
    height: 16,
    backgroundColor: '#e5e7eb',
    borderRadius: 8,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    borderRadius: 8,
  },
  progressText: {
    fontSize: 12,
    color: '#6b7280',
    fontWeight: '600',
  },
  quickActions: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 16,
  },
  actionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  actionButton: {
    width: (width - 64) / 2,
    alignItems: 'center',
  },
  actionGradient: {
    width: 72,
    height: 72,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  actionText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#1f2937',
    textAlign: 'center',
  },
});
