import React from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  Switch,
  SafeAreaView,
  Image,
} from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';
import TopNavigation from '../navigation/TopNavigation';

const SECTIONS = [
  {
    header: 'Preferences',
    items: [
      { icon: 'globe', label: 'Language', value: 'English', type: 'input' },
      { icon: 'moon', label: 'Dark Mode', value: false, type: 'boolean' },
      { icon: 'wifi', label: 'Use Wi-Fi', value: true, type: 'boolean' },
    ],
  },
  {
    header: 'Help',
    items: [
      { icon: 'flag', label: 'Report Bug', type: 'link' },
      { icon: 'mail', label: 'Contact Us', type: 'link' },
    ],
  },
  {
    header: 'Content',
    items: [
      { icon: 'save', label: 'Saved', type: 'link' },
      { icon: 'download', label: 'Downloads', type: 'link' },
    ],
  },
];

function SectionRow({ label, value, type, index, onPress }) {
  return (
    <View style={[{ marginLeft: 12 }, index !== 0 && styles.splitline]}>
      <TouchableOpacity onPress={onPress}>
        <View style={styles.sectionBody}>
          <Text style={styles.sectionBodyRowLabel}>{label}</Text>
          <View style={styles.spacer} />
          {type === 'input' && (
            <Text style={styles.sectionBodyRowValue}>{value}</Text>
          )}
          {type === 'boolean' && <Switch value={value} />}
          {(type === 'input' || type === 'link') && (
            <FeatherIcon
              style={{ marginLeft: 6 }}
              name="chevron-right"
              size={24}
              color="#ababab"
            />
          )}
        </View>
      </TouchableOpacity>
    </View>
  );
}

export default function SettingsScreen() {
  const navigation = useNavigation();
  return (
    <SafeAreaView style={styles.container}>
      
      <TopNavigation />
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <FeatherIcon name="arrow-left" size={24} color="#1f1f1f" />
        </TouchableOpacity>
        <Text style={styles.title}>Settings</Text>
      </View>

      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionHeaderText}>Account</Text>
        </View>
        <View style={styles.profile}>
          <Image
            alt=""
            source={require('../assets/profile.jpg')}
            style={styles.profileAvatar}
          />

          <View style={styles.profileBody}>
            <Text style={styles.profileName}>John Doe</Text>

            <Text style={styles.profileHandle}>john.doe@mail.com</Text>
          </View>
        </View>
      </View>

      {SECTIONS.map(({ header, items }) => (
        <View style={styles.section} key={header}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionHeaderText}>{header}</Text>
          </View>
          <View style={styles.sectionBody}>
            {items.map(({ label, type, value }, index) => {
              const isFirst = index === 0;
              const isLast = index === items.length - 1;
              return (
                <View
                  key={index}
                  style={[
                    styles.rowWrapper,
                    index === 0 && { borderTopWidth: 0 },
                    isFirst && styles.rowFirst,
                    isLast && styles.rowLast,
                  ]}>
                  <TouchableOpacity
                    onPress={() => {
                      // handle onPress
                    }}>
                    <View style={styles.row}>
                      <Text style={styles.rowLabel}>{label}</Text>

                      <View style={styles.rowSpacer} />

                      {type === 'input' && (
                        <Text style={styles.rowValue}>{value}</Text>
                      )}

                      {type === 'boolean' && <Switch value={value} />}

                      {(type === 'input' || type === 'link') && (
                        <FeatherIcon
                          color="#ababab"
                          name="chevron-right"
                          size={22}
                        />
                      )}
                    </View>
                  </TouchableOpacity>
                </View>
              );
            })}
          </View>
        </View>
      ))}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f8f8f8',
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start', 
    paddingTop: 12,
    paddingLeft: 12,
  },
  backButton: {
    marginRight: 130, 
  },
  title: {
    fontSize: 20, // Updated from 24 to 20
  
    color: '#1f1f1f',
    fontFamily: 'KottaOne', // Added font family
  },
  section: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  sectionHeader: {
    padding: 8,
    paddingLeft: 12,
  },
  sectionHeaderText: {
    fontSize: 12, // Updated from 13 to 16
    fontWeight: '500',
    color: '#adadad',
    textTransform: 'uppercase',
    fontFamily: 'NotoSans', // Added font family
  },
  sectionBody: {
    borderRadius: 12,
    shadowColor: 'rgba(0,0,0,0.25)',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  profile: {
    padding: 12,
    backgroundColor: '#fff',
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  profileAvatar: {
    width: 60,
    height: 60,
    borderRadius: 9999,
    marginRight: 12,
  },
  profileName: {
    fontSize: 16, // Updated from 18 to 16
    fontWeight: '600',
    color: '#292929',
    fontFamily: 'KottaOne', // Added font family
  },
  profileHandle: {
    marginTop: 2,
    fontSize: 16,
    fontWeight: '400',
    color: '#858585',
    fontFamily: 'NotoSans', // Added font family
  },
  profileAction: {
    marginTop: 16,
    paddingVertical: 10,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#007bff',
    borderRadius: 12,
  },
  profileActionText: {
    marginRight: 8,
    fontSize: 15,
    fontWeight: '600',
    color: '#fff',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 12,
    paddingRight: 12,
    paddingBottom: 12,
    paddingLeft: 0,
  },
  rowFirst: {
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  rowLast: {
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
  },
  rowWrapper: {
    paddingLeft: 16,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderColor: '#f0f0f0',
  },
  rowLabel: {
    fontSize: 16, // Updated from 17 to 16
    color: '#000',
  },
  rowValue: {
    fontSize: 16, // Updated from 17 to 16
    color: '#ababab',
  },
  rowSpacer: {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
  },
});