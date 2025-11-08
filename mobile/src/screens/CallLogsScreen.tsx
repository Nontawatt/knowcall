import React from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { Card, Title, Paragraph, Chip, Text } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { CallType, RiskLevel } from '@shared/types';

const mockCallLogs = [
  {
    id: '1',
    phoneNumber: '+66812345678',
    callType: CallType.BLOCKED,
    timestamp: new Date(Date.now() - 3600000),
    wasBlocked: true,
    riskLevel: RiskLevel.HIGH,
  },
  {
    id: '2',
    phoneNumber: '+66987654321',
    callType: CallType.INCOMING,
    timestamp: new Date(Date.now() - 7200000),
    wasBlocked: false,
    riskLevel: RiskLevel.LOW,
  },
  {
    id: '3',
    phoneNumber: '+8612345678',
    callType: CallType.BLOCKED,
    timestamp: new Date(Date.now() - 10800000),
    wasBlocked: true,
    riskLevel: RiskLevel.CRITICAL,
  },
];

export default function CallLogsScreen() {
  const getCallTypeIcon = (type: CallType) => {
    switch (type) {
      case CallType.INCOMING:
        return 'phone-incoming';
      case CallType.OUTGOING:
        return 'phone-outgoing';
      case CallType.MISSED:
        return 'phone-missed';
      case CallType.BLOCKED:
        return 'phone-remove';
      default:
        return 'phone';
    }
  };

  const getCallTypeLabel = (type: CallType) => {
    switch (type) {
      case CallType.INCOMING:
        return 'สายเข้า';
      case CallType.OUTGOING:
        return 'สายออก';
      case CallType.MISSED:
        return 'สายไม่ได้รับ';
      case CallType.BLOCKED:
        return 'บล็อก';
      default:
        return 'ไม่ทราบ';
    }
  };

  const getRiskColor = (level?: RiskLevel) => {
    if (!level) return '#9E9E9E';
    switch (level) {
      case RiskLevel.LOW:
        return '#4CAF50';
      case RiskLevel.MEDIUM:
        return '#FF9800';
      case RiskLevel.HIGH:
        return '#F44336';
      case RiskLevel.CRITICAL:
        return '#D32F2F';
      default:
        return '#9E9E9E';
    }
  };

  const formatTimestamp = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const hours = Math.floor(diff / 3600000);

    if (hours < 1) {
      const minutes = Math.floor(diff / 60000);
      return `${minutes} นาทีที่แล้ว`;
    } else if (hours < 24) {
      return `${hours} ชั่วโมงที่แล้ว`;
    } else {
      const days = Math.floor(hours / 24);
      return `${days} วันที่แล้ว`;
    }
  };

  const renderCallLog = ({ item }: any) => (
    <Card style={styles.card}>
      <Card.Content>
        <View style={styles.logHeader}>
          <View style={styles.phoneInfo}>
            <Icon
              name={getCallTypeIcon(item.callType)}
              size={24}
              color={getRiskColor(item.riskLevel)}
            />
            <View style={styles.phoneDetails}>
              <Text style={styles.phoneNumber}>{item.phoneNumber}</Text>
              <Text style={styles.timestamp}>{formatTimestamp(item.timestamp)}</Text>
            </View>
          </View>
          <Chip
            mode="flat"
            style={{ backgroundColor: getRiskColor(item.riskLevel) }}
            textStyle={styles.chipText}
          >
            {getCallTypeLabel(item.callType)}
          </Chip>
        </View>
        {item.wasBlocked && (
          <View style={styles.blockedBanner}>
            <Icon name="shield-check" size={16} color="#4CAF50" />
            <Text style={styles.blockedText}>สายนี้ถูกบล็อกโดยอัตโนมัติ</Text>
          </View>
        )}
      </Card.Content>
    </Card>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={mockCallLogs}
        renderItem={renderCallLog}
        keyExtractor={item => item.id}
        ListHeaderComponent={
          <View style={styles.header}>
            <Title>ประวัติการโทร</Title>
            <Paragraph>รายการสายที่เข้ามาและถูกบล็อก</Paragraph>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    padding: 16,
    backgroundColor: '#fff',
  },
  card: {
    margin: 8,
    marginHorizontal: 12,
    elevation: 2,
  },
  logHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  phoneInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  phoneDetails: {
    marginLeft: 12,
    flex: 1,
  },
  phoneNumber: {
    fontSize: 16,
    fontWeight: '500',
  },
  timestamp: {
    fontSize: 12,
    color: '#757575',
    marginTop: 2,
  },
  chipText: {
    color: '#fff',
    fontSize: 12,
  },
  blockedBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
    padding: 8,
    backgroundColor: '#E8F5E9',
    borderRadius: 4,
  },
  blockedText: {
    marginLeft: 8,
    color: '#4CAF50',
    fontSize: 12,
  },
});
