import React, {useCallback, useEffect, useRef, useState} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  ActivityIndicator,
  StatusBar,
  Dimensions,
  Image,
  Alert,
  FlatList,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import {
  Camera,
  CameraDevice,
  useCameraDevices,
} from 'react-native-vision-camera';
import {
  lightBlue,
  mainBackgroundColor,
  searchBackgroundColor,
  textGrayColor,
  titleBlueColor,
} from '../constant';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Torch from 'react-native-torch';
import RNFS from 'react-native-fs';
import ImagePicker from 'react-native-image-crop-picker';
import BottomSheet, {
  BottomSheetModal,
  BottomSheetView,
} from '@gorhom/bottom-sheet';
import CustomBottomSheet from '../components/CustomBottomSheet';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

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
    website_link: 'https://www.amazon.com/dp/B08KH53W27',
    icon_logo_url:
      'https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg',
  },
  {
    id: 2,
    title: 'Classic Leather Backpack',
    image_url: 'https://images.unsplash.com/photo-1501163268664-3fdf329d019f',
    website_link: 'https://www.amazon.com/dp/B08KH53W27',
    icon_logo_url:
      'https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg',
  },
  {
    id: 3,
    title: 'Bluetooth Headphones',
    image_url: 'https://images.unsplash.com/photo-1501163268664-3fdf329d019f',
    website_link: 'https://www.amazon.com/dp/B08KH53W27',
    icon_logo_url:
      'https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg',
  },
  {
    id: 4,
    title: 'Portable Laptop Stand',
    image_url: 'https://images.unsplash.com/photo-1501163268664-3fdf329d019f',
    website_link: 'https://www.amazon.com/dp/B08KH53W27',
    icon_logo_url:
      'https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg',
  },
  {
    id: 5,
    title: 'Minimalist Desk Lamp',
    image_url: 'https://images.unsplash.com/photo-1501163268664-3fdf329d019f',
    website_link: 'https://www.amazon.com/dp/B08KH53W27',
    icon_logo_url:
      'https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg',
  },
  {
    id: 6,
    title: 'Stylish Coffee Mug',
    image_url: 'https://images.unsplash.com/photo-1501163268664-3fdf329d019f',
    website_link: 'https://www.amazon.com/dp/B08KH53W27',
    icon_logo_url:
      'https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg',
  },
  {
    id: 7,
    title: 'Classic Leather Backpack',
    image_url: 'https://images.unsplash.com/photo-1501163268664-3fdf329d019f',
    website_link: 'https://www.amazon.com/dp/B08KH53W27',
    icon_logo_url:
      'https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg',
  },
  {
    id: 8,
    title: 'Bluetooth Headphones',
    image_url: 'https://images.unsplash.com/photo-1501163268664-3fdf329d019f',
    website_link: 'https://www.amazon.com/dp/B08KH53W27',
    icon_logo_url:
      'https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg',
  },
  {
    id: 9,
    title: 'Portable Laptop Stand',
    image_url: 'https://images.unsplash.com/photo-1501163268664-3fdf329d019f',
    website_link: 'https://www.amazon.com/dp/B08KH53W27',
    icon_logo_url:
      'https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg',
  },
  {
    id: 10,
    title: 'Minimalist Desk Lamp',
    image_url: 'https://images.unsplash.com/photo-1501163268664-3fdf329d019f',
    website_link: 'https://www.amazon.com/dp/B08KH53W27',
    icon_logo_url:
      'https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg',
  },
];

const {width, height} = Dimensions.get('window');

