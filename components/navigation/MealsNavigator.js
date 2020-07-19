import React from 'react';
import {Platform, Text} from 'react-native';
import {createAppContainer, createDrawerNavigator} from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import CategoriesScreen from '../../screens/CategoriesScreen';
import CategoryMealsScreen from '../../screens/CategoryMealsScreen';
import {Ionicons} from '@expo/vector-icons';
import FiltersScreen from '../../screens/FiltersScreen';
import { createMaterialBottomTabNavigator} from 'react-navigation-material-tabs';
import FavouritesScreen from '../../screens/FavouritesScreen';
import MealDetailScreen from '../../screens/MealDetailScreen';
import Colors from '../../constants/Colors';

const defaultStackNavOptions = {
        headerStyle: {
            backgroundColor: Platform.OS === 'android' ? Colors.primaryColor : ''
        },
        headerTitleStyle: {
            fontFamily: 'open-sans-bold'
        },
        headerBackTitleStyle: {
            fontFamily: 'open-sans'    
        },
        headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primaryColor,
        headerTitle: 'A Screen'
    };  

const MealsNavigator = createStackNavigator({ //Stack is used to go forward and back from pages
    Categories: CategoriesScreen,
    NavigationOptions: {
    headerTitle: 'Meal Categories'
    },
    CategoryMeals: {
        screen: CategoryMealsScreen
    },
    MealDetail: MealDetailScreen
 }, {
     //initialRouteName: 'Categories', //used to setup the first page
     defaultNavigationOptions: defaultStackNavOptions
});

const FavNavigator = createStackNavigator({
Favourites: FavouritesScreen,
MealDetail: MealDetailScreen
},
{
    //initialRouteName: 'Categories', //used to setup the first page
    defaultNavigationOptions: defaultStackNavOptions       
    }
    );

const tabScreenConfig = { 
    Meals: {screen: MealsNavigator, 
    NavigationOptions: {
    //tabBarLabel: 'Favourites', //to write label beside it
        tabBarIcon: (tabInfo) => {
        return ( 
        <Ionicons name='ios-restaurant' size={25} color={tabInfo.tintColor}/>
        );
    },
    tabBarColor: Colors.primaryColor,
    tabBarLabel: Platform.OS === 'android' ? <Text style={{fontFamily: 'open-sans-bold'}}>Meals</Text> : 'Meals'
}},
Favourites: {screen: FavouritesScreen, NavigationOptions: {
    tabBarIcon: (tabInfo) => {
        return ( 
        <Ionicons name='ios-star' size={25} color={tabInfo.tintColor}/>
        );
    },
    tabBarColor: Colors.accentColor,
    tabBarLabel: Platform.OS === 'android' ? <Text style={{fontFamily: 'open-sans-bold'}}>Favourites</Text> : 'Favourites'

}}

}

const mealsFavTabNavigator = Platform.OS === 'android'
    ? createMaterialBottomTabNavigator(tabScreenConfig, { //for android
            activeTintColor: 'white',
            shifting: false,
            barStyle: {
                backgroundColor: Colors.primaryColor
            }
    })
    : createBottomTabNavigator(tabScreenConfig, { //for ios
    tabBarOptions: {
        labelStyle: {
            fontFamily: 'open-sans'
        },
        activeTintColor: Colors.accentColor
    }
}
);

const FiltersNavigator = createStackNavigator({
    Filters: FiltersScreen
},
{
    NavigationOptions: {
        drawerLabel: 'Filters'
    },
    defaultNavigationOptions: defaultStackNavOptions       
    }
);

const mainNavigator = createDrawerNavigator({
    MealsFav: {screen: mealsFavTabNavigator, NavigationOptions: {
        drawerLabel: 'Meals'
    }},
    Filters: FiltersNavigator
}, {
        contentOptions: {
            activeTintColor: Colors.accentColor,
            labelStyle: {
                fontFamily: 'open-sans-bold'
            }
        }
});

export default createAppContainer(mainNavigator);
