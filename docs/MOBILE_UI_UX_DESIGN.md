# KnowCall Mobile UI/UX Design Guide

## 📱 Overview
คู่มือการออกแบบ UX/UI สำหรับแอปพลิเคชัน KnowCall บนมือถือ เพื่อสร้างประสบการณ์ที่ดีที่สุดสำหรับผู้ใช้ในการป้องกันสายฉ้อโกงและสแปม

---

## 🎨 Design System

### Color Palette

```typescript
// Primary Colors
const colors = {
  primary: '#2196F3',        // Material Blue - สีหลักของแอป
  primaryDark: '#1976D2',    // Dark Blue - สำหรับ pressed states
  primaryLight: '#BBDEFB',   // Light Blue - สำหรับ backgrounds

  // Risk Level Colors
  success: '#4CAF50',        // Green - ปลอดภัย (LOW)
  warning: '#FF9800',        // Orange - ระวัง (MEDIUM)
  danger: '#F44336',         // Red - เสี่ยงสูง (HIGH)
  critical: '#D32F2F',       // Dark Red - อันตราย (CRITICAL)

  // Neutral Colors
  background: '#F5F5F5',     // Light Gray - พื้นหลังแอป
  surface: '#FFFFFF',        // White - Card backgrounds
  textPrimary: '#212121',    // Dark Gray - ข้อความหลัก
  textSecondary: '#757575',  // Medium Gray - ข้อความรอง
  divider: '#E0E0E0',        // Light Gray - เส้นแบ่ง

  // Semantic Colors
  error: '#F44336',          // สำหรับ error messages
  info: '#2196F3',           // สำหรับ informational messages
  successBg: '#E8F5E9',      // พื้นหลังสำหรับ success banners
  errorBg: '#FFEBEE',        // พื้นหลังสำหรับ error banners
  infoBg: '#E3F2FD',         // พื้นหลังสำหรับ info banners
};
```

### Typography

```typescript
const typography = {
  // Headers
  h1: { fontSize: 28, fontWeight: 'bold', lineHeight: 34 },
  h2: { fontSize: 24, fontWeight: 'bold', lineHeight: 30 },
  h3: { fontSize: 20, fontWeight: '600', lineHeight: 26 },
  h4: { fontSize: 18, fontWeight: '600', lineHeight: 24 },

  // Body Text
  body1: { fontSize: 16, fontWeight: 'normal', lineHeight: 24 },
  body2: { fontSize: 14, fontWeight: 'normal', lineHeight: 20 },

  // Special
  caption: { fontSize: 12, fontWeight: 'normal', lineHeight: 16 },
  button: { fontSize: 14, fontWeight: '600', textTransform: 'none' },
  overline: { fontSize: 10, fontWeight: '600', textTransform: 'uppercase' },
};
```

### Spacing System

```typescript
const spacing = {
  xs: 4,    // Extra small
  sm: 8,    // Small
  md: 12,   // Medium
  lg: 16,   // Large
  xl: 24,   // Extra large
  xxl: 32,  // 2X large
};
```

### Border Radius

```typescript
const borderRadius = {
  sm: 4,    // Small elements
  md: 8,    // Cards, buttons
  lg: 12,   // Modals, sheets
  xl: 16,   // Large cards
  pill: 50, // Pills, chips
};
```

### Elevation (Shadow)

```typescript
const elevation = {
  low: 2,      // Subtle elevation
  medium: 4,   // Cards
  high: 8,     // Floating elements
  modal: 16,   // Modals, dialogs
};
```

---

## 📐 Screen Layouts

### 1. HomeScreen (หน้าหลัก)

**Current Issues:**
- ❌ ไม่มี empty state
- ❌ ไม่มี error handling UI
- ❌ ไม่มี pull-to-refresh
- ❌ สถิติเป็น static data

**Improved Design:**

