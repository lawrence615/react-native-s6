import React from 'react'
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Platform } from 'react-native'
import Colours from '../constants/Colours'

import { CATEGORIES } from '../data/dummy-data'

const CategoriesScreen = props => {

  const renderGridItem = (itemData) => {
    return (
      <TouchableOpacity
        style={styles.gridItem}
        onPress={() => {
          props.navigation.navigate('CategoryMeals')
        }}
      >
        <View><Text>{itemData.item.title}</Text></View>
      </TouchableOpacity>
    )
  }

  return (
    <FlatList
      keyExtractor={(item, index) => item.id}
      data={CATEGORIES}
      renderItem={renderGridItem}
      numColumns={2} />
  )
}

CategoriesScreen.navigationOptions = {
  headerTitle: 'Meal Categories',
  headerStyle: {
    backgroundColor: Platform.OS === 'android' ? Colours.primaryColour : ''
  },
  headerTintColor: Platform.OS === 'android' ? 'white' : Colours.primaryColour
}


const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  gridItem: {
    flex: 1,
    margin: 15,
    height: 150
  }
})


export default CategoriesScreen