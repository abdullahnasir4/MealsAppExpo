import React, {useState} from 'react';
import * as Font from 'expo-font';
import {AppLoading} from 'expo';
import {useScreens} from 'react-native-screens';
import {createStore, combineReducers} from 'redux';
import {Provider} from 'react-redux';
import mealReducer from './store/reducers/meals';
import MealsNavigator from './components/navigation/MealsNavigator';

useScreens(); // unlock screens
const rootReducer = combineReducers({
  meals: mealReducer
});

const store = createStore(rootReducer);

const fetchFonts = () => {
  Font.loadAsync({
    //'open-sans': require('./assets/fonts/OpenSans-Regular.tff'),
    'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf')  
  })
} 

export default function App() {
  const [fontLoaded, setFontLoaded] = useState(false);

  if(!fontLoaded) {
  return (
  <AppLoading 
  startAsync={fetchFonts} 
  onFinish={() => setFontLoaded(true)}
  />
  );
}
  return (
  <Provider store={store}>
  <MealsNavigator />
  </Provider>
  );
}
