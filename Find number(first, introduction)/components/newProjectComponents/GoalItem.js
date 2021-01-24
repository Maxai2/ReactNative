import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableHighlight,
  TouchableOpacity,
  TouchableWithoutFeedback,
  TouchableNativeFeedback,
} from "react-native";

const GoalItem = (props) => {
  return (
    // activeOpacity={0.8}
    <TouchableNativeFeedback onPress={props.onDelete.bind(this, props.id)}>
      <View style={styleGoalList.itemCont}>
        <Text>{props.title}</Text>
      </View>
    </TouchableNativeFeedback>
  );
};

const styleGoalList = StyleSheet.create({
  itemCont: {
    padding: 10,
    marginVertical: 5,
    backgroundColor: "#ccc",
    borderColor: "black",
    borderWidth: 1,
    width: 200
  },
});

export default GoalItem;
