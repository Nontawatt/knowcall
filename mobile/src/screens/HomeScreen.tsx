import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, RefreshControl } from 'react-native';
import {
  Card,
  Title,
  Paragraph,
  Button,
  TextInput,
  Text,
  ActivityIndicator,
  Snackbar,
  Chip,
} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { verifyPhoneNumber } from '../services/api';
import { RiskLevel } from '@shared/types';
import { EmptyState, RiskBadge } from '../components';
import { colors, spacing, borderRadius } from '../theme';

export default function HomeScreen() {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string>('');
  const [refreshing, setRefreshing] = useState(false);
  const [snackbarVisible, setSnackbarVisible] = useState(false);

  // Mock statistics data (will be replaced with real API call)
  const [stats, setStats] = useState({
    blocked: 128,
    spam: 42,
    fraud: 15,
  });

  const handleVerify = async () => {
    if (!phoneNumber) {
      setError('กรุณากรอกหมายเลขโทรศัพท์');
      setSnackbarVisible(true);
      return;
    }

    setLoading(true);
    setError('');
    try {
      const data = await verifyPhoneNumber(phoneNumber);
      setResult(data);
    } catch (err: any) {
      const errorMessage = err?.response?.data?.message || 'เกิดข้อผิดพลาดในการตรวจสอบ กรุณาลองใหม่อีกครั้ง';
      setError(errorMessage);
      setSnackbarVisible(true);
      console.error('Verification failed:', err);
    } finally {
      setLoading(false);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    // TODO: Fetch latest statistics from API
    // For now, just simulate a refresh
    setTimeout(() => {
      setStats({
        blocked: Math.floor(Math.random() * 200),
        spam: Math.floor(Math.random() * 100),
        fraud: Math.floor(Math.random() * 50),
      });
      setRefreshing(false);
    }, 1000);
  };

  const getRiskColor = (level: RiskLevel) => {
    switch (level) {
      case RiskLevel.LOW:
        return colors.success;
      case RiskLevel.MEDIUM:
        return colors.warning;
      case RiskLevel.HIGH:
        return colors.danger;
      case RiskLevel.CRITICAL:
        return colors.critical;
      default:
        return colors.light.disabled;
    }
  };

  return (
    <>
      <ScrollView
        style={styles.container}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={[colors.primary]}
            tintColor={colors.primary}
          />
        }
      >
        {/* Phone Number Verification Card */}
        <Card style={styles.card}>
          <Card.Content>
            <Title>ตรวจสอบหมายเลข</Title>
            <Paragraph>กรอกหมายเลขโทรศัพท์เพื่อตรวจสอบความปลอดภัย</Paragraph>

            <TextInput
              label="หมายเลขโทรศัพท์"
              value={phoneNumber}
              onChangeText={setPhoneNumber}
              mode="outlined"
              keyboardType="phone-pad"
              left={<TextInput.Icon icon="phone" />}
              style={styles.input}
              placeholder="0812345678"
              error={!!error && !phoneNumber}
            />

            <View style={styles.buttonRow}>
              <Button
                mode="contained"
                onPress={handleVerify}
                loading={loading}
                disabled={!phoneNumber || loading}
                style={styles.button}
                icon="magnify"
              >
                ตรวจสอบ
              </Button>
              {/* TODO: Add contact picker */}
              {/* <Button
                mode="outlined"
                onPress={pickFromContacts}
                disabled={loading}
                style={styles.buttonOutlined}
                icon="contacts"
              >
                จากรายชื่อ
              </Button> */}
            </View>
          </Card.Content>
        </Card>

        {/* Loading State */}
        {loading && (
          <Card style={styles.card}>
            <Card.Content style={styles.loadingContainer}>
              <ActivityIndicator size="large" color={colors.primary} />
              <Text style={styles.loadingText}>กำลังตรวจสอบ...</Text>
            </Card.Content>
          </Card>
        )}

        {/* Verification Result */}
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
                <RiskBadge level={result.riskLevel} showIcon={true} />
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
                <View style={[styles.warningContainer, { backgroundColor: colors.errorBg }]}>
                  <Icon name="alert-circle" size={20} color={colors.danger} />
                  <Text style={styles.warningText}>หมายเลขนี้ถูกรายงานว่าเป็นสแปม</Text>
                </View>
              )}

              {result.isFraud && (
                <View style={[styles.warningContainer, { backgroundColor: colors.errorBg }]}>
                  <Icon name="alert-octagon" size={20} color={colors.critical} />
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
                      <Icon name="database" size={16} color={colors.light.textSecondary} />
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

              {/* Action Buttons */}
              <View style={styles.actionButtons}>
                <Button
                  mode="outlined"
                  onPress={() => setResult(null)}
                  style={styles.actionButton}
                  icon="refresh"
                >
                  ตรวจสอบใหม่
                </Button>
                <Button
                  mode="text"
                  onPress={() => {/* TODO: Report number */}}
                  style={styles.actionButton}
                  icon="flag"
                >
                  รายงาน
                </Button>
              </View>
            </Card.Content>
          </Card>
        )}

        {/* Statistics Card */}
        <Card style={styles.card}>
          <Card.Content>
            <View style={styles.sectionHeader}>
              <Title>สถิติการป้องกัน</Title>
              <Text style={styles.sectionSubtitle}>วันนี้</Text>
            </View>
            <View style={styles.statsContainer}>
              <View style={styles.statItem}>
                <Icon name="shield-check" size={32} color={colors.success} />
                <Text style={styles.statNumber}>{stats.blocked}</Text>
                <Text style={styles.statLabel}>สายที่บล็อก</Text>
              </View>
              <View style={styles.statItem}>
                <Icon name="phone-remove" size={32} color={colors.danger} />
                <Text style={styles.statNumber}>{stats.spam}</Text>
                <Text style={styles.statLabel}>สแปม</Text>
              </View>
              <View style={styles.statItem}>
                <Icon name="alert" size={32} color={colors.warning} />
                <Text style={styles.statNumber}>{stats.fraud}</Text>
                <Text style={styles.statLabel}>มิจฉาชีพ</Text>
              </View>
            </View>
          </Card.Content>
        </Card>

        {/* Safety Tips Card */}
        <Card style={styles.card}>
          <Card.Content>
            <Title>เคล็ดลับความปลอดภัย</Title>
            <View style={[styles.tipContainer, { backgroundColor: colors.infoBg }]}>
              <Icon name="lightbulb-outline" size={20} color={colors.primaryDark} />
              <Text style={[styles.tipText, { color: colors.primaryDark }]}>
                ไม่ควรแชร์ข้อมูลส่วนตัวหรือรหัส OTP กับผู้โทรที่ไม่รู้จัก
              </Text>
            </View>
            <View style={[styles.tipContainer, { backgroundColor: colors.infoBg }]}>
              <Icon name="lightbulb-outline" size={20} color={colors.primaryDark} />
              <Text style={[styles.tipText, { color: colors.primaryDark }]}>
                ธนาคารจะไม่โทรมาขอรหัสผ่านหรือข้อมูลบัตรเครดิต
              </Text>
            </View>
            <View style={[styles.tipContainer, { backgroundColor: colors.infoBg }]}>
              <Icon name="lightbulb-outline" size={20} color={colors.primaryDark} />
              <Text style={[styles.tipText, { color: colors.primaryDark }]}>
                ระวังสายปลอมเป็นเจ้าหน้าที่หน่วยงานราชการ
              </Text>
            </View>
          </Card.Content>
        </Card>
      </ScrollView>

      {/* Error Snackbar */}
      <Snackbar
        visible={snackbarVisible}
        onDismiss={() => setSnackbarVisible(false)}
        duration={3000}
        action={{
          label: 'ปิด',
          onPress: () => setSnackbarVisible(false),
        }}
      >
        {error}
      </Snackbar>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.light.background,
  },
  card: {
    margin: spacing.md,
    elevation: 2,
    borderRadius: borderRadius.md,
  },
  input: {
    marginTop: spacing.lg,
    marginBottom: spacing.md,
  },
  buttonRow: {
    flexDirection: 'row',
    gap: spacing.sm,
    marginTop: spacing.sm,
  },
  button: {
    flex: 1,
  },
  buttonOutlined: {
    flex: 1,
  },
  loadingContainer: {
    alignItems: 'center',
    padding: spacing.xl,
  },
  loadingText: {
    marginTop: spacing.md,
    fontSize: 16,
    color: colors.light.textSecondary,
  },
  resultHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  resultTitle: {
    marginLeft: spacing.md,
  },
  riskContainer: {
    marginBottom: spacing.lg,
  },
  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.sm,
    paddingVertical: spacing.xs,
  },
  label: {
    fontSize: 14,
    color: colors.light.textSecondary,
  },
  value: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.light.textPrimary,
  },
  warningContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: spacing.md,
    padding: spacing.md,
    borderRadius: borderRadius.md,
  },
  warningText: {
    marginLeft: spacing.sm,
    color: colors.danger,
    fontWeight: '500',
    flex: 1,
  },
  dangerText: {
    marginLeft: spacing.sm,
    color: colors.critical,
    fontWeight: 'bold',
    flex: 1,
  },
  sourcesContainer: {
    marginTop: spacing.lg,
    paddingTop: spacing.md,
    borderTopWidth: 1,
    borderTopColor: colors.light.divider,
  },
  sourcesTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: spacing.sm,
    color: colors.light.textPrimary,
  },
  sourceItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  sourceName: {
    marginLeft: spacing.sm,
    flex: 1,
    color: colors.light.textSecondary,
  },
  sourceChip: {
    height: 24,
  },
  sourceChipText: {
    fontSize: 12,
  },
  actionButtons: {
    flexDirection: 'row',
    gap: spacing.sm,
    marginTop: spacing.lg,
  },
  actionButton: {
    flex: 1,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  sectionSubtitle: {
    fontSize: 12,
    color: colors.light.textSecondary,
    fontWeight: '500',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: spacing.lg,
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: spacing.sm,
    color: colors.light.textPrimary,
  },
  statLabel: {
    fontSize: 12,
    color: colors.light.textSecondary,
    marginTop: spacing.xs,
  },
  tipContainer: {
    flexDirection: 'row',
    marginTop: spacing.md,
    padding: spacing.md,
    borderRadius: borderRadius.md,
  },
  tipText: {
    flex: 1,
    marginLeft: spacing.sm,
    lineHeight: 20,
  },
});
