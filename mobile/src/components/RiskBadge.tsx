import React from 'react';
import { Chip } from 'react-native-paper';
import { RiskLevel } from '@shared/types';

interface RiskBadgeProps {
  level: RiskLevel;
  showIcon?: boolean;
  size?: 'small' | 'medium' | 'large';
}

interface RiskConfig {
  color: string;
  label: string;
  icon: string;
}

/**
 * RiskBadge Component
 * แสดง badge ระดับความเสี่ยงพร้อมสีและไอคอน
 */
export const RiskBadge: React.FC<RiskBadgeProps> = ({
  level,
  showIcon = true,
  size = 'medium',
}) => {
  const config: Record<RiskLevel, RiskConfig> = {
    [RiskLevel.LOW]: {
      color: '#4CAF50',
      label: 'ปลอดภัย',
      icon: 'check-circle',
    },
    [RiskLevel.MEDIUM]: {
      color: '#FF9800',
      label: 'ระวัง',
      icon: 'alert',
    },
    [RiskLevel.HIGH]: {
      color: '#F44336',
      label: 'เสี่ยงสูง',
      icon: 'alert-octagon',
    },
    [RiskLevel.CRITICAL]: {
      color: '#D32F2F',
      label: 'อันตราย',
      icon: 'alert-circle',
    },
  };

  const { color, label, icon } = config[level];

  const getTextStyle = () => {
    const baseStyle = { color: '#fff', fontWeight: 'bold' as const };
    switch (size) {
      case 'small':
        return { ...baseStyle, fontSize: 10 };
      case 'large':
        return { ...baseStyle, fontSize: 16 };
      default:
        return { ...baseStyle, fontSize: 12 };
    }
  };

  return (
    <Chip
      mode="flat"
      style={{ backgroundColor: color }}
      textStyle={getTextStyle()}
      icon={showIcon ? icon : undefined}
      compact={size === 'small'}
    >
      {label}
    </Chip>
  );
};
