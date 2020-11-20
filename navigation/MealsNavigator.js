import React from 'react'
import { Platform } from 'react-native'
import { exp } from 'react-native/Libraries/Animated/src/Easing'
import { createStackNavigator } from 'react-navigation-stack'
import { createAppContainer, createSwitchNavigator } from 'react-navigation'
import { createBottomTabNavigator } from 'react-navigation-tabs'
import { Ionicons } from '@expo/vector-icons'
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs'
import { createDrawerNavigator } from 'react-navigation-drawer'

import CategoriesScreen from '../screens/CategoriesScreen'
import CategoryMealsScreen from '../screens/CategoryMealsScreen'
import MealDetailScreen from '../screens/MealDetailScreen'
import FavouritesScreen from '../screens/FavouritesScreen'
import FilterssScreen from '../screens/FiltersScreen'

import Colours from '../constants/Colours'

const defaultStackNavOptions = {
  headerStyle: {
    backgroundColor: Platform.OS === 'android' ? Colours.primaryColour : ''
  },
  headerTintColor: Platform.OS === 'android' ? 'white' : Colours.primaryColour,
  headerTitle: 'A Screen'
}
const MealsNavigator = createStackNavigator({
  Categories: {
    screen: CategoriesScreen
  },
  CategoryMeals: {
    screen: CategoryMealsScreen,
  },
  MealDetail: MealDetailScreen
}, {
  defaultNavigationOptions: defaultStackNavOptions
})

const FavNavigator = createStackNavigator({
  Favs: FavouritesScreen,
  MealDetail: MealDetailScreen
}, {
  defaultNavigationOptions: defaultStackNavOptions
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
    screen: FavNavigator,
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
    shifting: true
  })
  : createBottomTabNavigator(tabScreenConfig, {
    tabBarOptions: {
      activeTintColor: Colours.accentColour
    }
  })

const FiltersNavigator = createStackNavigator({
  Filters: FilterssScreen
},
  {
    // navigationOptions: {
    //   drawerLabel: 'Filters!!!'
    // },
    defaultNavigationOptions: defaultStackNavOptions
  }
)

const MainNavigator = createDrawerNavigator({
  MealsFavs: { screen: MealsFavTabNavigator, navigationOptions: { drawerLabel: 'Meals' } },
  Filters: FiltersNavigator
},
  {
    contentOptions: {
      activeTintColor: Colours.accentColour,
      labelStyle: {
        fontFamily: 'open-sans-bold'
      }
    }
  }
)

export default createAppContainer(MainNavigator)