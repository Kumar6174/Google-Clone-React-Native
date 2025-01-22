
# GoogleClone

> GoogleClone is a React Native application inspired by Google's app, offering features like trending search, search suggestions, text search, and voice search (currently working only on iOS). The app is designed with a modern UI and is being actively developed to include more features.

## Screenshots


<img src="https://github.com/user-attachments/assets/0aac3d0e-6a83-4d19-ba2c-4326965a18de" height=450 width=200 />
<img src="https://github.com/user-attachments/assets/b4c1b16f-62b0-4d2a-8b13-f8a1f2ed7b63" height=450 width=200 />
<img src="https://github.com/user-attachments/assets/13d880c3-0749-4765-8a05-94df2acba7c6" height=450 width=200 />
<img src="https://github.com/user-attachments/assets/3c1b816d-2af1-4e86-9d14-535cecbcfb59" height=450 width=200 />
<img src="https://github.com/user-attachments/assets/2ad721e0-37a4-480d-b96a-08955f14efbf" height=450 width=200 />



## Current Working Features

#### ✅ Trending Search
>##### Displays trending search topics fetched from a mock API or integrated data.
>##### Interactive UI for quick navigation to trending topics.

#### ✅ Search Suggestions
>##### Provides real-time suggestions as users type in the search bar.
>##### Suggestions are fetched dynamically based on the query.

#### ✅ Search Text
>##### Fully functional text-based search feature.
>##### Navigate to results after entering your query.

#### ✅ Voice Search (iOS Only)
>##### Real-time speech-to-text conversion.
>##### Automatically processes the voice input and navigates to search results.
>##### Integrated using react-native-voice.

## Planned Features
##### -Google Lens-like Image Search: Capture or upload images and perform visual searches.
##### -Shortcut Buttons: One-tap access to translation, weather, and shopping features.
##### -News Section: Display the latest news fetched from APIs.
##### -Cross-Platform Voice Search: Extend voice search functionality to Android.

## Tech Stack
#### Frontend
>#### React Native: Framework for building the mobile app.
>#### React Navigation: Seamless screen navigation.
>#### Redux: State management.
>#### react-native-vector-icons: Scalable and customizable icons.

#### Backend
>#### SeraApi 
>#### Google Api

## Steps to Install
#### Clone the repository:
```bash
git clone https://github.com/Kumar6174/googleclone.git
```

#### Install dependencies:
```bash
npm install
#OR
yarn install
```

#### Install CocoaPods for iOS:
```bash
cd ios
pod install
```

#### Run the app:

>#### Android: 
```bash
npx react-native run-android
```
>#### iOS: 
```bash
npx react-native run-ios
```

## Project Structure

```bash
googleclone/
├── src/
│   ├── components/      # Reusable UI components
│   ├── navigation/      # Navigation configurations
│   ├── redux/           # State management
│   ├── screens/         # App screens (Home, Voice Search, etc.)
│   ├── assets/          # Images and fonts
│   ├── constant.js      # Global constants
├── App.js               # Entry point
├── package.json         # Dependencies and scripts
└── README.md            # Project documentation
```


## Dependencies
>#### react-native: Framework for building the mobile app.
>#### redux: State management.
>#### react-native-voice: Speech recognition integration.
>#### react-native-vector-icons: For icons.
>#### @gorhom/bottom-sheet: For bottom sheet UI.

>#### react-native-vector-icons: Scalable and customizable icons.


First, you will need to start **Metro**, the JavaScript _bundler_ that ships _with_ React Native.

To start Metro, run the following command from the _root_ of your React Native project:

```bash
# using npm
npm start

# OR using Yarn
yarn start
```

## Step 2: Start your Application

Let Metro Bundler run in its _own_ terminal. Open a _new_ terminal from the _root_ of your React Native project. Run the following command to start your _Android_ or _iOS_ app:

### For Android

```bash
# using npm
npm run android

# OR using Yarn
yarn android
```

### For iOS

```bash
# using npm
npm run ios

# OR using Yarn
yarn ios
```


- [React Native Website](https://reactnative.dev) - learn more about React Native.
- [Getting Started](https://reactnative.dev/docs/environment-setup) - an **overview** of React Native and how setup your environment.
- [Learn the Basics](https://reactnative.dev/docs/getting-started) - a **guided tour** of the React Native **basics**.
- [Blog](https://reactnative.dev/blog) - read the latest official React Native **Blog** posts.
- [`@facebook/react-native`](https://github.com/facebook/react-native) - the Open Source; GitHub **repository** for React Native.
