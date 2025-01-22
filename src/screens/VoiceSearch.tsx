import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  ActivityIndicator,
  StatusBar,
  Image,
} from 'react-native';
import Voice from '@react-native-voice/voice';
import {mainBackgroundColor, searchBackgroundColor} from '../constant';
import Icon from 'react-native-vector-icons/Ionicons';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {GoogleSearch} from '../navigation/ScreenNameConstant';

const VoiceSearchScreen = ({navigation}: any) => {
  const [isListening, setIsListening] = useState(false); // State to handle mic listening
  const [speechText, setSpeechText] = useState(''); // Recognized text
  const [modalVisible, setModalVisible] = useState(false); // State for modal visibility
  const insets = useSafeAreaInsets();
  const [infoText, setInfoText] = useState('Tap the mic.');
  const [isRecognizing, setIsRecognizing] = useState(false);

  

  useEffect(() => {
    startListening();
  }, []);
  // Start speech recognition
  const startListening = async () => {
    try {
      setInfoText('Listening...');
      setSpeechText('');
      setIsListening(true);
      //   setModalVisible(true); // Show the modal

      // Start voice recognition
      await Voice.start('en-US');
      setIsRecognizing(true);
    } catch (error) {
      setInfoText('Tap the mic.');
      console.error('Error starting voice recognition:', error);
      setIsListening(false);
      //   setModalVisible(false); // Hide modal if there's an error
    }
  };

  // Stop listening
  const stopListening = async (text?:any) => {
    try {
      setIsListening(false);
      await Voice.stop(); // Stop recognition
      setIsRecognizing(false);
      setInfoText('Tap the mic.');
  
      if (text.trim()) {
        console.log('Navigating with speech:', text);
        navigation.navigate(GoogleSearch, { text }); // Navigate with speech text
        Voice.destroy()
      } else {
        console.log('No recognized speech to navigate with.');
      }
    } catch (error) {
      console.error('Error stopping voice recognition:', error);
      setIsRecognizing(false);
    }
  };

  //   Handle speech results
  Voice.onSpeechResults = (event:any) => {
    if (event.value) {
      setSpeechText(event.value[0]); // Save recognized text
      console.log('Recognized Speech:', event.value);
  
      // Stop listening after a delay
      setTimeout(() => {
        stopListening(event?.value[0]);
      }, 5000); // Delay for a smoother user experience
    }
  };

  //   Handle speech errors
  Voice.onSpeechError = error => {
    console.error('Speech recognition error:', error);
    setIsRecognizing(false);
    stopListening();
  };

  // Cleanup event listeners when the component unmounts
  useEffect(() => {
    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar hidden></StatusBar>
      <View style={[styles.topBar, {top: insets.top}]}>
        <TouchableOpacity
          style={styles.icon}
          onPress={() => {
            navigation.goBack();
            Voice.destroy()
          }}>
          <Icon
            name="chevron-back-outline"
            size={20}
            color="#9b9fa2"
            // marginLeft={10}
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.icon}
          onPress={() => {
            // navigation.goBack();
          }}>
          <Icon
            name="globe-outline"
            size={20}
            color="#9b9fa2"
            // marginLeft={10}
          />
        </TouchableOpacity>
      </View>

      <Text
        style={{
          position: 'absolute',
          top: '30%',
          color: '#d0d2d6',
          fontSize: 20,
          fontWeight: '400',
        }}>
        {speechText || infoText}
      </Text>
      {/* Main screen */}
      <TouchableOpacity
        style={styles.micButton}
        onPress={()=>{
            if(isRecognizing){
                stopListening()
            }else{
                startListening()
            }
        }} // Start listening on mic press
      >
        <Image
          source={require('../../assets/images/google-voice.png')}
          style={{height: 30, width: 30}}
        />
        {/* <Text style={styles.micText}>🎤 Tap to Speak</Text> */}
      </TouchableOpacity>

      {/* Modal for Listening */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={stopListening} // Stop listening on modal close
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.listeningText}>
              {isListening ? 'Listening...' : 'Processing...'}
            </Text>
            {isListening && (
              <ActivityIndicator
                size="large"
                color="#4285F4"
                style={{margin: 20}}
              />
            )}
            <Text style={styles.speechText}>
              {speechText || 'Speak now and we’ll transcribe your words!'}
            </Text>

            <TouchableOpacity
              style={styles.closeButton}
              onPress={stopListening}>
              <Text style={styles.closeButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: searchBackgroundColor,
  },
  topBar: {
    position: 'absolute',
    width: '100%',
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  icon: {
    backgroundColor: '#444746',
    padding: 10,
    borderRadius: 20,
    alignItems: 'center', // Center horizontally
    justifyContent: 'center',
  },
  micButton: {
    backgroundColor: searchBackgroundColor,
    padding: 15,
    borderRadius: 26,
    // Shadow for iOS
    shadowColor: 'black',
    //   shadowOffset: { width: 10, height: 10 }, // No offset for equal shadow
    shadowOpacity: 0.3, // Adjust shadow transparency
    shadowRadius: 5, // Blur radius for softness

    // Shadow for Android
    elevation: 5, // Adjust elevation for equal shadow
  },
  micText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  modalContent: {
    backgroundColor: '#fff',
    width: '80%',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  listeningText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  speechText: {
    fontSize: 16,
    color: '#666',
    marginTop: 10,
    textAlign: 'center',
  },
  closeButton: {
    marginTop: 20,
    backgroundColor: '#f44336',
    padding: 10,
    borderRadius: 8,
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default VoiceSearchScreen;
