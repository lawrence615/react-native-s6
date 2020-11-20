import React from 'react'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'

import { CATEGORIES, MEALS } from '../data/dummy-data'
import HeaderButton from '../components/HeaderButton'
import MealList from '../components/MealList'


const FavouritesScreen = props => {
  const favMeals = MEALS.filter(meal => meal.id === 'm1' || meal.id === 'm2')

  return <MealList listData={favMeals} navigation={props.navigation} />
}

FavouritesScreen.navigationOptions = navData => {
  return {
    headerTitle: 'Your Favourites',
    headerLeft: () => <HeaderButtons HeaderButtonComponent={HeaderButton}>
      <Item title="Menu" iconName="ios-menu" onPress={() => {
        navData.navigation.toggleDrawer()
      }} />
    </HeaderButtons>
  }
}

export default FavouritesScreen