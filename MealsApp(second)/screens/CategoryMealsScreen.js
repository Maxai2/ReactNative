import React from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';
import {CATEGORIES} from "../data/dummy-data";

const CategoryMealScreen = (props) => {
    const catId = props.navigation.getParam('categoryId');

    const selectedCategory = CATEGORIES.find(cat => cat.id === catId);
    return (
        <View style={styles.screen}>
            <Text>The Category Meal Screen!</Text>
            <Text>{selectedCategory.title}</Text>
            <Button title="Go to Details" onPress={() => {
                props.navigation.navigate({routeName: 'MealDetail'})
            }}/>
            <Button title="Go Back" onPress={() => {
                props.navigation.goBack();
            }}/>
        </View>
    );
}

CategoryMealScreen.navigationOptions = (navigationData) => {
    const catId = navigationData.navigation.getParam('categoryId');

    const selectCategory = CATEGORIES.find(cat => cat.id === catId);

    return {
        headerTitle: selectCategory.title
    };
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default CategoryMealScreen;