```
┌────────────────────────────────────────┐
│ ◀ KnowCall            🔔 ⚙           │
├────────────────────────────────────────┤
│                                        │
│ ┌────────────────────────────────┐   │
│ │ 🔍 ตรวจสอบหมายเลข              │   │
│ │                                │   │
│ │ ┌──────────────────────────┐  │   │
│ │ │ 📱 0812345678             │  │   │
│ │ └──────────────────────────┘  │   │
│ │                                │   │
│ │     [ตรวจสอบ]  [จากรายชื่อ]   │   │
│ └────────────────────────────────┘   │
│                                        │
│ 📊 สถิติวันนี้                        │
│ ┌──────┐ ┌──────┐ ┌──────┐         │
│ │ 🛡  │ │ 📵  │ │ ⚠️  │         │
│ │  8  │ │  3  │ │  1  │         │
│ │บล็อก│ │สแปม │ │อันตร│         │
│ └──────┘ └──────┘ └──────┘         │
│                                        │
│ 💡 เคล็ดลับความปลอดภัย               │
│ ┌────────────────────────────────┐   │
│ │ • ไม่แชร์รหัส OTP กับผู้อื่น   │   │
│ │ • ธนาคารไม่โทรขอรหัสผ่าน      │   │
│ │ • ระวังสายปลอมเป็นเจ้าหน้าที่  │   │
│ └────────────────────────────────┘   │
│                                        │
│ 🕐 กิจกรรมล่าสุด                     │
│ ┌────────────────────────────────┐   │
│ │ 📵 +66812345678      2 ชม.ที่แล้ว│  │
│ │    บล็อกอัตโนมัติ - เสี่ยงสูง   │  │
│ └────────────────────────────────┘   │
│ ┌────────────────────────────────┐   │
│ │ ✅ +66987654321      5 ชม.ที่แล้ว│  │
│ │    ปลอดภัย                      │  │
│ └────────────────────────────────┘   │
│                                        │
└────────────────────────────────────────┘
```

**Key Features:**
1. **Quick Actions**: เพิ่มปุ่ม "จากรายชื่อ" เพื่อเลือกจากสมุดโทรศัพท์
2. **Live Statistics**: สถิติแบบ real-time ที่อัพเดตตลอดเวลา
3. **Recent Activity**: แสดงกิจกรรมล่าสุดไม่เกิน 3 รายการ
4. **Pull to Refresh**: ดึงลงเพื่อรีเฟรชสถิติ
5. **Empty State**: แสดงข้อความและภาพสวยๆ เมื่อยังไม่มีข้อมูล

### 2. CallLogsScreen (ประวัติการโทร)

**Current Issues:**
- ❌ ไม่มี filter/search
- ❌ ไม่มี grouping by date
- ❌ ไม่มี swipe actions
- ❌ ไม่มี empty state

**Improved Design:**

```
┌────────────────────────────────────────┐
│ ประวัติการโทร         🔍 [Filter]     │
├────────────────────────────────────────┤
│ 🔍 ค้นหาหมายเลข...                    │
│                                        │
│ [ทั้งหมด] [บล็อก] [สแปม] [ปลอดภัย]   │
│                                        │
│ วันนี้                                 │
│ ┌────────────────────────────────┐   │
│ │ 📵 +66812345678      2:30 PM    │←──│ Swipe
│ │    บล็อกอัตโนมัติ    🔴 อันตราย│   │
│ └────────────────────────────────┘   │
│ ┌────────────────────────────────┐   │
│ │ ✅ +66987654321      12:15 PM   │   │
│ │    ปลอดภัย          🟢 ปลอดภัย │   │
│ └────────────────────────────────┘   │
│                                        │
│ เมื่อวาน                              │
│ ┌────────────────────────────────┐   │
│ │ ⚠️  +8612345678      8:45 PM    │   │
│ │    ต่างประเทศ       🔴 อันตราย│   │
│ └────────────────────────────────┘   │
│                                        │
└────────────────────────────────────────┘
```

**Key Features:**
1. **Search Bar**: ค้นหาเบอร์โทรศัพท์
2. **Filter Tabs**: กรองตามประเภท (ทั้งหมด, บล็อก, สแปม, ปลอดภัย)
3. **Group by Date**: จัดกลุ่มตามวัน (วันนี้, เมื่อวาน, 7 วันที่แล้ว, เก่ากว่านั้น)
4. **Swipe Actions**:
   - Swipe left → บล็อก, รายงาน, ดูรายละเอียด
   - Swipe right → เพิ่มเข้า whitelist
5. **Loading States**: Skeleton loading เมื่อโหลดข้อมูล
6. **Infinite Scroll**: Load more เมื่อเลื่อนถึงด้านล่าง

### 3. BlockListScreen (รายการบล็อก)

**Current Issues:**
- ❌ Dialog UX ไม่ดี
- ❌ ไม่มี search
- ❌ ไม่มี bulk actions
- ❌ ไม่มี swipe to delete

