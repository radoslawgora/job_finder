import React, { useRef } from 'react';
import { Text, Animated, TouchableWithoutFeedback, SafeAreaView, StyleSheet, FlatList } from 'react-native';
import { useRouter } from 'expo-router';

import styles from './mobilemenu.styles';

const MobileMenu = ({ offcanvasTranslateX, offcanvasPosition, closeMobileMenu }) => {
  const refContainer = useRef(null);
  const router = useRouter();

  const toggleOffcanvas = () => {
    const toValue = offcanvasPosition === 'closed' ? 0 : -300;
    Animated.timing(offcanvasTranslateX, {
      toValue,
      duration: 300,
      useNativeDriver: true,
    }).start();
    closeMobileMenu();
  };

  const handleContainerPress = () => {
    closeMobileMenu();
  };

  const offcanvasStyles = {
    transform: [
      {
        translateX: offcanvasTranslateX,
      },
    ],
  };

  const menuItems = [
    {
      title: 'Web Developer Jobs',
      route: '/search/web-developer',
    },
    {
        title: 'FrontEnd Developer Jobs',
        route: '/search/frontend-developer',
      },
      {
        title: 'React Developer Jobs',
        route: '/search/react-developer',
      },
      {
        title: 'Vue Developer Jobs',
        route: '/search/vue-developer',
      },
    {
      title: 'Backend Dev Jobs',
      route: '/search/backend-developer',
    },
    {
      title: 'ML Dev Jobs',
      route: '/search/ml-developer',
    },
    {
        title: 'Python Developer Jobs',
        route: '/search/python-developer',
      },
      {
        title: 'Java Developer Jobs',
        route: '/search/java-developer',
      },
  ];

  const renderItem = ({ item }) => (
    <TouchableWithoutFeedback onPress={() => router.push(item.route)}>
      <Text style={styles.menuItem}>{item.title}</Text>
    </TouchableWithoutFeedback>
  );

  return (
    <TouchableWithoutFeedback onPress={handleContainerPress}>
      <Animated.View style={[styles.offcanvas, offcanvasStyles]} ref={refContainer}>
        <SafeAreaView style={styles.container}>
          <Text style={styles.title}>Find your job as</Text>
          <FlatList
            data={menuItems}
            renderItem={renderItem}
            keyExtractor={(item) => item.route}
            contentContainerStyle={styles.menuList}
          />
        </SafeAreaView>
      </Animated.View>
    </TouchableWithoutFeedback>
  );
};

export default MobileMenu;
