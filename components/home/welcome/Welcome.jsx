import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, FlatList, Share } from 'react-native';
import { useRouter } from 'expo-router';

import styles from './welcome.style';
import { icons, SIZES } from '../../../constants';

const jobTypes = ["Full-time", "Part-time", "Contractor", "Freelance contract", "B2B"]

const Welcome = ({ searchTerm, setSearchTerm, handleClick }) => {
  const router = useRouter();
  const [activeJobType, setActiveJobType] = useState('Full-time')

  const onShare = () => {
    Share.share({
      message: `Check this job offer: ${data[0]?.job_google_link}`,
    });
  };

  return (
    <View>
      <View style={styles.container}>
        <Text style={styles.userName}>Hello!</Text>
        <Text style={styles.welcomeMessage}>Find the perfect job for you</Text>
      </View>

      <View style={styles.searchContainer}>
        <View style={styles.searchWrapper}>
          <TextInput 
            style={styles.searchInput}
            value={searchTerm}
            onChangeText={(text) => setSearchTerm(text)} 
            placeholder='What kind of job are you looking for?'
            />
        </View>

        <TouchableOpacity style={styles.searchBtn} onPress={handleClick}>
          <Image
            source={icons.search}
            resizeMode='contain'
            style={styles.searchBtnImage}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.tabsContainer}>
        <FlatList 
          data={jobTypes}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.tab(activeJobType, item)}
              onPress={() => {
                setActiveJobType(item);
                router.push(`/search/${item}`)
              }}
            >
              <Text style={styles.tabText(activeJobType, item)}>{item}</Text>
            </TouchableOpacity>
          )}
          keyExtractor={item => item}
          contentContainerStyle={{ columnGap: SIZES.small }}
          horizontal
        />
      </View>
    </View>
  )
}

export default Welcome