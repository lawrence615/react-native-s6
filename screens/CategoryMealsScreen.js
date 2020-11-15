import React from 'react'
import { View, Text, Button, StyleSheet } from 'react-native'


const CategoryMealsScreen = props => {
  return (
    <View style={styles.screen}>
      <Text>The Category Meal Screen</Text>
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