**Improved Design:**

```
┌────────────────────────────────────────┐
│ รายการบล็อก          [แก้ไข] [เพิ่ม] │
├────────────────────────────────────────┤
│ 🔍 ค้นหา...                           │
│                                        │
│ [รายการขาว] [รายการดำ]                │
│                                        │
│ ✅ รายการขาว (Whitelist) - 12 รายการ │
│ ┌────────────────────────────────┐   │
│ │ ✓  ธนาคารไทยพาณิชย์              │   │
│ │    +66 2 777 7777               │←──│ Swipe
│ └────────────────────────────────┘   │
│ ┌────────────────────────────────┐   │
│ │ ✓  บริษัท ABC จำกัด             │   │
│ │    +66 2 123 4567               │   │
│ └────────────────────────────────┘   │
│                                        │
│ 🚫 รายการดำ (Blacklist) - 8 รายการ  │
│ ┌────────────────────────────────┐   │
│ │ ✗  +66812345678                 │   │
│ │    Spam calls - รายงาน 45 ครั้ง│   │
│ └────────────────────────────────┘   │
│ ┌────────────────────────────────┐   │
│ │ ✗  +8612345678                  │   │
│ │    Fraud attempt                │   │
│ └────────────────────────────────┘   │
│                                        │
└────────────────────────────────────────┘
```

**Add Number Bottom Sheet:**

```
┌────────────────────────────────────────┐
│                                        │
│                  ─                     │
│                                        │
│ เพิ่มเบอร์เข้ารายการขาว               │
│                                        │
│ ┌──────────────────────────────────┐ │
│ │ 📱 หมายเลขโทรศัพท์               │ │
│ │ 0812345678                        │ │
│ └──────────────────────────────────┘ │
│                                        │
│ ┌──────────────────────────────────┐ │
│ │ 📝 ชื่อ/หมายเหตุ (ไม่บังคับ)     │ │
│ │ ธนาคารกสิกร                       │ │
│ └──────────────────────────────────┘ │
│                                        │
│ 📖 หรือเลือกจากสมุดโทรศัพท์          │
│                                        │
│     [ยกเลิก]          [เพิ่ม]        │
│                                        │
└────────────────────────────────────────┘
```

**Key Features:**
1. **Bottom Sheet**: แทน Dialog เพื่อ UX ที่ดีกว่า
2. **Contact Picker**: เลือกจากสมุดโทรศัพท์ได้
3. **Swipe to Delete**: Swipe ซ้ายเพื่อลบ
4. **Bulk Actions**: เลือกหลายรายการและลบพร้อมกัน
5. **Search**: ค้นหาภายในรายการ
6. **Import/Export**: นำเข้า/ส่งออกรายการ

### 4. SettingsScreen (ตั้งค่า)

**Current Issues:**
- ❌ ไม่มี clear sections
- ❌ Language switcher ไม่ทำงาน
- ❌ ขาด data management

**Improved Design:**

```
┌────────────────────────────────────────┐
│ ตั้งค่า                                │
├────────────────────────────────────────┤
│                                        │
│ 🛡️ การบล็อกสาย                        │
│ ┌────────────────────────────────┐   │
│ │ 📵 บล็อกเลขที่ซ่อน        [ON] │   │
│ │ 🌍 บล็อกสายต่างประเทศ     [OFF]│   │
│ │ ❓ บล็อกเลขที่ไม่รู้จัก    [ON] │   │
│ │ 🔇 ปิดเสียงสแปมอัตโนมัติ  [ON] │   │
│ └────────────────────────────────┘   │
│                                        │
│ 🔔 การแจ้งเตือน                       │
│ ┌────────────────────────────────┐   │
│ │ 🔔 เปิดการแจ้งเตือน       [ON] │   │
│ │ 📳 แจ้งเตือนด้วย vibration [ON] │   │
│ │ 🔊 เสียงการแจ้งเตือน       ►    │   │
│ └────────────────────────────────┘   │
│                                        │
│ ⚙️ ทั่วไป                             │
│ ┌────────────────────────────────┐   │
│ │ 🌐 ภาษา                ไทย    ► │   │
│ │ 🌙 โหมดมืด                [OFF]│   │
│ │ 📊 ข้อมูลและความเป็นส่วนตัว  ► │   │
│ └────────────────────────────────┘   │
│                                        │
│ 🗄️ ข้อมูล                             │
│ ┌────────────────────────────────┐   │
│ │ 🗑️ ล้างแคช (12.5 MB)          │   │
│ │ 📥 นำเข้า/ส่งออกข้อมูล        │   │
│ │ 🔄 ซิงค์ข้อมูล                 │   │
│ └────────────────────────────────┘   │
│                                        │
│ ℹ️ เกี่ยวกับ                          │
│ ┌────────────────────────────────┐   │
│ │ ℹ️ เกี่ยวกับ KnowCall        ► │   │
│ │ 📖 คำถามที่พบบ่อย             ► │   │
│ │ 🔒 นโยบายความเป็นส่วนตัว     ► │   │
│ │ ⭐ ให้คะแนนแอป                 │   │
│ └────────────────────────────────┘   │
│                                        │
│ Version 0.1.0 (Prototype)             │
│                                        │
└────────────────────────────────────────┘
```

