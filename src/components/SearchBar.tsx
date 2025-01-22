import React from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Text,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {searchBackgroundColor} from '../constant';

interface SearchBarProps {
  onLensPress: () => void;
  onSearchPress: () => void;
  onMicPress: () => void;
}

export default function SearchBar({
  onLensPress,
  onSearchPress,
  onMicPress
}: SearchBarProps) {
  return (
    <TouchableOpacity style={styles.container} onPress={onSearchPress}>
      <Icon name="search" size={26} color="#9b9fa2" />
      {/* <TextInput
        style={styles.input}
        placeholder="Search"
        placeholderTextColor="#9b9fa2"
      /> */}
      <View style={{flex: 1, paddingLeft: 12}}>
        <Text style={{fontSize: 24, color: '#9b9fa2'}}>Search</Text>
      </View>
      <View
        style={{
          flexDirection: 'row',
          width: 70,
          justifyContent: 'space-between',
        }}>
        <Icon name="mic" size={26} color="#fcfeff" onPress={onMicPress} />
        <Icon
          name="camera-alt"
          size={26}
          color="#fcfeff"
          onPress={onLensPress}
        />
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: searchBackgroundColor,
    borderRadius: 100,
    paddingHorizontal: 20,
    width: '94%',
    height: 70,
  },
  input: {flex: 1, color: '#fff', marginLeft: 10, fontSize: 20},
});
