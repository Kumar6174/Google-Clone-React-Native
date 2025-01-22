import React, {useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {searchBackgroundColor} from '../constant';

export default function ToggleButton() {
  const [isSearch, setIsSearch] = useState(true);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.button, isSearch && styles.activeButton]}
        onPress={() => setIsSearch(!isSearch)}>
        <Image
          source={require('../../assets/images/google_logo.png')}
          style={styles.logo}
        />
        {/* <Icon name="google" size={20} color={isSearch ? '#fff' : '#ccc'} /> */}
        {isSearch ? (
          <Text style={[styles.text, isSearch && styles.activeText]}>
            Search
          </Text>
        ) : null}
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, !isSearch && styles.activeButton]}
        onPress={() => setIsSearch(!isSearch)}>
        <Image
          source={require('../../assets/images/gemini-logo.png')}
          style={styles.logo}
        />
        {/* <Icon name="star" size={20} color={!isSearch ? '#fff' : '#ccc'} /> */}
        {!isSearch ? (
          <Text style={[styles.text, !isSearch && styles.activeText]}>
            Gemini
          </Text>
        ) : null}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: searchBackgroundColor,
    borderRadius: 12,
    padding: 4,
    alignItems: 'center',
    height: 50,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    // paddingVertical: 4,
    borderRadius: 10,
    height: 40,
  },
  activeButton: {
    backgroundColor: '#1f2125',
  },
  text: {
    color: '#ccc',
    marginLeft: 5,
  },
  activeText: {
    color: '#fff',
  },
  logo: {width: 16, height: 16, resizeMode: 'contain'},
});
