import { SafeAreaView, View, Image, Text, TextInput, ScrollView } from 'react-native'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { 
  UserIcon,
  ChevronDownIcon,
  AdjustmentsVerticalIcon,
  MagnifyingGlassIcon
 } from "react-native-heroicons/outline";
import Categories from '../components/Categories';
import FeaturedRow from '../components/FeaturedRow';
import sanityClient from '../sanity';
import { homePageQuery } from '../queries';
import { isAndroid } from 'react-native-device-detection'

const HomeScreen = () => {
  const navigation = useNavigation()
  const [featuredCategories, setFeaturedCategories] = useState([])

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false
    })
  }, [])

  useEffect(() => {
    sanityClient.fetch(homePageQuery)
      .then(data => setFeaturedCategories(data))
  }, [])

  return (
    <SafeAreaView className={`bg-white ${isAndroid ? "pt-12" : "pt-5"}`}>  
      <View className="flex-row pb-3 items-center mx-4 space-x-2">
        <Image 
          source={{
            uri: 'https://raw.githubusercontent.com/AdasKwoka/foodly/main/images/foodly-logo.png'
          }}
          className='h-7 w-7 bg-gray-300 p-4 rounded-full'
        />
        <View className="flex-1">
          <Text className="font-bold text-gray-400 text-xs">Deliver now!</Text>
          <Text className="font-bold text-xl">
            Current location
            <ChevronDownIcon size={20} color="#00CCBB" />
          </Text>
        </View>
        <UserIcon size={35} color="#00CCBB" />
      </View>

      <View className="flex-row items-center space-x-2 pb-2 mx-4">
        <View className="flex-row flex-1 space-x-2 bg-gray-200 p-3">
          <MagnifyingGlassIcon color="gray" size={20} />
          <TextInput placeholder='Restaurants and cuisines' keyboardType='default'/>
        </View>
        <AdjustmentsVerticalIcon color="#00CCBB"/>
      </View>

      <ScrollView className="bg-gray-100">
        <Categories />
        {featuredCategories?.map(featureCategory => (
          <FeaturedRow
            id={featureCategory._id}
            key={featureCategory._id}
            title={featureCategory.name}
            description={featureCategory.short_description}
          />
        ))}
        <View className="pb-28"></View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default HomeScreen