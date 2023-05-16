import { useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';

import styles from './popularjobs.style';
import { COLORS, SIZES } from '../../../constants';
import PopularJobsCard from '../../common/cards/popular/PopularJobCard';
import { isLoading } from 'expo-font';
import PopularJobCard from '../../common/cards/popular/PopularJobCard';
import useFetch from '../../../hook/useFetch';

const Popularjobs = () => {
  const router = useRouter();

  const { data, isLoading, error } = useFetch('search', {
    query: 'Developer',
    num_pages: 1
  });

  const [selectedJob, setSelectedJob] = useState();

  const handleCardPress = (item) => {
    router.push(`/job-details/${item.job_id}`);
    setSelectedJob(item.job_id);
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Popular jobs</Text>
      </View>

      <View style={styles.cardsContainer}>
        {isLoading ? (
          <ActivityIndicator size="large" colors={COLORS.primary} />   
        ) : error ? (
          <Text>Something went wrong</Text>
        ) : (
          <FlatList 
            data={data}
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => (
              <PopularJobCard 
                item={item}
                handleCardPress={handleCardPress}
              />
            )} 
            keyExtractor={item => item?.job_id}
            contentContainerStyle={{  columnGap: SIZES.medium }}
            horizontal 
            />
        )}
      </View>
    </View>
  )
}

export default Popularjobs