import React from 'react'
import { View, FlatList, StyleSheet } from 'react-native'
import { useSelector } from 'react-redux'

import MealItem from './MealItem'

const MealList = props => {

  const favouriteMeals = useSelector(state => state.meals.favouriteMeals) // fetching all favourite meals

  const renderMealItem = itemData => {

    const isFavourite = favouriteMeals.some(meal => meal.id === itemData.item.id)

    return (
      <MealItem
        title={itemData.item.title}
        duration={itemData.item.duration}
        complexity={itemData.item.complexity}
        affordability={itemData.item.affordability}
        image={itemData.item.imageUrl}
        onSelectMeal={() => {
          props.navigation.navigate('MealDetail', {
            mealId: itemData.item.id,
            mealTitle: itemData.item.title,
            isFav: isFavourite
          })
        }}
      />
    )
  }


  return (
    <View style={styles.list}>
      <FlatList
        data={props.listData}
        keyExtractor={(item, index) => item.id}
        renderItem={renderMealItem}
        style={styles.mealsList} />
    </View>
  )
}

const styles = StyleSheet.create({
  list: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingRight: 5,
    paddingLeft: 5
  }
})

export default MealList