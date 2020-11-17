import React from 'react'
import { View, Text, Button, StyleSheet } from 'react-native'

import { CATEGORIES } from '../data/dummy-data'


const CategoryMealsScreen = props => {

  const catId = props.navigation.getParam('categoryId')

  const selectedCategory = CATEGORIES.find(cat => cat.id === catId)

  return (
    <View style={styles.screen}>
      <Text>The Category Meal Screen</Text>
      <Text>{selectedCategory.title}</Text>
      <View style={styles.navButtonsContainer}>
        <Button title="Meal Detail Screen" onPress={() => {
          props.navigation.navigate('MealDetail')
        }} />
        <Button title="Go Back" onPress={() => {
          // props.navigation.goBack()
          props.navigation.pop()
        }} />
      </View>
    </View>
  )
}

CategoryMealsScreen.navigationOptions = (navigationData) => {
  const catId = navigationData.navigation.getParam('categoryId')
  const selectedCategory = CATEGORIES.find(cat => cat.id === catId)

  return {
    headerTitle: selectedCategory.title
  }
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  navButtonsContainer: {
    marginVertical: 5
  }
})


export default CategoryMealsScreen