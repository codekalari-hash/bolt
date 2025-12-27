import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useAuth } from '../../contexts/AuthContext';

export default function Profile() {
  const router = useRouter();
  const { profile, signOut } = useAuth();

  const handleSignOut = async () => {
    await signOut();
    router.replace('/(auth)/login');
  };

  const stats = [
    { icon: 'leaf', label: 'CO₂ Saved', value: '450 kg', color: ['#10b981', '#059669'] },
    { icon: 'trophy', label: 'Total Points', value: '8,420', color: ['#f59e0b', '#d97706'] },
    { icon: 'flame', label: 'Day Streak', value: '15 days', color: ['#ef4444', '#dc2626'] },
    { icon: 'calendar', label: 'Member Since', value: 'Jan 2024', color: ['#3b82f6', '#2563eb'] },
  ];

  const achievements = [
    { id: 1, icon: '🌱', name: 'Beginner', unlocked: true },
    { id: 2, icon: '🌿', name: 'Eco Warrior', unlocked: true },
    { id: 3, icon: '🌳', name: 'Tree Hugger', unlocked: true },
    { id: 4, icon: '🏆', name: 'Champion', unlocked: false },
    { id: 5, icon: '👑', name: 'Legend', unlocked: false },
    { id: 6, icon: '⭐', name: 'Master', unlocked: false },
  ];

  const menuItems = [
    { icon: 'person-outline', label: 'Edit Profile', action: () => {} },
    { icon: 'settings-outline', label: 'Settings', action: () => {} },
    { icon: 'help-circle-outline', label: 'Help & Support', action: () => {} },
    { icon: 'information-circle-outline', label: 'About', action: () => {} },
  ];

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#10b981', '#06b6d4', '#f0fdf4']}
        style={styles.header}
      >
        <View style={styles.headerContent}>
          <TouchableOpacity style={styles.logoutButton} onPress={handleSignOut}>
            <Ionicons name="log-out-outline" size={24} color="#fff" />
          </TouchableOpacity>
        </View>
      </LinearGradient>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.profileSection}>
          <LinearGradient
            colors={['#10b981', '#06b6d4']}
            style={styles.avatar}
          >
            <Text style={styles.avatarText}>
              {profile?.name.charAt(0).toUpperCase() || 'E'}
            </Text>
          </LinearGradient>
          <Text style={styles.name}>{profile?.name || 'EcoUser'}</Text>
          <Text style={styles.email}>{profile?.email || 'user@eco.com'}</Text>
          <View style={styles.levelBadge}>
            <LinearGradient
              colors={['#f59e0b', '#d97706']}
              style={styles.levelGradient}
            >
              <Ionicons name="star" size={16} color="#fff" />
              <Text style={styles.levelText}>Level {profile?.level || 1}</Text>
            </LinearGradient>
          </View>
        </View>

        <View style={styles.statsGrid}>
          {stats.map((stat, index) => (
            <BlurView key={index} intensity={30} tint="light" style={styles.statCard}>
              <LinearGradient
                colors={[...stat.color, stat.color[0] + '20']}
                style={styles.statGradient}
              >
                <View style={styles.statIconContainer}>
                  <LinearGradient
                    colors={stat.color}
                    style={styles.statIcon}
                  >
                    <Ionicons name={stat.icon as any} size={24} color="#fff" />
                  </LinearGradient>
                </View>
                <Text style={styles.statLabel}>{stat.label}</Text>
                <Text style={styles.statValue}>{stat.value}</Text>
              </LinearGradient>
            </BlurView>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Achievements</Text>
          <View style={styles.achievementsGrid}>
            {achievements.map((achievement) => (
              <BlurView
                key={achievement.id}
                intensity={achievement.unlocked ? 30 : 10}
                tint="light"
                style={[
                  styles.achievementCard,
                  !achievement.unlocked && styles.achievementLocked
                ]}
              >
                <Text style={styles.achievementIcon}>{achievement.icon}</Text>
                <Text style={[
                  styles.achievementName,
                  !achievement.unlocked && styles.achievementNameLocked
                ]}>
                  {achievement.name}
                </Text>
                {achievement.unlocked && (
                  <View style={styles.unlockedBadge}>
                    <Ionicons name="checkmark-circle" size={16} color="#10b981" />
                  </View>
                )}
              </BlurView>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Settings</Text>
          {menuItems.map((item, index) => (
            <TouchableOpacity
              key={index}
              onPress={item.action}
            >
              <BlurView intensity={30} tint="light" style={styles.menuItem}>
                <View style={styles.menuItemLeft}>
                  <View style={styles.menuIcon}>
                    <Ionicons name={item.icon as any} size={22} color="#10b981" />
                  </View>
                  <Text style={styles.menuLabel}>{item.label}</Text>
                </View>
                <Ionicons name="chevron-forward" size={20} color="#9ca3af" />
              </BlurView>
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity
          style={styles.dangerButton}
          onPress={handleSignOut}
        >
          <BlurView intensity={30} tint="light" style={styles.dangerBlur}>
            <View style={styles.dangerContent}>
              <Ionicons name="log-out-outline" size={22} color="#ef4444" />
              <Text style={styles.dangerText}>Sign Out</Text>
            </View>
          </BlurView>
        </TouchableOpacity>

        <View style={{ height: 100 }} />
      </ScrollView>
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
    paddingBottom: 120,
    paddingHorizontal: 24,
  },
  headerContent: {
    alignItems: 'flex-end',
  },
  logoutButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    flex: 1,
    marginTop: -100,
  },
  profileSection: {
    alignItems: 'center',
    marginBottom: 32,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 8,
  },
  avatarText: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#fff',
  },
  name: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 4,
  },
  email: {
    fontSize: 16,
    color: '#6b7280',
    marginBottom: 12,
  },
  levelBadge: {
    borderRadius: 20,
    overflow: 'hidden',
  },
  levelGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 8,
    gap: 6,
  },
  levelText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#fff',
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 20,
    gap: 12,
    marginBottom: 32,
  },
  statCard: {
    width: '48%',
    borderRadius: 20,
    overflow: 'hidden',
  },
  statGradient: {
    padding: 16,
    alignItems: 'center',
  },
  statIconContainer: {
    marginBottom: 12,
  },
  statIcon: {
    width: 56,
    height: 56,
    borderRadius: 18,
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
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1f2937',
  },
  section: {
    paddingHorizontal: 20,
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 16,
  },
  achievementsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  achievementCard: {
    width: '31%',
    borderRadius: 20,
    padding: 16,
    alignItems: 'center',
    overflow: 'hidden',
    position: 'relative',
  },
  achievementLocked: {
    opacity: 0.4,
  },
  achievementIcon: {
    fontSize: 40,
    marginBottom: 8,
  },
  achievementName: {
    fontSize: 11,
    fontWeight: '600',
    color: '#1f2937',
    textAlign: 'center',
  },
  achievementNameLocked: {
    color: '#9ca3af',
  },
  unlockedBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
  },
  menuItem: {
    borderRadius: 16,
    marginBottom: 12,
    overflow: 'hidden',
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    flex: 1,
  },
  menuIcon: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: 'rgba(16, 185, 129, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  menuLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
    flex: 1,
  },
  dangerButton: {
    marginHorizontal: 20,
    marginBottom: 24,
    borderRadius: 16,
    overflow: 'hidden',
  },
  dangerBlur: {
    overflow: 'hidden',
  },
  dangerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 18,
    gap: 8,
  },
  dangerText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ef4444',
  },
});