**Key Features:**
1. **Clear Sections**: จัดกลุ่มอย่างชัดเจน
2. **Data Management**: ล้างแคช, นำเข้า/ส่งออก
3. **Dark Mode**: รองรับโหมดมืด
4. **Language Picker**: Modal สำหรับเลือกภาษา
5. **About Screen**: แยกหน้าสำหรับข้อมูลแอป

---

## 🎭 UI Components Library

### 1. Empty State Component

```tsx
interface EmptyStateProps {
  icon: string;
  title: string;
  description: string;
  actionText?: string;
  onAction?: () => void;
}

const EmptyState: React.FC<EmptyStateProps> = ({
  icon,
  title,
  description,
  actionText,
  onAction
}) => (
  <View style={styles.emptyContainer}>
    <Icon name={icon} size={80} color="#BDBDBD" />
    <Text style={styles.emptyTitle}>{title}</Text>
    <Text style={styles.emptyDescription}>{description}</Text>
    {actionText && onAction && (
      <Button mode="contained" onPress={onAction}>
        {actionText}
      </Button>
    )}
  </View>
);
```

**Usage:**
```tsx
// HomeScreen - No results
<EmptyState
  icon="shield-check"
  title="ยังไม่มีประวัติการตรวจสอบ"
  description="เริ่มต้นด้วยการตรวจสอบหมายเลขโทรศัพท์"
  actionText="ตรวจสอบเบอร์แรก"
  onAction={() => {/* scroll to input */}}
/>

// CallLogsScreen - No logs
<EmptyState
  icon="phone-log"
  title="ยังไม่มีประวัติการโทร"
  description="ประวัติการโทรของคุณจะแสดงที่นี่"
/>

// BlockListScreen - No blocked numbers
<EmptyState
  icon="block-helper"
  title="ยังไม่มีหมายเลขที่บล็อก"
  description="เพิ่มหมายเลขเพื่อบล็อกสายที่ไม่ต้องการ"
  actionText="เพิ่มหมายเลข"
  onAction={() => setDialogVisible(true)}
/>
```

### 2. Risk Level Badge

```tsx
interface RiskBadgeProps {
  level: RiskLevel;
  showIcon?: boolean;
  size?: 'small' | 'medium' | 'large';
}

const RiskBadge: React.FC<RiskBadgeProps> = ({
  level,
  showIcon = true,
  size = 'medium'
}) => {
  const config = {
    [RiskLevel.LOW]: {
      color: '#4CAF50',
      label: 'ปลอดภัย',
      icon: 'check-circle'
    },
    [RiskLevel.MEDIUM]: {
      color: '#FF9800',
      label: 'ระวัง',
      icon: 'alert'
    },
    [RiskLevel.HIGH]: {
      color: '#F44336',
      label: 'เสี่ยงสูง',
      icon: 'alert-octagon'
    },
    [RiskLevel.CRITICAL]: {
      color: '#D32F2F',
      label: 'อันตราย',
      icon: 'alert-circle'
    }
  };

  const { color, label, icon } = config[level];

  return (
    <Chip
      mode="flat"
      style={{ backgroundColor: color }}
      textStyle={{ color: '#fff', fontWeight: 'bold' }}
      icon={showIcon ? icon : undefined}
    >
      {label}
    </Chip>
  );
};
```

### 3. Loading Skeleton

