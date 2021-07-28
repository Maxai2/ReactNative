import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, Dimensions, ScrollView } from 'react-native';
import CustomButton from '../components/CustomButton';
import BodyText from '../components/newProjectComponents/BodyText';
import HeaderText from '../components/newProjectComponents/HeaderText';

const GameOverScreen = props => {
    const [availableDeviceWidth, setAvailableDeviceWidth] = useState(Dimensions.get('window').width);
    const [availableDeviceHeight, setAvailableDeviceHeight] = useState(Dimensions.get('window').height);

    useEffect(() => {
        const updateLayout = () => {
            setAvailableDeviceWidth(Dimensions.get('window').width);
            setAvailableDeviceHeight(Dimensions.get('window').height);
        };

        Dimensions.addEventListener('change', updateLayout);

        return () => {
            Dimensions.removeEventListener('change', updateLayout);
        };
    });

    return (
        <ScrollView>
            <View style={styles.screen}>
                <HeaderText>The Game is Over! </HeaderText>
                <View style={{...styles.imageCont, ...{
                    width: availableDeviceWidth * 0.7,
                    height: availableDeviceWidth * 0.7,
                    borderRadius: availableDeviceWidth * 0.7 / 2,
                    marginVertical: availableDeviceHeight / 30
                }}}>
                    <Image
                        style={styles.imageStyle}
                        // source={require('../assets/success.png')}
                        source={{ uri: 'https://images.unsplash.com/photo-1535224206242-487f7090b5bb?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80' }}
                        // fadeDuration={1000}
                        resizeMode='cover' />
                </View>
                <View style={styles.textCont}>
                    <BodyText style={styles.text}>
                        Your phone needed{' '}
                        <Text style={styles.highlight}>{props.roundsNumber}</Text> rounds to
                            guess the number{' '}
                        <Text style={styles.highlight}>{props.userNumber}</Text>.
                        </BodyText>
                </View>
                {/* <Button title='NEW GAME' onPress={props.onRestart} />  */}
                < CustomButton style={styles.newGameButton} onPress={props.onRestart} > NEW GAME</ CustomButton>
            </View >
        </ScrollView >
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 20
    },
    imageCont: {
        borderWidth: 3,
        borderColor: 'gray',
        overflow: 'hidden',
        // borderRadius: 150,
        // borderRadius: Dimensions.get('window').width * 0.7 / 2,
        // width: 300,
        // height: 300,
        // width: Dimensions.get('window').width * 0.7,
        // height: Dimensions.get('window').width * 0.7,
        // marginVertical: Dimensions.get('window').height / 30
    },
    textCont: {
        // width: '80%',
        marginHorizontal: 30,
        marginVertical: Dimensions.get('window').height / 40
    },
    text: {
        textAlign: 'center',
        fontSize: Dimensions.get('window').height < 400 ? 16 : 20
    },
    imageStyle: {
        width: '100%',
        height: '100%'
    },
    highlight: {
        color: 'green',
        fontWeight: 'bold'
    },
    newGameButton: {
        backgroundColor: 'blue'
    }
});

export default GameOverScreen;