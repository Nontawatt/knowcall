import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import {
  Card,
  Title,
  List,
  Button,
  Dialog,
  Portal,
  TextInput,
  Paragraph,
  FAB,
} from 'react-native-paper';

export default function BlockListScreen() {
  const [whitelistVisible, setWhitelistVisible] = useState(false);
  const [blacklistVisible, setBlacklistVisible] = useState(false);
  const [newNumber, setNewNumber] = useState('');

  const whitelist = [
    { id: '1', phoneNumber: '+66987654321', name: 'ธนาคารไทยพาณิชย์' },
    { id: '2', phoneNumber: '+66212345678', name: 'บริษัท ABC' },
  ];

  const blacklist = [
    { id: '1', phoneNumber: '+66812345678', reason: 'Spam calls' },
    { id: '2', phoneNumber: '+8612345678', reason: 'Fraud attempt' },
  ];

  const handleAddToWhitelist = () => {
    // Add to whitelist logic
    setWhitelistVisible(false);
    setNewNumber('');
  };

  const handleAddToBlacklist = () => {
    // Add to blacklist logic
    setBlacklistVisible(false);
    setNewNumber('');
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <Card style={styles.card}>
          <Card.Content>
            <View style={styles.header}>
              <Title>รายการขาว (Whitelist)</Title>
              <Button
                mode="contained"
                onPress={() => setWhitelistVisible(true)}
                compact
              >
                เพิ่ม
              </Button>
            </View>
            <Paragraph>หมายเลขที่อนุญาตให้โทรเข้าได้เสมอ</Paragraph>

            {whitelist.map(item => (
              <List.Item
                key={item.id}
                title={item.phoneNumber}
                description={item.name}
                left={props => <List.Icon {...props} icon="check-circle" color="#4CAF50" />}
                right={props => (
                  <Button mode="text" textColor="#F44336">
                    ลบ
                  </Button>
                )}
              />
            ))}
          </Card.Content>
        </Card>

        <Card style={styles.card}>
          <Card.Content>
            <View style={styles.header}>
              <Title>รายการดำ (Blacklist)</Title>
              <Button
                mode="contained"
                onPress={() => setBlacklistVisible(true)}
                compact
              >
                เพิ่ม
              </Button>
            </View>
            <Paragraph>หมายเลขที่บล็อกไม่ให้โทรเข้า</Paragraph>

            {blacklist.map(item => (
              <List.Item
                key={item.id}
                title={item.phoneNumber}
                description={item.reason}
                left={props => <List.Icon {...props} icon="block-helper" color="#F44336" />}
                right={props => (
                  <Button mode="text" textColor="#F44336">
                    ลบ
                  </Button>
                )}
              />
            ))}
          </Card.Content>
        </Card>
      </ScrollView>

      <Portal>
        <Dialog visible={whitelistVisible} onDismiss={() => setWhitelistVisible(false)}>
          <Dialog.Title>เพิ่มเข้ารายการขาว</Dialog.Title>
          <Dialog.Content>
            <TextInput
              label="หมายเลขโทรศัพท์"
              value={newNumber}
              onChangeText={setNewNumber}
              mode="outlined"
              keyboardType="phone-pad"
            />
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => setWhitelistVisible(false)}>ยกเลิก</Button>
            <Button onPress={handleAddToWhitelist}>เพิ่ม</Button>
          </Dialog.Actions>
        </Dialog>

        <Dialog visible={blacklistVisible} onDismiss={() => setBlacklistVisible(false)}>
          <Dialog.Title>เพิ่มเข้ารายการดำ</Dialog.Title>
          <Dialog.Content>
            <TextInput
              label="หมายเลขโทรศัพท์"
              value={newNumber}
              onChangeText={setNewNumber}
              mode="outlined"
              keyboardType="phone-pad"
            />
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => setBlacklistVisible(false)}>ยกเลิก</Button>
            <Button onPress={handleAddToBlacklist}>เพิ่ม</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </View>
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
});