```tsx
const SkeletonCard = () => (
  <Card style={styles.card}>
    <Card.Content>
      <View style={styles.skeletonRow}>
        <View style={styles.skeletonCircle} />
        <View style={styles.skeletonText} />
      </View>
      <View style={styles.skeletonTextSmall} />
    </Card.Content>
  </Card>
);

const styles = StyleSheet.create({
  skeletonCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#E0E0E0',
  },
  skeletonText: {
    flex: 1,
    height: 16,
    marginLeft: 12,
    backgroundColor: '#E0E0E0',
    borderRadius: 4,
  },
  skeletonTextSmall: {
    width: '60%',
    height: 12,
    marginTop: 8,
    backgroundColor: '#E0E0E0',
    borderRadius: 4,
  },
});
```

### 4. Swipeable List Item

```tsx
import { Swipeable } from 'react-native-gesture-handler';

interface SwipeableItemProps {
  children: React.ReactNode;
  onDelete?: () => void;
  onBlock?: () => void;
  onReport?: () => void;
}

const SwipeableItem: React.FC<SwipeableItemProps> = ({
  children,
  onDelete,
  onBlock,
  onReport
}) => {
  const renderRightActions = () => (
    <View style={styles.rightActions}>
      {onReport && (
        <TouchableOpacity style={[styles.action, styles.reportAction]} onPress={onReport}>
          <Icon name="flag" size={20} color="#fff" />
        </TouchableOpacity>
      )}
      {onBlock && (
        <TouchableOpacity style={[styles.action, styles.blockAction]} onPress={onBlock}>
          <Icon name="block-helper" size={20} color="#fff" />
        </TouchableOpacity>
      )}
      {onDelete && (
        <TouchableOpacity style={[styles.action, styles.deleteAction]} onPress={onDelete}>
          <Icon name="delete" size={20} color="#fff" />
        </TouchableOpacity>
      )}
    </View>
  );

  return (
    <Swipeable renderRightActions={renderRightActions}>
      {children}
    </Swipeable>
  );
};
```

### 5. Bottom Sheet Modal

```tsx
import { BottomSheet } from '@gorhom/bottom-sheet';

interface AddNumberSheetProps {
  visible: boolean;
  onDismiss: () => void;
  onAdd: (number: string, name?: string) => void;
  type: 'whitelist' | 'blacklist';
}

const AddNumberSheet: React.FC<AddNumberSheetProps> = ({
  visible,
  onDismiss,
  onAdd,
  type
}) => {
  const [number, setNumber] = useState('');
  const [name, setName] = useState('');

  return (
    <BottomSheet
      index={visible ? 0 : -1}
      snapPoints={['50%']}
      onClose={onDismiss}
    >
      <View style={styles.sheetContent}>
        <Text style={styles.sheetTitle}>
          {type === 'whitelist' ? 'เพิ่มเข้ารายการขาว' : 'เพิ่มเข้ารายการดำ'}
        </Text>

        <TextInput
          label="หมายเลขโทรศัพท์"
          value={number}
          onChangeText={setNumber}
          mode="outlined"
          keyboardType="phone-pad"
        />

        <TextInput
          label="ชื่อ/หมายเหตุ (ไม่บังคับ)"
          value={name}
          onChangeText={setName}
          mode="outlined"
        />

        <Button
          mode="text"
          icon="contacts"
          onPress={pickFromContacts}
        >
          เลือกจากสมุดโทรศัพท์
        </Button>

        <View style={styles.sheetActions}>
          <Button mode="outlined" onPress={onDismiss}>
            ยกเลิก
          </Button>
          <Button mode="contained" onPress={() => onAdd(number, name)}>
            เพิ่ม
          </Button>
        </View>
      </View>
    </BottomSheet>
  );
};
```

### 6. Pull to Refresh

```tsx
import { RefreshControl } from 'react-native';

const HomeScreen = () => {
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = async () => {
    setRefreshing(true);
    // Fetch latest data
    await fetchStatistics();
    await fetchRecentActivity();
    setRefreshing(false);
  };

  return (
    <ScrollView
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
          colors={['#2196F3']}
          tintColor="#2196F3"
        />
      }
    >
      {/* Content */}
    </ScrollView>
  );
};
```

---

## 🎬 Animations & Transitions

### 1. Screen Transitions

```tsx
// Stack Navigator with animations
const Stack = createStackNavigator();

<Stack.Navigator
  screenOptions={{
    headerShown: false,
    cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
    transitionSpec: {
      open: TransitionSpecs.TransitionIOSSpec,
      close: TransitionSpecs.TransitionIOSSpec,
    },
  }}
>
  {/* Screens */}
</Stack.Navigator>
```

