import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import {
  Card,
  Title,
  Paragraph,
  Button,
  TextInput,
  Chip,
  Text,
  ActivityIndicator,
} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { verifyPhoneNumber } from '../services/api';
import { RiskLevel } from '@shared/types';

export default function HomeScreen() {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  const handleVerify = async () => {
    if (!phoneNumber) return;

    setLoading(true);
    try {
      const data = await verifyPhoneNumber(phoneNumber);
      setResult(data);
    } catch (error) {
      console.error('Verification failed:', error);
    } finally {
      setLoading(false);
    }
  };

  const getRiskColor = (level: RiskLevel) => {
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

  const getRiskLabel = (level: RiskLevel) => {
    switch (level) {
      case RiskLevel.LOW:
        return 'ปลอดภัย';
      case RiskLevel.MEDIUM:
        return 'ระวัง';
      case RiskLevel.HIGH:
        return 'เสี่ยงสูง';
      case RiskLevel.CRITICAL:
        return 'อันตราย';
      default:
        return 'ไม่ทราบ';
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Card style={styles.card}>
        <Card.Content>
          <Title>ตรวจสอบหมายเลข</Title>
          <Paragraph>กรอกหมายเลขโทรศัพท์เพื่อตรวจสอบ</Paragraph>

          <TextInput
            label="หมายเลขโทรศัพท์"
            value={phoneNumber}
            onChangeText={setPhoneNumber}
            mode="outlined"
            keyboardType="phone-pad"
            left={<TextInput.Icon icon="phone" />}
            style={styles.input}
            placeholder="0812345678"
          />

          <Button
            mode="contained"
            onPress={handleVerify}
            loading={loading}
            disabled={!phoneNumber || loading}
            style={styles.button}
          >
            ตรวจสอบ
          </Button>
        </Card.Content>
      </Card>

      {loading && (
        <Card style={styles.card}>
          <Card.Content style={styles.loadingContainer}>
            <ActivityIndicator size="large" />
            <Text style={styles.loadingText}>กำลังตรวจสอบ...</Text>
          </Card.Content>
        </Card>
      )}

      {result && !loading && (
        <Card style={styles.card}>
          <Card.Content>
            <View style={styles.resultHeader}>
              <Icon
                name={result.isSpam || result.isFraud ? 'alert' : 'check-circle'}
                size={40}
                color={getRiskColor(result.riskLevel)}
              />
              <Title style={styles.resultTitle}>ผลการตรวจสอบ</Title>
            </View>

            <View style={styles.riskContainer}>
              <Chip
                mode="flat"
                style={[
                  styles.riskChip,
                  { backgroundColor: getRiskColor(result.riskLevel) },
                ]}
                textStyle={styles.chipText}
              >
                {getRiskLabel(result.riskLevel)}
              </Chip>
            </View>

            <View style={styles.infoContainer}>
              <Text style={styles.label}>หมายเลข:</Text>
              <Text style={styles.value}>{result.phoneNumber}</Text>
            </View>

            <View style={styles.infoContainer}>
              <Text style={styles.label}>จำนวนรายงาน:</Text>
              <Text style={styles.value}>{result.reportCount} ครั้ง</Text>
            </View>

            {result.isSpam && (
              <View style={styles.warningContainer}>
                <Icon name="alert-circle" size={20} color="#F44336" />
                <Text style={styles.warningText}>หมายเลขนี้ถูกรายงานว่าเป็นสแปม</Text>
              </View>
            )}

            {result.isFraud && (
              <View style={styles.warningContainer}>
                <Icon name="alert-octagon" size={20} color="#D32F2F" />
                <Text style={styles.dangerText}>
                  หมายเลขนี้ถูกรายงานว่าเป็นมิจฉาชีพ
                </Text>
              </View>
            )}

            {result.sources && result.sources.length > 0 && (
              <View style={styles.sourcesContainer}>
                <Text style={styles.sourcesTitle}>แหล่งข้อมูล:</Text>
                {result.sources.map((source: any, index: number) => (
                  <View key={index} style={styles.sourceItem}>
                    <Icon name="database" size={16} color="#757575" />
                    <Text style={styles.sourceName}>{source.name}</Text>
                    <Chip
                      mode="flat"
                      compact
                      style={styles.sourceChip}
                      textStyle={styles.sourceChipText}
                    >
                      {source.result}
                    </Chip>
                  </View>
                ))}
              </View>
            )}
          </Card.Content>
        </Card>
      )}

      <Card style={styles.card}>
        <Card.Content>
          <Title>สถิติการป้องกัน</Title>
          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <Icon name="shield-check" size={32} color="#4CAF50" />
              <Text style={styles.statNumber}>128</Text>
              <Text style={styles.statLabel}>สายที่บล็อก</Text>
            </View>
            <View style={styles.statItem}>
              <Icon name="phone-remove" size={32} color="#F44336" />
              <Text style={styles.statNumber}>42</Text>
              <Text style={styles.statLabel}>สแปม</Text>
            </View>
            <View style={styles.statItem}>
              <Icon name="alert" size={32} color="#FF9800" />
              <Text style={styles.statNumber}>15</Text>
              <Text style={styles.statLabel}>มิจฉาชีพ</Text>
            </View>
          </View>
        </Card.Content>
      </Card>

      <Card style={styles.card}>
        <Card.Content>
          <Title>เคล็ดลับความปลอดภัย</Title>
          <View style={styles.tipContainer}>
            <Icon name="lightbulb-outline" size={20} color="#2196F3" />
            <Text style={styles.tipText}>
              ไม่ควรแชร์ข้อมูลส่วนตัวหรือรหัส OTP กับผู้โทรที่ไม่รู้จัก
            </Text>
          </View>
          <View style={styles.tipContainer}>
            <Icon name="lightbulb-outline" size={20} color="#2196F3" />
            <Text style={styles.tipText}>
              ธนาคารจะไม่โทรมาขอรหัสผ่านหรือข้อมูลบัตรเครดิต
            </Text>
          </View>
        </Card.Content>
      </Card>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  card: {
    margin: 12,
    elevation: 2,
  },
  input: {
    marginTop: 16,
    marginBottom: 16,
  },
  button: {
    marginTop: 8,
  },
  loadingContainer: {
    alignItems: 'center',
    padding: 20,
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
  },
  resultHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  resultTitle: {
    marginLeft: 12,
  },
  riskContainer: {
    marginBottom: 16,
  },
  riskChip: {
    alignSelf: 'flex-start',
  },
  chipText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  label: {
    fontSize: 14,
    color: '#757575',
  },
  value: {
    fontSize: 14,
    fontWeight: '500',
  },
  warningContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
    padding: 12,
    backgroundColor: '#FFEBEE',
    borderRadius: 8,
  },
  warningText: {
    marginLeft: 8,
    color: '#F44336',
    fontWeight: '500',
  },
  dangerText: {
    marginLeft: 8,
    color: '#D32F2F',
    fontWeight: 'bold',
  },
  sourcesContainer: {
    marginTop: 16,
  },
  sourcesTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  sourceItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  sourceName: {
    marginLeft: 8,
    flex: 1,
  },
  sourceChip: {
    height: 24,
  },
  sourceChipText: {
    fontSize: 12,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 16,
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 8,
  },
  statLabel: {
    fontSize: 12,
    color: '#757575',
    marginTop: 4,
  },
  tipContainer: {
    flexDirection: 'row',
    marginTop: 12,
    padding: 12,
    backgroundColor: '#E3F2FD',
    borderRadius: 8,
  },
  tipText: {
    flex: 1,
    marginLeft: 8,
    color: '#1976D2',
  },
});
