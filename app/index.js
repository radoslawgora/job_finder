import React, { useState, useRef } from 'react';
import {
  View,
  ScrollView,
  Text,
  SafeAreaView,
  Alert,
  Animated,
  TouchableWithoutFeedback,
} from 'react-native';
import { Stack, useRouter } from 'expo-router';

import { COLORS, icons, images, SIZES } from '../constants';
import {
  Nearbyjobs,
  Popularjobs,
  ScreenHeaderBtn,
  Welcome,
} from '../components';
import MobileMenu from '../components/common/mobileMenu/MobileMenu';

const Home = () => {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');
  const [offcanvasPosition, setOffcanvasPosition] = useState('closed');
  const offcanvasTranslateX = useRef(new Animated.Value(-300)).current;

  const aboutAppModal = () =>
    Alert.alert('About', 'Job Search Portal v1 by rgora.pl', [
      { text: 'OK', onPress: () => console.log('OK Pressed') },
    ]);

  const toggleOffcanvas = () => {
    const toValue = offcanvasPosition === 'closed' ? 0 : -300;
    Animated.timing(offcanvasTranslateX, {
      toValue,
      duration: 300,
      useNativeDriver: true,
    }).start();
    setOffcanvasPosition(offcanvasPosition === 'closed' ? 'open' : 'closed');
  };

  const closeMobileMenu = () => {
    Animated.timing(offcanvasTranslateX, {
      toValue: -300,
      duration: 300,
      useNativeDriver: true,
    }).start();
    setOffcanvasPosition('closed');
  };

  return (
    <TouchableWithoutFeedback onPress={closeMobileMenu}>
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: COLORS.lightWhite,
          padding: SIZES.small,
        }}
      >
        <MobileMenu
          offcanvasTranslateX={offcanvasTranslateX}
          offcanvasPosition={offcanvasPosition}
          closeMobileMenu={closeMobileMenu}
        />

        <Stack.Screen
          options={{
            headerStyle: { backgroundColor: COLORS.lightWhite },
            headerShadowVisible: false,
            headerLeft: () => (
              <ScreenHeaderBtn
                iconUrl={icons.menu}
                dimension='60%'
                handlePress={toggleOffcanvas}
              />
            ),
            headerRight: () => (
              <ScreenHeaderBtn
                iconUrl={icons.questionMark}
                dimension='60%'
                handlePress={aboutAppModal}
              />
            ),
            headerTitle: 'Job Finder App',
            headerTitleAlign: 'center',
          }}
        />

        <ScrollView showsVerticalScrollIndicator={false}>
          <Welcome
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            handleClick={() => {
              if (searchTerm) {
                router.push(`/search/${searchTerm}`);
              }
            }}
          />
          <Popularjobs />
          <Nearbyjobs />
        </ScrollView>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

export default Home;
