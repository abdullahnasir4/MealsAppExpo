import {MEALS} from '../../data/dummy-data';
import { TOGGLE_FAVOURITE, SET_FILTERS } from '../actions/meals';

const initialState = {
    meals:MEALS,
    filteredMeals: MEALS,
    favouriteMeals: []
};

const mealsReducers = (state = initialState, action) => {
    switch (action.type) {
        case TOGGLE_FAVOURITE:
            const existingIndex = state.favouriteMeals.findIndex(meal => meal.id === action.mealId);
            if(existingIndex >= 0) {
                const updatedFavMeals = [...state.favouriteMeals];
                updatedFavMeals.splice(existingIndex, 1);
                return {...state, favouriteMeals: updatedFavMeals};
            } else {
                const meal = state.meals.find(meal => meal.id === action.mealId);
                return {... state, favouriteMeals: state.favouriteMeals.concat(meal) };
            }
            case SET_FILTERS:
                const appliedFilters = action.filters;
                const updatedFilteredMeals = state.meals.filter(meal => {
                    if(appliedFilters.GlutenFree && !meal.isGlutenFree) {
                        return false;
                    }
                    if(appliedFilters.LactoseFree && !meal.isLactoseFree) {
                        return false;
                    }
                    if(appliedFilters.Vegan && !meal.isVegan) {
                        return false;
                    }
                    if(appliedFilters.Vegitarian && !meal.isVegitarian) {
                        return false;
                    }
                    return true;
                });
                return {...state, filteredMeals: updatedFilteredMeals};
            default:
                return state;
    }
} 

export default mealsReducers;