const LensSearchScreen = ({navigation}: any) => {
  const [cameraPermission, setCameraPermission] = useState(false);
  const devices = useCameraDevices();
  const backCamera = devices.find(device => device.position === 'back');
  const frontCamera = devices.find(device => device.position === 'front');
  const cameraRef = useRef<Camera>(null);
  const insets = useSafeAreaInsets();
  const [isTorchOn, setIsTorchOn] = useState(false);

  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [croppedImageBase64, setCroppedImageBase64] = useState<string | null>(
    null,
  );
  const [loading, setLoading] = useState(false);
  const bottomSheetRef = useRef<BottomSheetModal>(null); // Ref for Bottom Sheet
  const [selectedItem, setSelectedItem] = useState<string | null>('All');

  const toggleFlashlight = () => {
    try{
      const nextState = !isTorchOn;
      setIsTorchOn(prev => !prev);
      Torch.switchState(nextState);

    }catch(error){
      console.log(error,"torch error==");
      
    }
  };

  // Request camera permissions
  useEffect(() => {
    const requestPermissions = async () => {
      const permission = await Camera.requestCameraPermission();
      setCameraPermission(permission === 'granted');
    };

    requestPermissions();
  }, []);

  const takePicture = async () => {
    if (cameraRef.current) {
      try {
        const photo = await cameraRef.current.takePhoto({});
        setCapturedImage(photo.path); // Show the captured image on the screen
        bottomSheetRef.current?.present();
      } catch (error) {
        console.error('Error taking picture:', error);
      }
    }
  };
  const cropImage = async () => {
    try {
      setLoading(true); // Show loader
      const croppedImage = await ImagePicker.openCropper({
        path: capturedImage!,
        width: 300,
        height: 400,
        cropping: true,
        includeBase64: true,
        mediaType: 'photo'
      });

      // Base64 string from the cropped image
      const base64String = croppedImage.data; // Base64 is directly available
      console.log('Base64:', base64String);

      Alert.alert('Image Cropped', 'Image cropping successful!');
    } catch (error) {
      console.error('Crop Error:', error);
      Alert.alert('Error', 'Failed to crop the image.');
    } finally {
      setLoading(false); // Hide loader
    }
  };

  if (!cameraPermission) {
    return (
      <View style={styles.centeredContainer}>
        <Text style={{color: '#fff'}}>Camera permission is required.</Text>
      </View>
    );
  }

  if (!backCamera && !frontCamera) {
    return (
      <View style={styles.centeredContainer}>
        <ActivityIndicator size="large" color="#fff" />
        <Text style={{color: '#fff'}}>Loading Camera...</Text>
      </View>
    );
  }

  function renderIcons({
    iconName,
    onPress,
  }: {
    iconName: string;
    onPress: () => void;
  }) {
    return <Icon onPress={onPress} name={iconName} size={22} color="#fff" />;
  }
  const handleProcessImage = () => {
    console.log('Processing image...');
  };

  return (
    <>
      <View style={[styles.container, {}]}>
        <StatusBar hidden={true}></StatusBar>

        <View
          style={{
            height: !capturedImage ? '90%' : '80%',
            borderBottomRightRadius: 40,
            borderBottomLeftRadius: 40,
            overflow: 'hidden',
          }}>
          <View
            style={{
              position: 'absolute',
              height: 50,
              width: '100%',
              backgroundColor: 'rgba(0, 0, 0, 0.8)',              
              top: insets.top,
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              paddingHorizontal: 16,
            }}>
            <View style={styles.topBarIcons}>
              {renderIcons({
                iconName: 'arrow-back-ios',
                onPress: () => {
                  if (capturedImage) {
                    setCapturedImage(null);
                    bottomSheetRef.current?.close();
                  } else {
                    navigation.goBack();
                  }
                },
              })}
              {!capturedImage &&
                renderIcons({
                  iconName: !isTorchOn ? 'flash-on' : 'flash-off',
                  onPress: () => {
                    toggleFlashlight();
                  },
                })}
            </View>
            <Text style={styles.googleLensText}>Google Lens</Text>
            <View style={styles.topBarIcons}>
              {!capturedImage ? (
                renderIcons({
                  iconName: 'restore',
                  onPress: () => {},
                })
              ) : (
                <View></View>
              )}
              {renderIcons({
                iconName: 'more-horiz',
                onPress: () => {},
              })}
            </View>
          </View>

          {!capturedImage ? (
            <>
              {/* Camera View */}
              <Camera
                ref={cameraRef}
                style={StyleSheet.absoluteFill}
                device={backCamera!}
                isActive={true}
                photo={true}
              />
              <TouchableOpacity
                activeOpacity={1}
                style={styles.captureButton}
                onPress={takePicture}>
                <View style={styles.captureButtonView}>
                  <Icon name="search" size={26} color={searchBackgroundColor} />
                </View>
              </TouchableOpacity>
            </>
          ) : (
            <>
              {/* Show Captured Image */}
              <Image
                source={{uri: `file://${capturedImage}`}}
                style={styles.capturedImage}
              />

              {/* Loader for Cropping */}
              {loading && (
                <ActivityIndicator
                  size="large"
                  color="#4285F4"
                  style={styles.loader}
                />
              )}
            </>
          )}
        </View>
        {!capturedImage && (
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-around',
              marginTop: 12,
              paddingHorizontal: 20,
            }}>
            <View style={styles.bottomIconWithText}>
              <Icon
                name={'translate'}
                size={16}
                color={titleBlueColor}
              />
              <Text style={{color: '#fff'}}>Translate</Text>
            </View>
            <View
              style={[
                styles.bottomIconWithText,
                {backgroundColor: lightBlue, borderWidth: 0},
              ]}>
              <Icon
                name={'search'}
                size={20}
                color={titleBlueColor}
              />
              <Text style={{color: '#fff'}}>Search</Text>
            </View>
            <View style={styles.bottomIconWithText}>
              <Icon
                name={'school'}
                size={20}
                color={titleBlueColor}
              />
              <Text style={{color: '#fff'}}>Homework</Text>
            </View>
          </View>
        )}
        {capturedImage && <CustomBottomSheet
          // ref={bottomSheetRef}
          capturedImage={capturedImage}
          navigation={navigation}
        />}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    padding: 36,
    alignItems: 'center',
    backgroundColor: mainBackgroundColor,
  },
  container: {
    flex: 1,
    backgroundColor: mainBackgroundColor,
    color: '#fff',
    zIndex: 7,
    paddingBottom:12
  },
  centeredContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: mainBackgroundColor,
    color: '#fff',
  },
  captureButton: {
    position: 'absolute',
    bottom: 20,
    alignSelf: 'center',
    width: 80, // Set width
    height: 80, // Set height
    borderRadius: 40, // Half of width/height for a perfect circle
    borderWidth: 4,
    borderColor: '#fff',
    justifyContent: 'center', // Center content vertically
    alignItems: 'center', // Center content horizontally
    shadowColor: '#000', // Optional shadow for iOS
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5, // Shadow for Android
  },
  captureButtonView: {
    alignSelf: 'center',
    width: 64, // Set width
    height: 64, // Set height
    borderRadius: 32, // Half of width/height for a perfect circle
    backgroundColor: '#fff',
    justifyContent: 'center', // Center content vertically
    alignItems: 'center', // Center content horizontally
    shadowColor: '#000', // Optional shadow for iOS
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5, // Shadow for Android
  },
  captureText: {
    color: '#fff',
    fontSize: 16,
  },
  googleLensText: {
    flex: 1,
    textAlign: 'center',
    fontSize: 18,
    // fontWeight: 'bold',
    color: '#fff',

    fontFamily: 'Roboto',
    zIndex: 10000,
  },
  topBarIcons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 60,
    zIndex: 9,
  },
  bottomIconWithText: {
    flexDirection: 'row',
    backgroundColor: mainBackgroundColor,
    paddingHorizontal: 14,
    paddingVertical: 5,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: searchBackgroundColor,
    alignItems: 'center',
  },
  capturedImage: {
    flex: 1,
    resizeMode: 'cover',
  },
  loader: {
    marginTop: 20,
  },

  tabBarContainer: {
    height: 38,
    borderBottomWidth: 1,
    borderColor: '#3c4043',
    paddingHorizontal: 16,
    marginTop: 5,
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
  
});

export default LensSearchScreen;
