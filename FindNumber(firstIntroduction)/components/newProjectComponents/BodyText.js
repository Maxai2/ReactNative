import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

const BodyText = props => <Text style={{...props.style, ...styles.body}}>{props.children}</Text>;

const styles = StyleSheet.create({
    body: {
        fontFamily: 'helvetica-neue'
    }
});

export default BodyText;