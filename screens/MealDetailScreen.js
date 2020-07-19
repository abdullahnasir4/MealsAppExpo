import React, {useEffect, useCallback} from 'react';
import {Text, View, StyleSheet, ScrollView, Image} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {HeaderButtons, Item} from 'react-navigation-header-buttons';
import HeaderButton from '../components/HeaderButton';
import DefaultText from '../components/DefaultText';
import { toggleFavourite } from '../store/actions/meals';

const ListItem = props => {
    <View style={styles.listItem}>
        <DefaultText>
            {props.children}
        </DefaultText>
    </View>
}

const MealDetailScreen = props => {

const availableMeals = useSelector(state => state.meals.meals);
const currentMealsISFavourite = useSelector(
    state => state.meals.favouriteMeals.some(meal => meal.id === mealId));
const mealId = props.navigation.getParam('mealId')
    
    const selectedMeal = availableMeals.find(meal => meal.id === mealId);

    const dispatch = useDispatch();

    const toggleFavouriteHandler = useCallback(() => {
        dispatch(toggleFavourite(mealId));
    },[dispatch, mealId]);

     useEffect(() => {
    //     props.navigation.setParams({mealTitle: selectedMeal.title});
         props.navigation.setParams({toggleFav: toggleFavouriteHandler});
     }, [toggleFavouriteHandler]);

     useEffect(() => {
         props.navigation.setParams({isFav: currentMealsISFavourite})
     },[currentMealsISFavourite]);

    return (
        <ScrollView>
        <Image source={{uri: selectedMeal.imageUrl}} style={styles.image} />
        <View style={styles.details}>
        <DefaultText>{selectedMeal.duration}m</DefaultText>
        <DefaultText>{selectedMeal.complexity.toUpperCase()}</DefaultText>
        <DefaultText>{selectedMeal.affordability.toUpperCase()}</DefaultText>
        </View>
        <Text style={styles.title}>Ingredients</Text>
        {selectedMeal.ingredients.map(
            ingredient => <ListItem key={ingredient}>
            {ingredient}
            </ListItem>)}
        <Text style={styles.title}>Steps</Text>
        {selectedMeal.steps.map(
            step => <ListItem key={step}>
            {step}
            </ListItem>)}
        </ScrollView>
    );
}

MealDetailScreen.navigationOption = (navigationData) => {
    navigationData.navigation.getParam('mealId');
    const mealTitle = navigationData.navigation.getParam('mealTitle');
    const toggleFavourite = navigationData.navigation.getParam('toggleFav');
    const isFavourite = navigationData.navigation.getParam('isFav');
    //const selectedMeal = MEALS.find(meal => meal.id === mealId)
    return {
        headerTitle: mealTitle,
        headerRight: (
        <HeaderButtons HeaderButtonComponent={HeaderButton}>
            <Item 
            title='Favourite' 
            iconName={isFavourite ? 'ios-star' : 'ios-star-outline'} 
            onPress={toggleFavourite} />
        </HeaderButtons>
        )
    };
};

const styles = StyleSheet.create({
    image: {
        width: '100%',
        height: 200
    },
    listItem: {
        marginHorizontal: 20,
        marginVertical: 10,
        borderColor: '#ccc',
        borderWidth: 1,
        padding: 10
    },
    title: {
        fontFamily: 'open-sans-bold',
        fontSize: 22,
        textAlign: 'center'
    },
    details: {
        flexDirection: 'row',
        padding: 15,
        justifyContent: 'space-around'
    }
});

export default MealDetailScreen;