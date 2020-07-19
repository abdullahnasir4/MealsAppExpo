import React from 'react';
import {CATEGORIES} from '../data/dummy-data';
import {useSelector} from 'react-redux';
import MealList from '../components/MealList';
import { View, StyleSheet } from 'react-native';
import DefaultText from '../components/DefaultText';

const CategoryMealsScreen = props => {
    const catId = props.navigation.getParam('CategoryId');

    const availableMeals = useSelector(state => state.meals.filteredMeals);

const displayedMeals = availableMeals.filter(
    meal => meal.categoryIds.indexOf(catId) >= 0
);

if(displayedMeals.length === 0) {
    return (
    <View style={styles.content}>
        <DefaultText>No meals found, check your filters?</DefaultText>
    </View>
    );
}

    return <MealList MealList={displayedMeals} navigation={props.navigation}/>;
}

CategoryMealsScreen.navigationOptions = navigationData => {
    const catId = props.navigation.getParam('CategoryId');
    const selectedCategory = CATEGORIES.find(cat => cat.id === catId);

    return {
        headerTitle: selectedCategory.title
    };
};

const styles = StyleSheet.create({
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default CategoryMealsScreen;