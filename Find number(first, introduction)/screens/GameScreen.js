import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, Alert, ScrollView, FlatList, Dimensions } from 'react-native';
import Card from '../components/Card';
import CustomButton from '../components/CustomButton';
import { Ionicons } from '@expo/vector-icons';
import * as ScreenOrientation from 'expo-screen-orientation';

import NumberContainer from '../components/NumberContainer';

const generateRandomBetween = (min, max, exclude) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    const rndNum = Math.floor(Math.random() * (max - min) + min);

    if (rndNum === exclude) {
        generateRandomBetween(min, max, exclude);
    } else {
        return rndNum;
    }

};

const renderListItem = (listLength, itemData) =>
(
    <View style={styles.listItem}>
        <Text>#{listLength - itemData.index}</Text>
        <Text>{itemData.item}</Text>
    </View>
);

const GameScreen = props => {
    ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);

    const initialGuess = generateRandomBetween(1, 100, props.userChoice);
    // const [currentGuess, setCurrentGuess] = useState(generateRandomBetween(1, 100, props.userChoice));

    const [currentGuess, setCurrentGuess] = useState(initialGuess);
    const [pastGuesses, setPastGuesses] = useState([initialGuess.toString()]);
    const currentLow = useRef(1);
    const currentHigh = useRef(100);
    // const [availableDeviceWidth, setAvailbleDeviceWidth] = useState(Dimensions.get('window').width);
    const [availableDeviceHeight, setAvailbleDeviceHeight] = useState(Dimensions.get('window').height);

    const { userChoice, onGameOver } = props;

    useEffect(() => {
        const updateLayout = () => {
            setAvailbleDeviceHeight(Dimensions.get('window').height);
            // setAvailbleDeviceWidth(Dimensions.get('window').width);
        }

        Dimensions.addEventListener('change', updateLayout);

        return () => {
            Dimensions.removeEventListener('change', updateLayout);
        };
    });

    useEffect(() => {
        if (currentGuess === userChoice) {
            onGameOver(pastGuesses.length);
        }
    }, [currentGuess, userChoice, onGameOver]);

    const nextGuessHandler = direction => {
        if (
            (direction === 'lower' && currentGuess < userChoice) ||
            (direction === 'greater' && currentGuess > userChoice)
        ) {
            Alert.alert('Don\'t lie!', 'You know that this is wrong...', [{ text: 'Sorry!', style: 'cancel' }]);
            return;
        }
        if (direction === 'lower') {
            currentHigh.current = currentGuess;
        } else {
            currentLow.current = currentGuess + 1;
        }

        const nextNumber = generateRandomBetween(currentLow.current, currentHigh.current, currentGuess);

        setCurrentGuess(nextNumber);
        // setRounds(curRounds => curRounds + 1);
        setPastGuesses(curPastGuesses => [nextNumber.toString(), ...curPastGuesses]);
    }

    // let listStyle = styles.listContainer;

    // if (Dimensions.get('window').width < 350) {
    //     listStyle = styles.listContainerSmall;
    // }

    let gameControls = (
        <React.Fragment>
            <NumberContainer>{currentGuess}</NumberContainer>
            <Card style={styles.buttonContainer}>
                <CustomButton onPress={nextGuessHandler.bind(this, 'lower')}>
                    <Ionicons name="md-remove" size={24} />
                </CustomButton>
                <CustomButton onPress={nextGuessHandler.bind(this, 'greater')}>
                    <Ionicons name="md-add" size={24} />
                </CustomButton>
            </Card>
        </React.Fragment>
    );

    if (availableDeviceHeight < 500) {
        gameControls = (
            <View style={styles.controls}>
                <CustomButton onPress={nextGuessHandler.bind(this, 'lower')}>
                    <Ionicons name="md-remove" size={24} />
                </CustomButton>
                <NumberContainer>{currentGuess}</NumberContainer>
                <CustomButton onPress={nextGuessHandler.bind(this, 'greater')}>
                    <Ionicons name="md-add" size={24} />
                </CustomButton>
            </View>
        );
    }

    if (availableDeviceHeight < 500) {
        return (
            <View style={styles.screen}>
                <Text style={DefaultStyles.title}>Opponnet's Guess</Text>
                {/* <View style={styles.controls}>
                    <CustomButton style={styles.buttonStyle} onPress={nextGuessHandler.bind(this, 'lower')} >
                        <Ionicons name='md-remove' size={24} />
                    </CustomButton>
                    <NumberContainer>{currentGuess}</NumberContainer>
                    <CustomButton style={styles.buttonStyle} onPress={nextGuessHandler.bind(this, 'greater')} >
                        <Ionicons name='md-add' size={24} />
                    </CustomButton>
                </View> */}
                <View style={styles.listContainer}>
                    {pastGuesses.map((guess, index) => renderListItem(guess, pastGuesses.length - index))}
                    {/* <ScrollView contentContainerStyle={styles.list}>
                {pastGuesses.map((guess, index) => renderListItem(guess, pastGuesses.length - index))}
            </ScrollView> */}
                    <FlatList data={pastGuesses} renderItem={renderListItem.bind(this, pastGuesses.length,)} key={(item) => item} contentContainerStyle={styles.list} />

                </View>
            </View>
        );
    }

    return (
        <View style={styles.screen}>
            <Text>Opponnet's Guess</Text>
            <NumberContainer>{currentGuess}</NumberContainer>
            <Card style={{ ...styles.buttonContainer, marginTop: Dimensions.get('window').height > 600 ? 30 : 5 }}>
                <CustomButton style={styles.buttonStyle} onPress={nextGuessHandler.bind(this, 'lower')} >
                    <Ionicons name='md-remove' size={24} />
                </CustomButton>
                <CustomButton style={styles.buttonStyle} onPress={nextGuessHandler.bind(this, 'greater')} >
                    <Ionicons name='md-add' size={24} />
                </CustomButton>
            </Card>
            <View style={styles.listContainer}>
                {/* <ScrollView contentContainerStyle={styles.list}>
                    {pastGuesses.map((guess, index) => renderListItem(guess, pastGuesses.length - index))}
                </ScrollView> */}
                <FlatList data={pastGuesses} renderItem={renderListItem.bind(this, pastGuesses.length,)} key={(item) => item} contentContainerStyle={styles.list} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 10,
        alignItems: 'center'
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        // marginTop: Dimensions.get('window').height > 600 ? 30 : 5,
        width: 300,
        maxWidth: '80%'
    },
    buttonStyle: {
        backgroundColor: 'blue'
    },
    controls: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '80%',
        alignItems: 'center'
    },
    listContainer: {
        flex: 1,
        width: Dimensions.get('window').width > 350 ? '60%' : '80%'
    },
    list: {
        flexGrow: 1,
        // alignItems: 'center',
        justifyContent: 'flex-end'
    },
    listItem: {
        borderColor: '#ccc',
        borderWidth: 1,
        padding: 15,
        marginVertical: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%'
    },
});

export default GameScreen;