### 2. Card Animations

```tsx
import Animated, { FadeInDown } from 'react-native-reanimated';

const AnimatedCard = ({ index, children }) => (
  <Animated.View
    entering={FadeInDown.delay(index * 100).springify()}
  >
    {children}
  </Animated.View>
);
```

### 3. Risk Level Pulse Animation

```tsx
import Animated, {
  useAnimatedStyle,
  withRepeat,
  withSequence,
  withTiming,
} from 'react-native-reanimated';

const PulsingRiskBadge = ({ level }) => {
  const pulseStyle = useAnimatedStyle(() => {
    if (level === RiskLevel.CRITICAL || level === RiskLevel.HIGH) {
      return {
        opacity: withRepeat(
          withSequence(
            withTiming(0.5, { duration: 500 }),
            withTiming(1, { duration: 500 })
          ),
          -1,
          true
        ),
      };
    }
    return {};
  });

  return (
    <Animated.View style={pulseStyle}>
      <RiskBadge level={level} />
    </Animated.View>
  );
};
```

### 4. Loading Shimmer Effect

```tsx
import { LinearGradient } from 'expo-linear-gradient';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';

const ShimmerPlaceholder = ({ width, height }) => {
  const translateX = useSharedValue(-width);

  React.useEffect(() => {
    translateX.value = withRepeat(
      withTiming(width, { duration: 1000 }),
      -1,
      false
    );
  }, []);

  const shimmerStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  return (
    <View style={{ width, height, overflow: 'hidden', backgroundColor: '#E0E0E0' }}>
      <Animated.View style={shimmerStyle}>
        <LinearGradient
          colors={['#E0E0E0', '#F5F5F5', '#E0E0E0']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={{ width, height }}
        />
      </Animated.View>
    </View>
  );
};
```

---

## 📱 Responsive Design

### Screen Size Breakpoints

```typescript
import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const breakpoints = {
  small: width < 375,      // iPhone SE
  medium: width >= 375,    // iPhone 12/13/14
  large: width >= 414,     // iPhone 12 Pro Max
  tablet: width >= 768,    // iPad
};

// Responsive spacing
const getSpacing = (base: number) => {
  if (breakpoints.small) return base * 0.8;
  if (breakpoints.large) return base * 1.2;
  return base;
};

// Responsive font size
const getFontSize = (base: number) => {
  if (breakpoints.small) return base * 0.9;
  if (breakpoints.large) return base * 1.1;
  return base;
};
```

### Adaptive Layouts

```tsx
const styles = StyleSheet.create({
  statsContainer: {
    flexDirection: breakpoints.small ? 'column' : 'row',
    justifyContent: 'space-around',
    marginTop: getSpacing(16),
  },
  statItem: {
    alignItems: 'center',
    width: breakpoints.small ? '100%' : 'auto',
    marginBottom: breakpoints.small ? 12 : 0,
  },
});
```

---

## 🌙 Dark Mode Support

### Theme Configuration

```typescript
import { MD3DarkTheme, MD3LightTheme } from 'react-native-paper';

const lightTheme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    primary: '#2196F3',
    background: '#F5F5F5',
    surface: '#FFFFFF',
    text: '#212121',
  },
};

const darkTheme = {
  ...MD3DarkTheme,
  colors: {
    ...MD3DarkTheme.colors,
    primary: '#64B5F6',
    background: '#121212',
    surface: '#1E1E1E',
    text: '#FFFFFF',
  },
};

// Usage
<PaperProvider theme={isDarkMode ? darkTheme : lightTheme}>
  {/* App */}
</PaperProvider>
```

---

## ♿ Accessibility

### 1. Screen Reader Support

```tsx
<TouchableOpacity
  accessible={true}
  accessibilityLabel="ตรวจสอบหมายเลขโทรศัพท์"
  accessibilityHint="กดเพื่อตรวจสอบหมายเลขโทรศัพท์ว่าเป็นสแปมหรือไม่"
  accessibilityRole="button"
>
  <Text>ตรวจสอบ</Text>
</TouchableOpacity>
```

### 2. Minimum Touch Target Size

```typescript
const MIN_TOUCH_SIZE = 44; // iOS HIG recommendation

const styles = StyleSheet.create({
  button: {
    minHeight: MIN_TOUCH_SIZE,
    minWidth: MIN_TOUCH_SIZE,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
```

