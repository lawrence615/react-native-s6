import React, { useState, useEffect, useCallback } from 'react'
import { View, Text, StyleSheet, Switch, Platform } from 'react-native'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import { useDispatch } from 'react-redux'

import HeaderButton from '../components/HeaderButton'
import Colours from '../constants/Colours'
import { setFilters } from '../store/actions/meals'

const FilterChange = props => {
  return (
    <View style={styles.filterContainer}>
      <Text>{props.label}</Text>
      <Switch
        trackColor={{ true: Colours.primaryColour }}
        thumbColor={Platform.OS === 'android' ? Colours.primaryColour : ''}
        value={props.state}
        onValueChange={props.onChange}
      />
    </View>
  )
}

const FiltersScreen = props => {

  const { navigation } = props

  const [isGlutenFree, setIsGlutenFree] = useState(false)
  const [isLactoseFree, setIsLactoseFree] = useState(false)
  const [isVegan, setIsVegan] = useState(false)
  const [isVegetarian, setIsVegetarian] = useState(false)

  const dispatch = useDispatch()

  const saveFilters = useCallback(() => {
    const appliedFilters = {
      glutenFree: isGlutenFree,
      lactoseFree: isLactoseFree,
      vegan: isVegan,
      vegetarian: isVegetarian
    }

    dispatch(setFilters(appliedFilters))
  }, [isGlutenFree, isLactoseFree, isVegan, isVegetarian])

  useEffect(() => {
    navigation.setParams({ save: saveFilters })
  }, [saveFilters])

  return (
    <View style={styles.screen}>
      <Text style={styles.title}>Available Filters / Restrictions</Text>
      <FilterChange label='Gluten-free' state={isGlutenFree} onChange={newValue => setIsGlutenFree(newValue)} />
      <FilterChange label='Lactose-free' state={isLactoseFree} onChange={newValue => setIsLactoseFree(newValue)} />
      <FilterChange label='Vegan' state={isVegan} onChange={newValue => setIsVegan(newValue)} />
      <FilterChange label='Vegetarian' state={isVegetarian} onChange={newValue => setIsVegetarian(newValue)} />
    </View>
  )
}

FiltersScreen.navigationOptions = navData => {
  return {
    headerTitle: 'Filter Meals',
    headerLeft: () => <HeaderButtons HeaderButtonComponent={HeaderButton}>
      <Item title="Menu" iconName="ios-menu" onPress={() => {
        navData.navigation.toggleDrawer()
      }} />
    </HeaderButtons>,
    headerRight: () => <HeaderButtons HeaderButtonComponent={HeaderButton}>
      <Item title="Save" iconName="ios-save" onPress={navData.navigation.getParam('save')} />
    </HeaderButtons>
  }
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: 'center'
  },
  title: {
    fontFamily: 'open-sans-bold',
    fontSize: 22,
    margin: 20,
    textAlign: 'center'
  },
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '80%',
    marginVertical: 15
  }
})


export default FiltersScreen