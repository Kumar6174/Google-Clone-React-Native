import React, {useEffect} from 'react';
import {
  View,
  StyleSheet,
  Image,
  Text,
  ScrollView,
  FlatList,
  ActivityIndicator,
  StatusBar,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {fetchNewsRequest} from '../redux/actions/newsActions';
import {RootState} from '../redux/reducers/rootReducer';
import SearchBar from '../components/SearchBar';
import ShortcutButton from '../components/ShortcutButton';
import {
  lightBlue,
  lightGreen,
  lightRed,
  lightYellow,
  mainBackgroundColor,
  searchBackgroundColor,
} from '../constant';
import Icon from 'react-native-vector-icons/MaterialIcons';
import ToggleButton from '../components/ToggleBotton';
import {Compliment, GoogleSearch, LensSearch, VoiceSearch} from '../navigation/ScreenNameConstant';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

export default function HomeScreen({navigation}: any) {
  const dispatch = useDispatch();
  const {articles, loading, error} = useSelector(
    (state: RootState) => state.news,
  );
  const insets = useSafeAreaInsets();
  // Dispatch fetch news request when the screen loads
  useEffect(() => {
    dispatch(fetchNewsRequest());
  }, [dispatch]);

  // Render a single news item
  const renderNewsItem = ({item}: any) => {
    return (
      <View style={styles.newsCard}>
        {/* Image */}
        <Image
          source={{
            uri:
              item?.thumbnail ||
              item?.highlight?.thumbnail ||
              item?.stories[0]?.thumbnail,
          }}
          style={styles.newsImage}
          resizeMode="cover" // Ensures the image retains its aspect ratio
        />
        {/* Title */}
        <View style={styles.newsContent}>
          <Text style={styles.newsTitle}>
            {item?.title || item?.highlight?.title}
          </Text>
          <View style={styles.sourceView}>
            <Image
              source={{
                uri:
                  item?.thumbnail ||
                  item?.highlight?.source?.icon ||
                  item?.stories[0]?.source?.icon,
              }}
              style={styles.sourceImage}
              resizeMode="cover" // Ensures the image retains its aspect ratio
            />
            <Text style={styles.newsSource}>
              {item?.source?.name || item?.highlight?.source?.name}
            </Text>
          </View>
        </View>
      </View>
    );
  };

  return (
    <ScrollView
    style={{backgroundColor:mainBackgroundColor}}
      contentContainerStyle={[styles.container, {paddingTop: insets.top}]}>
      <StatusBar backgroundColor={mainBackgroundColor}></StatusBar>
      {/* Top Bar */}
      <View style={styles.topBar}>
        <Icon style={styles.labIcon} name="science" size={36} color="#fcfeff" />
        <ToggleButton />
        <Image
          source={{
            uri: 'https://m.media-amazon.com/images/I/81oh+laPg5L._AC_UF1000,1000_QL80_.jpg',
          }}
          style={styles.avatar}
        />
      </View>

      {/* Google Logo */}
      <Text style={styles.googleText}>Google</Text>

      {/* Search Bar */}
      <SearchBar
        onSearchPress={() => navigation.navigate(GoogleSearch)}
        onLensPress={() => navigation.navigate(LensSearch)}
        onMicPress={() => navigation.navigate(VoiceSearch)}
      />

      {/* Shortcut Buttons */}
      <View style={styles.shortcuts}>
        <ShortcutButton
          title="ImageSearch"
          iconName="image-search"
          bgColor={lightYellow}
          iconColor="#f0d070"
        />
        <ShortcutButton
          title="Translate"
          iconName="translate"
          bgColor={lightBlue}
          iconColor="#8eb5f7"
        />
        <ShortcutButton
          title="Weather"
          iconName="school"
          bgColor={lightGreen}
          iconColor="#d0e7d9"
        />
        <ShortcutButton
          title="Shopping"
          iconName="music-note"
          bgColor={lightRed}
          iconColor="#ec9083"
        />
      </View>

      {/* News Section */}
      <View style={styles.newsContainer}>
        {/* Show loading or error state */}
        {loading ? (
          <ActivityIndicator size="large" color="#fff" />
        ) : error ? (
          <Text style={styles.errorText}>{error}</Text>
        ) : (
          <FlatList
            data={articles}
            keyExtractor={(item, index) => index.toString()}
            renderItem={renderNewsItem}
            contentContainerStyle={styles.newsList}
            scrollEnabled={false} // Disable FlatList scrolling
            // ItemSeparatorComponent={()=> <View style={{ width:"100%", backgroundColor:searchBackgroundColor, height:1}}></View>}
          />
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1, // Allows ScrollView to scroll
    alignItems: 'center',
    backgroundColor: mainBackgroundColor,
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 10,
    height: 60,
    width: '100%',
  },
  labIcon: {
    position: 'absolute',
    left: 20,
  },
  avatar: {
    width: 34,
    height: 34,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: '#9b9fa2',
    position: 'absolute',
    right: 20,
  },
  googleText: {
    fontSize: 34,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 36,
    marginTop: 20,
    fontFamily: 'Roboto',
  },
  shortcuts: {
    flexDirection: 'row',
    // flexWrap: 'wrap',
    justifyContent:'space-evenly',
    marginVertical:10,
    // backgroundColor:'red',
    maxWidth:400,
    width:'100%'
  },
  newsContainer: {
    width: '100%',
    // paddingHorizontal: 16,
    marginTop: 2,
  },
  newsHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
  },
  newsList: {
    paddingBottom: 20,
  },
  newsCard: {
    flexDirection: 'column', // Layout items in a column
    backgroundColor: 'transparent',
    borderTopWidth: 1,
    borderColor: searchBackgroundColor,
    overflow: 'hidden',
    padding: 16,
    alignItems: 'flex-start', // Center content horizontally
  },
  newsImage: {
    width: '100%', // Image takes the full width of the container
    height: undefined, // Height adjusts automatically
    flex: 1, // Ensures the image scales within its parent container
    borderRadius: 16, // Optional rounded corners
    resizeMode: 'cover', // Ensures the image covers the container
    aspectRatio: 1.2,
  },
  newsContent: {
    marginTop: 14, // Add spacing between image and text
    alignItems: 'flex-start', // Center the text
    // marginLeft:20
  },
  newsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'left', // Center align the title
  },
  sourceView: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: 16,
  },
  newsSource: {
    fontSize: 12,
    color: '#ccc',
    marginLeft: 8,
    textAlign: 'center', // Center align the source
  },
  sourceImage: {
    height: 18,
    width: 18,
    borderRadius: 20,
  },
  errorText: {
    color: '#f55',
    textAlign: 'center',
    marginTop: 10,
  },
});