### 3. Color Contrast

```typescript
// Ensure WCAG AA compliance (4.5:1 for normal text)
const contrastColors = {
  // Background: #2196F3 (Primary Blue)
  textOnPrimary: '#FFFFFF',    // Contrast ratio: 5.26:1 ✓

  // Background: #F5F5F5 (Light Gray)
  textOnBackground: '#212121',  // Contrast ratio: 15.8:1 ✓

  // Background: #FFFFFF (White)
  textOnSurface: '#212121',     // Contrast ratio: 16.1:1 ✓
};
```

---

## 📊 Performance Optimization

### 1. List Virtualization

```tsx
import { FlashList } from '@shopify/flash-list';

<FlashList
  data={callLogs}
  renderItem={renderCallLog}
  estimatedItemSize={80}
  keyExtractor={item => item.id}
/>
```

### 2. Image Optimization

```tsx
import FastImage from 'react-native-fast-image';

<FastImage
  source={{ uri: imageUrl }}
  style={styles.image}
  resizeMode={FastImage.resizeMode.cover}
/>
```

### 3. Memoization

```tsx
const CallLogItem = React.memo(({ item }) => (
  <Card>
    {/* Content */}
  </Card>
), (prevProps, nextProps) => {
  return prevProps.item.id === nextProps.item.id;
});
```

---

## 🧪 User Testing Checklist

### Onboarding Flow
- [ ] แสดงหน้า welcome screen ครั้งแรกที่เปิดแอป
- [ ] ขออนุญาต permissions (Phone state, Contacts, Call log)
- [ ] แนะนำวิธีใช้งานแต่ละหน้า
- [ ] สามารถข้ามได้

### Core Features
- [ ] ตรวจสอบเบอร์จาก input ได้
- [ ] ตรวจสอบเบอร์จากสมุดโทรศัพท์ได้
- [ ] แสดงผลรายงานถูกต้อง
- [ ] บล็อกสายอัตโนมัติทำงาน
- [ ] แจ้งเตือนเมื่อมีสายเข้า

### Error Handling
- [ ] แสดง error message ที่เข้าใจง่าย
- [ ] มีปุ่ม retry เมื่อเกิด error
- [ ] offline mode ทำงาน
- [ ] timeout handling

### UX Details
- [ ] Loading states ทุกหน้า
- [ ] Empty states ทุกหน้า
- [ ] Success feedback (toast, animation)
- [ ] Error feedback (toast, vibration)
- [ ] Pull to refresh
- [ ] Swipe gestures
- [ ] Haptic feedback

---

## 📝 Implementation Priority

### Phase 1: Critical UX Improvements (Week 1-2)
1. ✅ Empty State Components
2. ✅ Error Handling UI
3. ✅ Loading Skeletons
4. ✅ Pull to Refresh
5. ✅ Bottom Sheet for Modals

### Phase 2: Enhanced Features (Week 3-4)
1. ⏳ Search & Filter
2. ⏳ Swipe Actions
3. ⏳ Dark Mode
4. ⏳ Animations
5. ⏳ Contact Picker Integration

### Phase 3: Polish (Week 5-6)
1. ⏳ Onboarding Flow
2. ⏳ Accessibility
3. ⏳ Performance Optimization
4. ⏳ User Testing
5. ⏳ Bug Fixes

---

## 🎯 Success Metrics

### Quantitative Metrics
- App load time < 2 seconds
- Screen transition < 300ms
- API response feedback < 500ms
- 60 FPS scrolling
- Crash rate < 0.1%

### Qualitative Metrics
- User can complete phone check in < 10 seconds
- 90% of users understand risk levels
- 80% enable auto-blocking
- User satisfaction score > 4.5/5

---

## 📚 Resources

### Design Tools
- **Figma**: [KnowCall Design System](https://figma.com/...)
- **Color Palette**: Material Design Color Tool
- **Icons**: Material Community Icons

### References
- [Material Design 3 Guidelines](https://m3.material.io/)
- [iOS Human Interface Guidelines](https://developer.apple.com/design/human-interface-guidelines/)
- [React Native Best Practices](https://reactnative.dev/docs/performance)
- [Accessibility Guidelines](https://www.w3.org/WAI/standards-guidelines/wcag/)

---

**Last Updated**: 2025-11-09
**Version**: 1.0
**Author**: KnowCall Design Team
