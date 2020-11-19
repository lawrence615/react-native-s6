import React from 'react'
import { Platform } from 'react-native'
import { exp } from 'react-native/Libraries/Animated/src/Easing'
import { createStackNavigator } from 'react-navigation-stack'
import { createAppContainer } from 'react-navigation'
import { createBottomTabNavigator } from 'react-navigation-tabs'
import { Ionicons } from '@expo/vector-icons'
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs'

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

const tabScreenConfig = {
  Meals: {
    screen: MealsNavigator,
    navigationOptions: {
      tabBarIcon: (tabInfo) => {
        return <Ionicons name='ios-restaurant' size={25} color={tabInfo.tintColor} />
      },
      tabBarColor: Colours.primaryColour
    }
  },
  Favourites: {
    screen: FavouritesScreen,
    navigationOptions: {
      tabBarLabel: 'Favourites!',
      tabBarIcon: (tabInfo) => {
        return <Ionicons name='ios-star' size={25} color={tabInfo.tintColor} />
      },
      tabBarColor: Colours.accentColour
    }
  }
}

const MealsFavTabNavigator = Platform.OS === 'android'
  ? createMaterialBottomTabNavigator(tabScreenConfig, {
    activeColor: 'white',
    shifting: true,
    // barStyle: {
    //   backgroundColor: Colours.primaryColour
    // }
  })
  : createBottomTabNavigator(tabScreenConfig, {
    tabBarOptions: {
      activeTintColor: Colours.accentColour
    }
  })

export default createAppContainer(MealsFavTabNavigator)