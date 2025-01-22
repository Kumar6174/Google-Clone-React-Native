import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ViewStyle } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

interface ShortcutButtonProps {
  title: string;
  iconName: string;
  onPress?: () => void;
  style?: ViewStyle;
  bgColor: string;
  iconColor: string;
}

export default function ShortcutButton({ title, iconName, onPress, style, bgColor, iconColor }: ShortcutButtonProps) {
  return (
    <TouchableOpacity style={[styles.container, style, {backgroundColor: bgColor}]} onPress={onPress}>
      <Icon name={iconName} size={20} color={iconColor} />
      {/* <Text style={styles.text}>{title}</Text> */}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    // margin: 10,
    padding: 15,
    borderRadius: 50,
    width: 80,
    height: 50,
  },
  text: {
    marginTop: 5,
    color: '#fff',
    fontSize: 12,
    textAlign: 'center',
  },
});
