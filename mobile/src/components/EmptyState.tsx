import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Button } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

interface EmptyStateProps {
  icon: string;
  title: string;
  description: string;
  actionText?: string;
  onAction?: () => void;
}

/**
 * EmptyState Component
 * แสดงสถานะเมื่อไม่มีข้อมูล พร้อมไอคอน ข้อความ และปุ่ม action (ถ้ามี)
 */
export const EmptyState: React.FC<EmptyStateProps> = ({
  icon,
  title,
  description,
  actionText,
  onAction,
}) => {
  return (
    <View style={styles.container}>
      <Icon name={icon} size={80} color="#BDBDBD" />
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.description}>{description}</Text>
      {actionText && onAction && (
        <Button mode="contained" onPress={onAction} style={styles.button}>
          {actionText}
        </Button>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
    minHeight: 300,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: '#212121',
    marginTop: 16,
    textAlign: 'center',
  },
  description: {
    fontSize: 14,
    color: '#757575',
    marginTop: 8,
    textAlign: 'center',
    lineHeight: 20,
  },
  button: {
    marginTop: 24,
  },
});
