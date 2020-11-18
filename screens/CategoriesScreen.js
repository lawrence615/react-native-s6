import React from 'react'
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native'

import CategoryGridTile from '../components/CategoryGridTile'
import { CATEGORIES } from '../data/dummy-data'

const CategoriesScreen = props => {

  const renderGridItem = (itemData) => {
    return <CategoryGridTile
      title={itemData.item.title}
      colour={itemData.item.colour}
      onSelect={() => {
        // props.navigation.navigate('CategoryMeals', {categoryId:itemData.item.id})
        props.navigation.navigate({
          routeName: 'CategoryMeals',
          params: {
            categoryId: itemData.item.id
          }
        })
      }} />
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
  headerTitle: 'Meal Categories'
}


const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})


export default CategoriesScreen