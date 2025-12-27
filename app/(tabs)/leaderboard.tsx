import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { Ionicons } from '@expo/vector-icons';

export default function Leaderboard() {
  const topUsers = [
    { rank: 1, name: 'Sarah Green', points: 12580, carbon: 892, avatar: '🌟' },
    { rank: 2, name: 'Mike Eco', points: 11240, carbon: 845, avatar: '🌱' },
    { rank: 3, name: 'Emma Earth', points: 10890, carbon: 810, avatar: '🌍' },
  ];

  const otherUsers = [
    { rank: 4, name: 'John Leaf', points: 9520, carbon: 742, avatar: '🍃' },
    { rank: 5, name: 'Lisa Nature', points: 8890, carbon: 698, avatar: '🌿' },
    { rank: 6, name: 'Tom Forest', points: 8240, carbon: 645, avatar: '🌳' },
    { rank: 7, name: 'Anna Sky', points: 7650, carbon: 612, avatar: '☁️' },
    { rank: 8, name: 'David Ocean', points: 7120, carbon: 589, avatar: '🌊' },
  ];

  const getPodiumColor = (rank: number) => {
    switch (rank) {
      case 1:
        return ['#f59e0b', '#d97706'];
      case 2:
        return ['#9ca3af', '#6b7280'];
      case 3:
        return ['#d97706', '#b45309'];
      default:
        return ['#10b981', '#059669'];
    }
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#10b981', '#06b6d4', '#f0fdf4']}
        style={styles.header}
      >
        <View style={styles.headerContent}>
          <Text style={styles.headerTitle}>Leaderboard</Text>
          <Text style={styles.headerSubtitle}>Top eco warriors this month</Text>
        </View>
      </LinearGradient>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.podiumContainer}>
          <View style={styles.podium}>
            <View style={[styles.podiumItem, styles.podiumSecond]}>
              <BlurView intensity={40} tint="light" style={styles.podiumCard}>
                <LinearGradient
                  colors={getPodiumColor(2)}
                  style={styles.podiumAvatar}
                >
                  <Text style={styles.avatarEmoji}>{topUsers[1].avatar}</Text>
                  <View style={styles.rankBadge}>
                    <Text style={styles.rankBadgeText}>2</Text>
                  </View>
                </LinearGradient>
                <Text style={styles.podiumName}>{topUsers[1].name}</Text>
                <Text style={styles.podiumPoints}>{topUsers[1].points} pts</Text>
                <View style={styles.carbonBadge}>
                  <Ionicons name="leaf" size={12} color="#10b981" />
                  <Text style={styles.carbonText}>{topUsers[1].carbon} kg</Text>
                </View>
              </BlurView>
              <View style={[styles.podiumBase, { height: 100 }]} />
            </View>

            <View style={[styles.podiumItem, styles.podiumFirst]}>
              <View style={styles.crownContainer}>
                <Text style={styles.crown}>👑</Text>
              </View>
              <BlurView intensity={40} tint="light" style={styles.podiumCard}>
                <LinearGradient
                  colors={getPodiumColor(1)}
                  style={styles.podiumAvatar}
                >
                  <Text style={styles.avatarEmoji}>{topUsers[0].avatar}</Text>
                  <View style={styles.rankBadge}>
                    <Text style={styles.rankBadgeText}>1</Text>
                  </View>
                </LinearGradient>
                <Text style={styles.podiumName}>{topUsers[0].name}</Text>
                <Text style={styles.podiumPoints}>{topUsers[0].points} pts</Text>
                <View style={styles.carbonBadge}>
                  <Ionicons name="leaf" size={12} color="#10b981" />
                  <Text style={styles.carbonText}>{topUsers[0].carbon} kg</Text>
                </View>
              </BlurView>
              <View style={[styles.podiumBase, { height: 140 }]} />
            </View>

            <View style={[styles.podiumItem, styles.podiumThird]}>
              <BlurView intensity={40} tint="light" style={styles.podiumCard}>
                <LinearGradient
                  colors={getPodiumColor(3)}
                  style={styles.podiumAvatar}
                >
                  <Text style={styles.avatarEmoji}>{topUsers[2].avatar}</Text>
                  <View style={styles.rankBadge}>
                    <Text style={styles.rankBadgeText}>3</Text>
                  </View>
                </LinearGradient>
                <Text style={styles.podiumName}>{topUsers[2].name}</Text>
                <Text style={styles.podiumPoints}>{topUsers[2].points} pts</Text>
                <View style={styles.carbonBadge}>
                  <Ionicons name="leaf" size={12} color="#10b981" />
                  <Text style={styles.carbonText}>{topUsers[2].carbon} kg</Text>
                </View>
              </BlurView>
              <View style={[styles.podiumBase, { height: 70 }]} />
            </View>
          </View>
        </View>

        <View style={styles.listContainer}>
          <Text style={styles.listTitle}>Other Rankings</Text>
          {otherUsers.map((user) => (
            <BlurView key={user.rank} intensity={30} tint="light" style={styles.userCard}>
              <View style={styles.userContent}>
                <View style={styles.userRank}>
                  <Text style={styles.userRankText}>{user.rank}</Text>
                </View>
                <View style={styles.userAvatar}>
                  <Text style={styles.userAvatarEmoji}>{user.avatar}</Text>
                </View>
                <View style={styles.userInfo}>
                  <Text style={styles.userName}>{user.name}</Text>
                  <View style={styles.userStats}>
                    <View style={styles.statItem}>
                      <Ionicons name="trophy" size={14} color="#f59e0b" />
                      <Text style={styles.statText}>{user.points}</Text>
                    </View>
                    <View style={styles.statItem}>
                      <Ionicons name="leaf" size={14} color="#10b981" />
                      <Text style={styles.statText}>{user.carbon} kg</Text>
                    </View>
                  </View>
                </View>
                <TouchableOpacity>
                  <Ionicons name="chevron-forward" size={20} color="#9ca3af" />
                </TouchableOpacity>
              </View>
            </BlurView>
          ))}
        </View>

        <BlurView intensity={30} tint="light" style={styles.myRankCard}>
          <LinearGradient
            colors={['rgba(16, 185, 129, 0.1)', 'rgba(6, 182, 212, 0.1)']}
            style={styles.myRankGradient}
          >
            <View style={styles.myRankHeader}>
              <Text style={styles.myRankTitle}>Your Ranking</Text>
              <View style={styles.myRankBadge}>
                <Text style={styles.myRankBadgeText}>#42</Text>
              </View>
            </View>
            <Text style={styles.myRankSubtext}>
              You're doing great! Keep it up to climb higher!
            </Text>
            <TouchableOpacity style={styles.boostButton}>
              <LinearGradient
                colors={['#10b981', '#06b6d4']}
                style={styles.boostGradient}
              >
                <Ionicons name="rocket" size={20} color="#fff" />
                <Text style={styles.boostText}>Boost Your Rank</Text>
              </LinearGradient>
            </TouchableOpacity>
          </LinearGradient>
        </BlurView>

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
    marginTop: -20,
  },
  podiumContainer: {
    paddingHorizontal: 20,
    paddingVertical: 32,
  },
  podium: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  podiumItem: {
    flex: 1,
    alignItems: 'center',
  },
  podiumFirst: {
    marginTop: -20,
  },
  podiumSecond: {
    marginRight: -8,
  },
  podiumThird: {
    marginLeft: -8,
  },
  crownContainer: {
    position: 'absolute',
    top: -40,
    zIndex: 10,
  },
  crown: {
    fontSize: 32,
  },
  podiumCard: {
    borderRadius: 24,
    padding: 16,
    alignItems: 'center',
    overflow: 'hidden',
    marginBottom: 8,
  },
  podiumAvatar: {
    width: 80,
    height: 80,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
    position: 'relative',
  },
  avatarEmoji: {
    fontSize: 36,
  },
  rankBadge: {
    position: 'absolute',
    bottom: -4,
    right: -4,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#fff',
  },
  rankBadgeText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#1f2937',
  },
  podiumName: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 4,
  },
  podiumPoints: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#10b981',
    marginBottom: 8,
  },
  carbonBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(16, 185, 129, 0.1)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  carbonText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#10b981',
    marginLeft: 4,
  },
  podiumBase: {
    width: '100%',
    backgroundColor: 'rgba(255,255,255,0.5)',
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  listContainer: {
    paddingHorizontal: 20,
    paddingBottom: 24,
  },
  listTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 16,
  },
  userCard: {
    borderRadius: 20,
    overflow: 'hidden',
    marginBottom: 12,
  },
  userContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  userRank: {
    width: 32,
    height: 32,
    borderRadius: 10,
    backgroundColor: 'rgba(16, 185, 129, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  userRankText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#10b981',
  },
  userAvatar: {
    width: 48,
    height: 48,
    borderRadius: 16,
    backgroundColor: 'rgba(16, 185, 129, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  userAvatarEmoji: {
    fontSize: 24,
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 4,
  },
  userStats: {
    flexDirection: 'row',
    gap: 12,
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  statText: {
    fontSize: 12,
    color: '#6b7280',
    fontWeight: '600',
  },
  myRankCard: {
    marginHorizontal: 20,
    marginBottom: 24,
    borderRadius: 24,
    overflow: 'hidden',
  },
  myRankGradient: {
    padding: 20,
  },
  myRankHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  myRankTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1f2937',
  },
  myRankBadge: {
    backgroundColor: '#10b981',
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 12,
  },
  myRankBadgeText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  myRankSubtext: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 16,
  },
  boostButton: {
    borderRadius: 16,
    overflow: 'hidden',
  },
  boostGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 14,
    gap: 8,
  },
  boostText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
});
