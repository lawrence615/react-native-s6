import React, { useEffect, useCallback } from 'react'
import { ScrollView, View, Image, Text, StyleSheet } from 'react-native'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import { useSelector, useDispatch } from 'react-redux'

import HeaderButton from '../components/HeaderButton'
import DefaultText from '../components/DefaultText'
import { toggleFavourite } from '../store/actions/meals'

const ListItem = props => {
  return <View style={styles.listItem}>
    <DefaultText>{props.children}</DefaultText>
  </View>
}


const MealDetailScreen = props => {
  const mealId = props.navigation.getParam('mealId') // get mealId from param

  const availableMeals = useSelector(state => state.meals.meals) // fetching all meals

  // check whether the current meal has been marked as favourite
  const currentMealIsFavourite = useSelector(state =>
    state.meals.favouriteMeals.some(meal => meal.id === mealId)
  )

  const selectedMeal = availableMeals.find(meal => meal.id === mealId) // retrieve the meal from the li

  const dispatch = useDispatch()

  const toggleFavouriteHandler = useCallback(() => {
    dispatch(toggleFavourite(mealId))
  }, [dispatch, mealId])

  useEffect(() => {
    props.navigation.setParams({ toggleFav: toggleFavouriteHandler })
  }, [toggleFavouriteHandler])

  useEffect(() => {
    props.navigation.setParams({ isFav: currentMealIsFavourite })
  }, [currentMealIsFavourite])


  console.log('mealId', mealId)
  console.log('selectedMeal', selectedMeal)

  return (
    <ScrollView>
      <Image source={{ uri: selectedMeal.imageUrl }} style={styles.image} />
      <View style={styles.details}>
        <DefaultText>{selectedMeal.duration}m</DefaultText>
        <DefaultText>{selectedMeal.complexity.toUpperCase()}</DefaultText>
        <DefaultText>{selectedMeal.affordability.toUpperCase()}</DefaultText>
      </View>
      <Text style={styles.title}>Ingredients</Text>
      {selectedMeal.ingredients.map(ingredient => (
        <ListItem key={ingredient}>{ingredient}</ListItem>
      ))}
      <Text style={styles.title}>Steps</Text>
      {selectedMeal.steps.map(step => (
        <ListItem key={step}>{step}</ListItem>
      ))}
    </ScrollView>
  )
}

MealDetailScreen.navigationOptions = (navigationData) => {
  // const mealId = navigationData.navigation.getParam('mealId')
  const mealTitle = navigationData.navigation.getParam('mealTitle')
  const toggleFavourite = navigationData.navigation.getParam('toggleFav')
  const isFavourite = navigationData.navigation.getParam('isFav')
  // const selectedMeal = MEALS.find(meal => meal.id === mealId)
  // console.log('mealId', mealId)
  // console.log('selectedMeal', selectedMeal)
  console.log('mealTitle', mealTitle)
  return {
    headerTitle: mealTitle,
    headerRight: () => <HeaderButtons HeaderButtonComponent={HeaderButton}>
      <Item
        title='Favourite'
        iconName={isFavourite ? 'ios-star' : 'ios-star-outline'}
        onPress={toggleFavourite}
      />
    </HeaderButtons>
  }
}


const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: 200
  },
  details: {
    flexDirection: 'row',
    padding: 15,
    justifyContent: 'space-around'
  },
  title: {
    fontFamily: 'open-sans-bold',
    fontSize: 22,
    textAlign: 'center'
  },
  listItem: {
    marginVertical: 5,
    marginHorizontal: 20,
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 10
  }
})


export default MealDetailScreen