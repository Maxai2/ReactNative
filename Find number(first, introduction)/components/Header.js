import React from 'react';
import { StyleSheet, View, Text, Platform } from 'react-native';

const Header = (props) => {
  return (
    <View style={{ ...styles.headerBase, ...Platform.select({ ios: styles.headerIOS, android: styles.headerAndroid }) }}>
      <Text style={styles.headerTitle}>{props.title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  headerBase: {
    width: '100%',
    height: 90,
    paddingTop: 36,
    alignItems: "center",
    justifyContent: "center"
  },
  headerAndroid: {
    backgroundColor: 'yellow',
    borderBottomColor: 'transparent',
    borderBottomWidth: 0
  },
  headerIOS: {
    backgroundColor: 'white',
    borderBottomColor: '#ccc',
    borderBottomWidth: 1
  },
  headerTitle: {
    color: Platform.OS === 'android' ? 'green' : 'black',
    fontSize: 18
  },
});

export default Header;
