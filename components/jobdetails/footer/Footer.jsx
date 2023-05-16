import React from 'react'
import useFetch from '../../../hook/useFetch'
import { useSearchParams } from 'expo-router'
import { View, Text, TouchableOpacity, Image, Linking, Share } from 'react-native'

import styles from './footer.style'
import { icons } from '../../../constants'

const Footer = ({ url }) => {

  const params = useSearchParams();


  const { data } = useFetch('job-details', {
    job_id: params.id,
  });

  const onShare = () => {
    Share.share({
      message: `Check this job offer: ${data[0]?.job_google_link}`,
    });
  };


  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.likeBtn} onPress={onShare}>
        <Image 
          source={icons.share} 
          resizeMode="contain" 
          style={styles.likeBtnImage}
        />
      </TouchableOpacity>

      <TouchableOpacity style={styles.applyBtn} onPress={() => Linking.openURL(url)}>
        <Text style={styles.applyBtnText}>Apply for job</Text>
      </TouchableOpacity>
    </View>
  )
}

export default Footer