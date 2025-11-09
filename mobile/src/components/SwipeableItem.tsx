import React from 'react';
import { View, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import { Text } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Swipeable from 'react-native-gesture-handler/Swipeable';

interface SwipeAction {
  label: string;
  icon: string;
  color: string;
  onPress: () => void;
}

interface SwipeableItemProps {
  children: React.ReactNode;
  leftActions?: SwipeAction[];
  rightActions?: SwipeAction[];
}

/**
 * SwipeableItem Component
 * รองรับการ swipe เพื่อแสดง action buttons
 */
export const SwipeableItem: React.FC<SwipeableItemProps> = ({
  children,
  leftActions,
  rightActions,
}) => {
  const renderActions = (
    actions: SwipeAction[],
    progress: Animated.AnimatedInterpolation<number>,
    dragX: Animated.AnimatedInterpolation<number>
  ) => {
    const trans = progress.interpolate({
      inputRange: [0, 1],
      outputRange: [actions.length * 80, 0],
    });

    return (
      <View style={styles.actionsContainer}>
        {actions.map((action, index) => (
          <TouchableOpacity
            key={index}
            style={[styles.actionButton, { backgroundColor: action.color }]}
            onPress={action.onPress}
          >
            <Icon name={action.icon} size={24} color="#fff" />
            <Text style={styles.actionText}>{action.label}</Text>
          </TouchableOpacity>
        ))}
      </View>
    );
  };

  return (
    <Swipeable
      renderLeftActions={
        leftActions
          ? (progress, dragX) => renderActions(leftActions, progress, dragX)
          : undefined
      }
      renderRightActions={
        rightActions
          ? (progress, dragX) => renderActions(rightActions, progress, dragX)
          : undefined
      }
      overshootLeft={false}
      overshootRight={false}
    >
      {children}
    </Swipeable>
  );
};

const styles = StyleSheet.create({
  actionsContainer: {
    flexDirection: 'row',
  },
  actionButton: {
    width: 80,
    justifyContent: 'center',
    alignItems: 'center',
  },
  actionText: {
    color: '#fff',
    fontSize: 12,
    marginTop: 4,
    fontWeight: '600',
  },
});
