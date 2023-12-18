import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#222',
        color: '#fff',
    },
    infoText: {
        color: '#fff',
        fontSize: 18,
        marginBottom: 20,
    },
    backButton: {
        padding: 10,
        backgroundColor: '#333',
        borderRadius: 8,
    },
    backButtonText: {
        color: '#fff',
        fontSize: 16,
    },
});

const Info = ({ navigation }) => {
    const handleBack = () => {
        navigation.goBack();
    };

    return (
        <View style={styles.container}>
            <Text style={styles.infoText}>
                This app was created by Przemyslaw Brzuzy for football enthusiasts.
            </Text>
            <TouchableOpacity style={styles.backButton} onPress={handleBack}>
                <Text style={styles.backButtonText}>Back to App</Text>
            </TouchableOpacity>
        </View>
    );
};

export default Info;