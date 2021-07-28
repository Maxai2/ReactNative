import React from 'react';
import {Button, FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {CATEGORIES} from "../data/dummy-data";

const CategoriesScreen = (props) => {
    const renderGridItem = (itemData) => {
        return (
            <TouchableOpacity style={styles.gridItem} onPress={() => {
                props.navigation.navigate({
                    routeName: 'CategoryMeals',
                    params: {
                        categoryId: itemData.item.id
                    }
                });
            }}>
                <View>
                    <Text>
                        {itemData.item.title}
                    </Text>
                </View>
            </TouchableOpacity>
        );
    };

    return (
        <FlatList
            // keyExtractor={(item, index) => item.id}
            data={CATEGORIES}
            renderItem={renderGridItem}
            numColumns={2}/>
    );

    {/*<Button title="Go to Meals!" onPress={() => {*/
    }
    {/*    props.navigation.navigate({routeName: 'CategoryMeals'});*/
    }
    {/*    */
    }
    {/*    // props.navigation.replace({routeName: 'CategoryMeals'});*/
    }
    {/*    // props.navigation.push('CategoryMeals');*/
    }
    {/*}}/>*/
    }
}

CategoriesScreen.navigationOptions = {
    headerTitle: 'Meals Categories'
};

const styles = StyleSheet.create({
    gridItem: {
        flex: 1,
        margin: 15,
        height: 150
    }
});

export default CategoriesScreen;
