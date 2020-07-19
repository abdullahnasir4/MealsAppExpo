import React, {useState, useEffect, useCallback} from 'react';
import {useDispatch} from 'react-redux';
import {Text, View, StyleSheet, Switch, Platform} from 'react-native';
import {HeaderButtons, Item} from 'react-navigation-header-buttons';
import HeaderButton from '../components/HeaderButton';
import Colors from '../constants/Colors';
import {setFilters} from '../store/actions/meals';

const filterSwitch = props => {
return (
    <View style={styles.screen}>
            <Text style={styles.title}>Available Filters</Text>
            <View style={styles.filterContainer}>
                <Text>{props.label}</Text>
                <Switch
                trackColor={{true: Colors.primaryColor}}
                thumbColor={Platform.OS === 'android' ? Colors.primaryColor : ''} 
                value={props.state} 
                onValueChange={props.onChange} />
            </View>
        </View>
);
};

const FilterScreen = props => {

    const {navigation} = props;

    const [isGlutenFree, setIsGlutenFree] = useState(false);
    const [isLactoseFree, setIsLactoseFree] = useState(false);
    const [isVegan, setIsVegan] = useState(false);
    const [isVegitarian, setIsVegitarian] = useState(false);
    const dispatch = useDispatch();

    const saveFilters = useCallback(() => { //usecallback used to prevent unnecessary call backs 
        const appliedFilters = {
            GlutenFree: isGlutenFree,
            LactoseFree: isLactoseFree,
            Vegan: isVegan,
            Vegitarian: isVegitarian
        };
        dispatch(setFilters(appliedFilters));
    }, [isGlutenFree, isLactoseFree, isVegan, isVegitarian, dispatch]);

    useEffect(() => {
        navigation.setParams({save: saveFilters});
    }, [saveFilters]);

    return (
        <View style={styles.screen}>
            <Text style={styles.title}>Available Filters</Text>
            <FilterScreen 
            label='Gluten-free' 
            state={isGlutenFree} 
            onChange={newValue => setIsGlutenFree(newValue)} 
            />
              <FilterScreen 
            label='Lactose-free' 
            state={isLactoseFree} 
            onChange={newValue => setIsLactoseFree(newValue)} 
            />
              <FilterScreen 
            label='Vegan' 
            state={isVegan} 
            onChange={newValue => setIsVegan(newValue)} 
            />
              <FilterScreen 
            label='Vegitarian' 
            state={isVegitarian} 
            onChange={newValue => setIsVegitarian(newValue)} 
            />
        </View>
    );
}

FilterScreen.navigationOptions = (navData) => {
    return {
    headerTitle: 'Filtered Meals',
    headerLeft: ( 
    <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item 
        title="Menu" 
        iconName='ios-menu' 
        onPress={() => {
            navData.navigation.toggleDrawer();
        }} />
    </HeaderButtons>
    ),
headerRight: ( 
    <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item 
        title="Save" 
        iconName='ios-save' 
        onPress={navData.navigation.getParam('save')} //Use Params to communicate with navigationOptions
        />
    </HeaderButtons>
    )
};
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        alignContent: 'center'
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
        width: '80%'
    }
});

export default FilterScreen;