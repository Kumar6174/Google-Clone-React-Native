import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  FlatList,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {searchClear, searchRequest} from '../redux/actions/searchActions';
import {RootState} from '../redux/reducers/rootReducer';
import {
  mainBackgroundColor,
  searchBackgroundColor,
  textGrayColor,
  titleBlueColor,
} from '../constant';
import Icon from 'react-native-vector-icons/MaterialIcons';

import {LensSearch, VoiceSearch} from '../navigation/ScreenNameConstant';
import {
  fetchSuggestionsClear,
  fetchSuggestionsRequest,
} from '../redux/actions/autocompleteActions';
import {
  fetchTrendingClear,
  fetchTrendingRequest,
} from '../redux/actions/trendingActions';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

export default function GoogleSearchScreen({navigation,route}: any) {
  
  const insets = useSafeAreaInsets();
  const [query, setQuery] = useState('');
  const dispatch = useDispatch();
  const {results, loading, error} = useSelector(
    (state: RootState) => state.search,
  );
  const {
    data: trendingData,
    loading: trendingLoading,
    error: trendingError,
  } = useSelector((state: RootState) => state.trending);
  const {suggestions, loading: loadingSuggestions} = useSelector(
    (state: RootState) => state.autocomplete,
  );

  useEffect(()=>{
    if(route?.params?.text){
      setQuery(route?.params?.text)
      performSearch(route?.params?.text);
    }
  },[route?.params?.text])
  useEffect(() => {
    dispatch(fetchTrendingRequest());
  }, []);

  const performSearch = (text?: any) => {
    if (!query.trim() && !text.trim()) return;
    dispatch(searchRequest(query || text));
  };

  const handleSuggestionsFetch = (text: string) => {
    setQuery(text);
    if (text.trim()) {
      dispatch(fetchSuggestionsRequest(text));
    }
  };

  const renderSuggestionItem = ({item}: {item: string}) => (
    <TouchableOpacity
      style={styles.suggestionItem}
      onPress={() => {
        setQuery(item);
        performSearch(item);
        dispatch(fetchSuggestionsClear());
      }}>
      <Icon name="search" size={20} color="#9b9fa2" />
      <Text style={styles.suggestionText}>{item}</Text>
    </TouchableOpacity>
  );

  const renderItem = ({item}: any) => (
    <TouchableOpacity
      style={styles.resultCard}
      onPress={() => console.log(item.link)}>
      <View
        style={[
          styles.resultContent,
          {paddingHorizontal: item.pagemap?.cse_image?.[0]?.src ? 0 : 7},
        ]}>
        <Text style={styles.resultTitle}>{item.title}</Text>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: 12,
          }}>
          <Text
            style={[
              styles.resultSnippet,
              {width: item.pagemap?.cse_image?.[0]?.src ? '75%' : '100%'},
            ]}>
            {item.snippet}
          </Text>

          {item.pagemap?.cse_image?.[0]?.src && (
            <Image
              source={{uri: item.pagemap.cse_image[0].src}}
              style={styles.resultImage}
            />
          )}
        </View>
      </View>
    </TouchableOpacity>
  );

  const renderTrendingItem = ({item}: any) => (
    <TouchableOpacity
      style={styles.trendingItem}
      onPress={() => {
        setQuery(item.query);
        performSearch(item.query);
        dispatch(fetchTrendingClear());
      }}>
      <View
        style={{
          backgroundColor: searchBackgroundColor,
          paddingVertical: 5,
          paddingHorizontal: 6,
          borderRadius: 30,
        }}>
        <Icon
          onPress={() => navigation.goBack()}
          name="trending-up"
          size={18}
          color="#9b9fa2"
        />
      </View>
      <Text style={styles.trendingText}>{item.query}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={[styles.container, {paddingTop: insets.top}]}>
      <View style={styles.searchContainer}>
        <Icon
          onPress={() => {
            navigation.goBack();
            dispatch(fetchTrendingClear());
            dispatch(fetchSuggestionsClear());
            dispatch(searchClear());
          }}
          name="arrow-back-ios"
          size={18}
          color="#9b9fa2"
        />
        <TextInput
          style={styles.searchInput}
          placeholder="Search or type URL"
          placeholderTextColor="#9b9fa2"
          value={query}
          onChangeText={handleSuggestionsFetch}
          onSubmitEditing={performSearch}
        />
        {query.length > 0 ? (
          <Icon
            onPress={() => setQuery('')}
            name="close"
            size={18}
            color="#9b9fa2"></Icon>
        ) : (
          <View
            style={{
              flexDirection: 'row',
              width: 70,
              justifyContent: 'space-between',
            }}>
            <Icon
              name="mic"
              size={26}
              color="#fcfeff"
              onPress={() => navigation.navigate(VoiceSearch)}
            />
            <Icon
              name="camera-alt"
              size={26}
              color="#fcfeff"
              onPress={() => navigation.navigate(LensSearch)}
            />
          </View>
        )}
      </View>

      {trendingLoading && <ActivityIndicator size="small" color="#4285F4" />}
      {query.trim() == '' && trendingData.length > 0 && results.length == 0 && (
        <>
          <Text style={{color: '#9b9fa2', marginBottom: 16, fontWeight: '600'}}>
            What's Trending
          </Text>
          <FlatList
            data={trendingData.slice(0, 10)}
            keyExtractor={(item, index) => index.toString()}
            renderItem={renderTrendingItem}
          />
        </>
      )}

      {loadingSuggestions && <ActivityIndicator size="small" color="#4285F4" />}
      {query.trim() !== '' && suggestions.length > 0 && (
        <FlatList
          data={suggestions}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderSuggestionItem}
        />
      )}

      {loading && <ActivityIndicator size="large" color="#4285F4" />}
      {error && <Text style={styles.errorText}>{error}</Text>}

      <FlatList
        data={results || []}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItem}
        contentContainerStyle={styles.resultsList}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: mainBackgroundColor,
    padding: 16,
  },
  searchContainer: {
    flexDirection: 'row',
    backgroundColor: searchBackgroundColor,
    borderRadius: 100,
    paddingHorizontal: 20,
    width: '100%',
    height: 54,
    alignItems: 'center',
    marginBottom: 10,
  },
  searchInput: {
    flex: 1,
    height: 54,
    color: '#fff',
    paddingHorizontal: 10,
    fontSize: 16,
  },
  resultsList: {
    paddingBottom: 20,
  },
  resultCard: {
    // flexDirection: 'row',
    alignItems: 'center',
    // backgroundColor: '#f9f9f9',
    borderRadius: 10,
    paddingVertical: 10,
    marginBottom: 10,
    // elevation: 1,
  },
  resultImage: {
    width: 80,
    height: 80,
    borderRadius: 5,
    resizeMode: 'cover',
    // marginR: 10,
    // flex:1
  },
  resultContent: {
    flex: 1,
  },
  resultTitle: {
    fontSize: 18,
    // fontWeight: 'bold',
    color: titleBlueColor,
  },
  resultSnippet: {
    fontSize: 14,
    color: textGrayColor,
    lineHeight: 20,
  },
  errorText: {
    color: '#f55',
    textAlign: 'center',
    marginTop: 10,
  },
  suggestionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },
  suggestionText: {
    marginLeft: 10,
    color: textGrayColor,
    fontSize: 16,
  },
  trendingItem: {
    flexDirection: 'row',
    paddingVertical: 8,
    alignItems: 'center',
  },
  trendingText: {
    fontSize: 15,
    color: '#fff',
    marginLeft: 16,
  },
});
