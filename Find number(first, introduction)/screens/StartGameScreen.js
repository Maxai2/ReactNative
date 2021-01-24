import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, TouchableWithoutFeedback, Keyboard, Alert, Dimensions, ScrollView, KeyboardAvoidingView } from 'react-native';

import Card from '../components/Card';
import CustomButton from '../components/CustomButton';
import Input from '../components/Input';
import BodyText from '../components/newProjectComponents/BodyText';
import NumberContainer from '../components/NumberContainer';
import Colors from '../constants/colors';

const StartGameScreen = props => {

  const [enteredValue, setEnteredValue] = useState('');
  const [confirmed, setConfirmed] = useState(false);
  const [selectedNumber, setSelectedNumber] = useState();
  const [buttonWidth, setButtonWidth] = useState(Dimensions.get('window').width / 4);

  const numberInputHandler = inputText => {
    setEnteredValue(inputText.replace(/[^0-9]/g, ''));
  };

  const resetInputHandler = () => {
    setEnteredValue('');
    setConfirmed(false);
  };

  useEffect(() => {
    const updateLayout = () => {
      setButtonWidth(Dimensions.get('window').width / 4);
    }
  
    Dimensions.addEventListener('change', updateLayout);

    return () => {
      Dimensions.removeEventListener('change', updateLayout);
    }
  });

  const confirmInputHandler = () => {
    const chosenNumber = parseInt(enteredValue);
    if (isNaN(chosenNumber) || chosenNumber <= 0 || chosenNumber > 99) {
      Alert.alert('Invalid number!', 'Number has to a number between 1 and 99', [{ text: 'Okay', style: 'destructive', onPress: resetInputHandler }])
      return;
    }
    setConfirmed(true);
    setSelectedNumber(chosenNumber);
    setEnteredValue('');
    Keyboard.dismiss();
  };

  let confirmedOutput;

  if (confirmed) {
    confirmedOutput =
      <Card style={styles.confirmCardStyle}>
        <Text>You selected</Text>
        <NumberContainer>{selectedNumber}</NumberContainer>
        {/* <Button title="START GAME" onPress={() => props.onStartGame(selectedNumber)}/>  */}
        <CustomButton style={styles.startGameButton} onPress={() => props.onStartGame(selectedNumber)}>START GAME</CustomButton>
      </Card>
  }

  return (
    <ScrollView>
      <KeyboardAvoidingView behavior='position' keyboardVerticalOffset={30}>
        <TouchableWithoutFeedback onPress={() => {
          Keyboard.dismiss();
        }}>
          <View style={styles.screen}>
            <BodyText style={styles.title}>Start a New Game!</BodyText>
            <Card style={styles.inputContainer}>
              <Text>Select a number</Text>
              <Input style={styles.input}
                value={enteredValue}
                onChangeText={numberInputHandler}
                blurOnSubmit
                autoCapitalize='none'
                autoCorrect={false}
                keyboardType='number-pad'
                maxLength={2} />
              <View style={styles.buttonContainer}>
                <CustomButton style={{...styles.resetButton, ...{width: buttonWidth}}} onPress={resetInputHandler}>Reset</CustomButton>
                <CustomButton style={{...styles.confirmButton, ...{width: buttonWidth}}} onPress={confirmInputHandler}>Confirm</CustomButton>
                {/* <View style={styles.buttonStyle}>
              <Button title='Reset' onPress={resetInputHandler} color={Colors.resetColor} />
            </View>
            <View style={styles.buttonStyle}>
              <Button title='Confirm' onPress={confirmInputHandler} color={Colors.confirmColor} />
            </View> */}
              </View>
            </Card>
            {confirmedOutput}
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    marginVertical: 10
  },
  inputContainer: {
    width: '80%',
    minWidth: 300,
    maxWidth: '95%',
    alignItems: 'center'
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 15
  },
  buttonStyle: {
    // width: Dimensions.get('window').width / 3
    // width: buttonWidth
  },
  input: {
    width: 50,
    textAlign: 'center'
  },
  confirmCardStyle: {
    marginTop: 10,
    alignItems: 'center'
  },
  startGameButton: {
    backgroundColor: 'darkgreen'
  },
  resetButton: {
    backgroundColor: Colors.resetColor,
    alignItems: 'center',
  },
  confirmButton: {
    backgroundColor: Colors.confirmColor,
    alignItems: 'center',
  }
});

export default StartGameScreen;
