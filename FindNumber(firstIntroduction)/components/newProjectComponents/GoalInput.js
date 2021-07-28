import React, { useState } from "react";
import { View, TextInput, Button, StyleSheet, Modal } from "react-native";

const GoalInput = (props) => {
  const [enteredGoal, setEnteredGoal] = useState("");

  const goalInputHandler = (enteredText) => {
    setEnteredGoal(enteredText);
  };

  const addGoalHandler = () => {
    props.onAddGoal(enteredGoal);
    setEnteredGoal("");
  };

  return (
    <Modal visible={props.visible} animationType="slide">
      <View style={styleGoal.container}>
        <TextInput
          style={styleGoal.textInput}
          placeholder="Course Goal"
          onChangeText={goalInputHandler}
          value={enteredGoal}
        />
        {/* <Button title="Add" onPress={() => props.onAddGoal(enteredGoal)} /> */}
        {/* <Button title="Add" onPress={props.onAddGoal.bind(this, enteredGoal)} /> */}
        <View style={styleGoal.buttonContainer}>
          <View style={styleGoal.button}>
            <Button title="Add" onPress={addGoalHandler} />
          </View>
          <View style={styleGoal.button}>
            <Button title="Cancel" color="red" onPress={props.onCancel} />
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styleGoal = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  textInput: {
    borderBottomColor: "black",
    borderBottomWidth: 1,
    padding: 3,
    marginBottom: 10,
    width: "80%",
  },
  buttonContainer: {
    width: "60%",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  button: {
    width: "40%",
  },
});

export default GoalInput;
