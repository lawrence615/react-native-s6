import React from 'react'
import { Platform } from 'react-native'
import { exp } from 'react-native/Libraries/Animated/src/Easing'
import { createStackNavigator } from 'react-navigation-stack'
import { createAppContainer } from 'react-navigation'
import { createBottomTabNavigator } from 'react-navigation-tabs'
import { Ionicons } from '@expo/vector-icons'

import CategoriesScreen from '../screens/CategoriesScreen'
import CategoryMealsScreen from '../screens/CategoryMealsScreen'
import MealDetailScreen from '../screens/MealDetailScreen'
import FavouritesScreen from '../screens/FavouritesScreen'

import Colours from '../constants/Colours'


const MealsNavigator = createStackNavigator({
  Categories: {
    screen: CategoriesScreen
  },
  CategoryMeals: {
    screen: CategoryMealsScreen,
  },
  MealDetail: MealDetailScreen
}, {
  // mode:'modal', // shows on ios
  // initialRouteName:'MealDetail',
  defaultNavigationOptions: {
    headerStyle: {
      backgroundColor: Platform.OS === 'android' ? Colours.primaryColour : ''
    },
    headerTintColor: Platform.OS === 'android' ? 'white' : Colours.primaryColour,
    headerTitle: 'A Screen'
  }
})

const MealsFavTabNavigator = createBottomTabNavigator({
  Meals: {
    screen: MealsNavigator,
    navigationOptions: {
      tabBarIcon: (tabInfo) => {
        return <Ionicons name='ios-restaurant' size={25} color={tabInfo.tintColor} />
      }
    }
  },
  Favourites: {
    screen: FavouritesScreen,
    navigationOptions: {
      tabBarLabel:'Favourites!', 
      tabBarIcon: (tabInfo) => {
        return <Ionicons name='ios-star' size={25} color={tabInfo.tintColor} />
      }
    }
  }
}, {
  tabBarOptions: {
    activeTintColor: Colours.accentColour
  }
})

export default createAppContainer(MealsFavTabNavigator)