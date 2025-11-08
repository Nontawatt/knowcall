import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Card, Title, List, Switch, Divider } from 'react-native-paper';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { updateSettings } from '../store/settingsSlice';

export default function SettingsScreen() {
  const dispatch = useDispatch();
  const settings = useSelector((state: RootState) => state.settings);

  const handleToggle = (key: string, value: boolean) => {
    dispatch(updateSettings({ [key]: value }));
  };

  return (
    <ScrollView style={styles.container}>
      <Card style={styles.card}>
        <Card.Content>
          <Title>การบล็อกสาย</Title>

          <List.Item
            title="บล็อกเลขที่ซ่อน"
            description="บล็อกสายจากหมายเลขที่ปิดบัง"
            left={props => <List.Icon {...props} icon="phone-off" />}
            right={() => (
              <Switch
                value={settings.blockHiddenNumbers}
                onValueChange={value => handleToggle('blockHiddenNumbers', value)}
              />
            )}
          />

          <Divider />

          <List.Item
            title="บล็อกสายต่างประเทศ"
            description="บล็อกสายจากต่างประเทศอัตโนมัติ"
            left={props => <List.Icon {...props} icon="earth-off" />}
            right={() => (
              <Switch
                value={settings.blockInternational}
                onValueChange={value => handleToggle('blockInternational', value)}
              />
            )}
          />

          <Divider />

          <List.Item
            title="บล็อกเลขที่ไม่รู้จัก"
            description="บล็อกหมายเลขที่ไม่มีในสมุดโทรศัพท์"
            left={props => <List.Icon {...props} icon="account-question" />}
            right={() => (
              <Switch
                value={settings.blockUnknown}
                onValueChange={value => handleToggle('blockUnknown', value)}
              />
            )}
          />

          <Divider />

          <List.Item
            title="ปิดเสียงสแปมอัตโนมัติ"
            description="ปิดเสียงสายที่ตรวจพบว่าเป็นสแปม"
            left={props => <List.Icon {...props} icon="volume-off" />}
            right={() => (
              <Switch
                value={settings.autoMuteSpam}
                onValueChange={value => handleToggle('autoMuteSpam', value)}
              />
            )}
          />
        </Card.Content>
      </Card>

      <Card style={styles.card}>
        <Card.Content>
          <Title>การแจ้งเตือน</Title>

          <List.Item
            title="เปิดการแจ้งเตือน"
            description="รับการแจ้งเตือนเมื่อมีสายที่น่าสงสัย"
            left={props => <List.Icon {...props} icon="bell" />}
            right={() => (
              <Switch
                value={settings.enableNotifications}
                onValueChange={value => handleToggle('enableNotifications', value)}
              />
            )}
          />
        </Card.Content>
      </Card>

      <Card style={styles.card}>
        <Card.Content>
          <Title>ทั่วไป</Title>

          <List.Item
            title="ภาษา"
            description={settings.language === 'th' ? 'ไทย' : 'English'}
            left={props => <List.Icon {...props} icon="translate" />}
            right={props => <List.Icon {...props} icon="chevron-right" />}
          />

          <Divider />

          <List.Item
            title="เกี่ยวกับ"
            description="KnowCall v0.1.0 (Prototype)"
            left={props => <List.Icon {...props} icon="information" />}
            right={props => <List.Icon {...props} icon="chevron-right" />}
          />

          <Divider />

          <List.Item
            title="ความช่วยเหลือ"
            description="คำถามที่พบบ่อยและการติดต่อ"
            left={props => <List.Icon {...props} icon="help-circle" />}
            right={props => <List.Icon {...props} icon="chevron-right" />}
          />
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
});
