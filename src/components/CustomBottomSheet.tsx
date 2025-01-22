import {
  FlatList,
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useCallback, useMemo, useRef, useState} from 'react';
import BottomSheet, {BottomSheetScrollView} from '@gorhom/bottom-sheet';
import {mainBackgroundColor, searchBackgroundColor} from '../constant';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialIcons';


interface TransactionsData {
  add_amount_remark: string | null;
  added_amount: number;
  amount_updated_by: number;
  date_add: string;
  id: number;
  order_id: string;
  paid_through_shopify: number;
  paid_through_wallet: number;
  refund_amount: number;
  show_remark: number | null;
  spend_amount: number;
  status: number;
  transaction_type: number;
}

const topTabBarData = [
  'All',
  'Products',
  'Homework',
  'Visual Matches',
  'About this image',
];

const sampleData = [
  {
    id: 1,
    title: 'Stylish Coffee Mug',
    image_url: 'https://images.unsplash.com/photo-1501163268664-3fdf329d019f',
    website_link: 'amazon.com',
    icon_logo_url:
      'https://cdn4.iconfinder.com/data/icons/flat-brand-logo-2/512/amazon-512.png',
  },
  {
    id: 2,
    title: 'Classic Leather Backpack',
    image_url: 'https://images.unsplash.com/photo-1501163268664-3fdf329d019f',
    website_link: 'amazon.com',
    icon_logo_url:
      'https://cdn4.iconfinder.com/data/icons/flat-brand-logo-2/512/amazon-512.png',
  },
  {
    id: 3,
    title: 'Bluetooth Headphones',
    image_url: 'https://images.unsplash.com/photo-1501163268664-3fdf329d019f',
    website_link: 'amazon.com',
    icon_logo_url:
      'https://cdn4.iconfinder.com/data/icons/flat-brand-logo-2/512/amazon-512.png',
  },
  {
    id: 4,
    title: 'Portable Laptop Stand',
    image_url: 'https://images.unsplash.com/photo-1501163268664-3fdf329d019f',
    website_link: 'amazon.com',
    icon_logo_url:
      'https://cdn4.iconfinder.com/data/icons/flat-brand-logo-2/512/amazon-512.png',
  },
  {
    id: 5,
    title: 'Minimalist Desk Lamp',
    image_url: 'https://images.unsplash.com/photo-1501163268664-3fdf329d019f',
    website_link: 'amazon.com',
    icon_logo_url:
      'https://cdn4.iconfinder.com/data/icons/flat-brand-logo-2/512/amazon-512.png',
  },
  {
    id: 6,
    title: 'Stylish Coffee Mug',
    image_url: 'https://images.unsplash.com/photo-1501163268664-3fdf329d019f',
    website_link: 'amazon.com',
    icon_logo_url:
      'https://cdn4.iconfinder.com/data/icons/flat-brand-logo-2/512/amazon-512.png',
  },
  {
    id: 7,
    title: 'Classic Leather Backpack',
    image_url: 'https://images.unsplash.com/photo-1501163268664-3fdf329d019f',
    website_link: 'amazon.com',
    icon_logo_url:
      'https://cdn4.iconfinder.com/data/icons/flat-brand-logo-2/512/amazon-512.png',
  },
  {
    id: 8,
    title: 'Bluetooth Headphones',
    image_url: 'https://images.unsplash.com/photo-1501163268664-3fdf329d019f',
    website_link: 'amazon.com',
    icon_logo_url:
      'https://cdn4.iconfinder.com/data/icons/flat-brand-logo-2/512/amazon-512.png',
  },
  {
    id: 9,
    title: 'Portable Laptop Stand',
    image_url: 'https://images.unsplash.com/photo-1501163268664-3fdf329d019f',
    website_link: 'amazon.com',
    icon_logo_url:
      'https://cdn4.iconfinder.com/data/icons/flat-brand-logo-2/512/amazon-512.png',
  },
  {
    id: 10,
    title: 'Minimalist Desk Lamp',
    image_url: 'https://images.unsplash.com/photo-1501163268664-3fdf329d019f',
    website_link: 'amazon.com',
    icon_logo_url:
      'https://cdn4.iconfinder.com/data/icons/flat-brand-logo-2/512/amazon-512.png',
  },
];
const CustomBottomSheet = ({navigation, capturedImage}: any) => {
  const [bottomSheetIndex, setBottomSheetIndex] = useState(0);
  const [selectedItem, setSelectedItem] = useState<string | null>('All');
  const insets = useSafeAreaInsets();

  const handleSheetChanges = useCallback((index: number) => {
    setBottomSheetIndex(index);
  }, []);

  const bottomSheetRef = useRef(null);

  const snapPoints = useMemo(() => ['30%', '100%'], []);

  const handleItemPress = (link: string) => {
    console.log(`Navigating to ${link}`);
  };

  return (
    <BottomSheet
      ref={bottomSheetRef}
      index={bottomSheetIndex}
      snapPoints={snapPoints}
      backgroundStyle={{
        backgroundColor: mainBackgroundColor,
        borderRadius: bottomSheetIndex == 1 ? 0 : 24,
      }}


      handleIndicatorStyle={{
        backgroundColor: searchBackgroundColor,
        display: bottomSheetIndex == 0 ? 'flex' : 'none',
      }}
      style={{
        flex: 1,
        paddingTop: bottomSheetIndex == 1 ? insets?.top : 0,
        backgroundColor:mainBackgroundColor,
        borderRadius:bottomSheetIndex == 1 ? 0 : 24,
      }}
      onChange={handleSheetChanges}>
      {/* Add Search Section */}
      <TouchableOpacity

        onPress={() => navigation.navigate('GoogleSearch')}>
        <View style={[styles.searchContainer]}>
          <Image
            source={require('../../assets/images/google_logo.png')}
            style={styles.logo}
          />
          <Image
            source={{uri: `file://${capturedImage}`}}
            style={styles.capturedImage}
          />

          <Text style={{fontSize: 20, color: '#9b9fa2'}}>Add to search</Text>

          {bottomSheetIndex == 1 && (
            <>
              <View
                style={{
                  width: 1,
                  height: 34,
                  backgroundColor: 'grey',
                  position: 'absolute',
                  right: 54,
                }}></View>
              <Image
                source={{
                  uri: 'https://m.media-amazon.com/images/I/81oh+laPg5L._AC_UF1000,1000_QL80_.jpg',
                }}
                style={styles.avatar}
              />
            </>
          )}
        </View>
      </TouchableOpacity>

      <View style={styles.tabBarContainer}>
        <FlatList
          data={topTabBarData}
          keyExtractor={(item, index) => index.toString()}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          renderItem={({item, index}) => (
            <TouchableOpacity onPress={() => setSelectedItem(item)}>
              <Text
                style={[
                  styles.tabText,
                  selectedItem === item && styles.selectedText,
                ]}>
                {item}
              </Text>
              <View
                style={[
                  styles.indicator,
                  selectedItem === item && styles.selectedIndicator,
                ]}
              />
            </TouchableOpacity>
          )}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
        />
      </View>
      <BottomSheetScrollView
        contentContainerStyle={{paddingVertical: 20, paddingHorizontal:10}}
        nestedScrollEnabled>
        {/* <ScrollView contentContainerStyle={{paddingBottom: 20,flex:1}}> */}

        {
          <FlatList
            data={sampleData}
            contentContainerStyle={styles.gridContainer}
            numColumns={2}
            columnWrapperStyle={{ }}
            
            ItemSeparatorComponent={(item: any) => {
              return <>{<View style={{height: 16}}></View>}</>;
            }}
            // onEndReachedThreshold={0.5}
            // onEndReached={endCursor && isHasNextPage ? loadMoreData : null}
            ListFooterComponent={()=>{
              return(
                <View style={{height:30}}>

                </View>
              )
            }}
            renderItem={({index, item}: {index: number; item: any}) => {
              return (
                <>
                  {
                    <TouchableOpacity
                      style={styles.gridItem}
                      onPress={() => handleItemPress(item.website_link)}>
                      <Image
                        source={{uri: item.image_url}}
                        style={styles.image}
                      />
                      <View style={styles.info}>
                        <View style={{flexDirection: 'row'}}>
                          <Image
                            source={{uri: item.image_url}}
                            style={styles.iconLogo}
                          />
                          <Text
                            style={{
                              color: 'grey',
                              fontSize: 14,
                              textTransform: 'capitalize',
                              marginLeft: 8,
                            }}>
                            {item.website_link}
                          </Text>
                        </View>
                        <Text style={styles.title} numberOfLines={2}>
                          {item.title}
                        </Text>
                        {/* <Image
                          source={{uri: item.icon_logo_url}}
                          style={styles.iconLogo}
                        /> */}
                      </View>
                    </TouchableOpacity>
                  }
                </>
              );
            }}></FlatList>
        }
      </BottomSheetScrollView>
    </BottomSheet>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: 'grey',
  },
  searchContainer: {
    flexDirection: 'row',
    backgroundColor: '#303134',
    borderRadius: 100,
    paddingHorizontal: 16,
    width: '92%',
    height: 54,
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginBottom: 10,
    alignSelf: 'center',
  },
  logo: {width: 28, height: 28, resizeMode: 'contain'},
  capturedImage: {
    height: 44,
    width: 50,
    borderRadius: 10,
    marginHorizontal: 16,
    resizeMode: 'cover',
  },
  avatar: {
    width: 34,
    height: 34,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: '#9b9fa2',
    position: 'absolute',
    right: 10,
  },
  tabBarContainer: {
    height: 38,
    borderBottomWidth: 1,
    borderColor: '#3c4043',
    paddingHorizontal: 16,
    marginTop: 5,
    overflow: 'hidden',
  },
  tabText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#a3a4a5',
    marginBottom: 5,
  },
  selectedText: {
    color: '#fff',
  },
  indicator: {
    height: 2,
    backgroundColor: 'transparent',
  },
  selectedIndicator: {
    backgroundColor: '#fff',
  },
  separator: {
    width: 20,
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
    borderRadius: 0,
  },
  gridContainer: {
    // paddingHorizontal: 8,
    // marginTop: 10,
    paddingBottom: 20,
  },
  gridItem: {
    flex: 1,
    marginHorizontal: 5,

    // backgroundColor: '#303134',
    borderRadius: 8,
    overflow: 'hidden',
  },
  image: {
    // width: '95%',
    height: 150,
    resizeMode: 'contain',
    backgroundColor: searchBackgroundColor,
    borderRadius: 8,
  },
  info: {
    // flexDirection: 'row',
    justifyContent: 'space-between',
    // alignItems: 'center',
    marginTop: 4,
    paddingVertical: 6,
  },
  title: {
    fontSize: 14,
    color: '#fff',
    flex: 1,
    // marginRight: 8,
    marginTop: 8,
  },
  iconLogo: {
    width: 22,
    height: 22,
    resizeMode: 'cover',
    borderRadius: 20,
  },
});

export default CustomBottomSheet;
