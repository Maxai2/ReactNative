import React from 'react';
import { Text, StyleSheet } from 'react-native';

const HeaderText = props => <Text style={{ ...props.style, ...styles.body }}>{props.children}</Text>

const styles = new StyleSheet.create({
    body: {
        fontFamily: 'helvetica-neue-bold'
    }
});

export default HeaderText;