import React from 'react'
import { FlatList, StyleSheet } from 'react-native'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'

import CategoryGridTile from '../components/CategoryGridTile'
import HeaderButton from '../components/HeaderButton'
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

CategoriesScreen.navigationOptions = navData => {
  return {
    headerTitle: 'Meal Categories',
    headerLeft: () => <HeaderButtons HeaderButtonComponent={HeaderButton}>
      <Item title="Menu" iconName="ios-menu" onPress={() => {
        navData.navigation.toggleDrawer()
      }} />
    </HeaderButtons>
  }
}


const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})


export default CategoriesScreen