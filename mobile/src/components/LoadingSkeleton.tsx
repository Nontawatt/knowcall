import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { Card } from 'react-native-paper';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  interpolate,
} from 'react-native-reanimated';

/**
 * LoadingSkeleton Component
 * แสดง loading placeholder แบบ shimmer effect
 */

interface SkeletonProps {
  width?: number | string;
  height?: number;
  borderRadius?: number;
}

const SkeletonItem: React.FC<SkeletonProps> = ({
  width = '100%',
  height = 16,
  borderRadius = 4,
}) => {
  const shimmerAnimation = useSharedValue(0);

  useEffect(() => {
    shimmerAnimation.value = withRepeat(
      withTiming(1, { duration: 1500 }),
      -1,
      false
    );
  }, []);

  const shimmerStyle = useAnimatedStyle(() => {
    const opacity = interpolate(
      shimmerAnimation.value,
      [0, 0.5, 1],
      [0.3, 0.6, 0.3]
    );

    return {
      opacity,
    };
  });

  return (
    <Animated.View
      style={[
        styles.skeleton,
        {
          width,
          height,
          borderRadius,
        },
        shimmerStyle,
      ]}
    />
  );
};

export const SkeletonCard: React.FC = () => (
  <Card style={styles.card}>
    <Card.Content>
      <View style={styles.row}>
        <SkeletonItem width={40} height={40} borderRadius={20} />
        <View style={styles.textContainer}>
          <SkeletonItem width="70%" height={16} />
          <View style={{ height: 8 }} />
          <SkeletonItem width="40%" height={12} />
        </View>
      </View>
    </Card.Content>
  </Card>
);

export const SkeletonList: React.FC<{ count?: number }> = ({ count = 3 }) => (
  <View>
    {Array.from({ length: count }).map((_, index) => (
      <SkeletonCard key={index} />
    ))}
  </View>
);

const styles = StyleSheet.create({
  card: {
    margin: 8,
    marginHorizontal: 12,
    elevation: 2,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  skeleton: {
    backgroundColor: '#E0E0E0',
  },
  textContainer: {
    flex: 1,
    marginLeft: 12,
  },
});
