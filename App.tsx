import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import axios from 'axios';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        padding: 20,
        backgroundColor: '#222',
        color: '#fff',
    },
    picker: {
        color: '#fff',
        backgroundColor: '#333',
        borderRadius: 8,
        marginBottom: 20,
    },
    clubInfo: {
        marginTop: 20,
    },
    clubName: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 10,
    },
    clubDescription: {
        color: '#ccc',
    },
});

class App extends Component {
    state = {
        tableData: [],
        selectedClub: null,
    };

    componentDidMount() {
        axios
            .get('https://www.thesportsdb.com/api/v1/json/3/search_all_teams.php?l=Polish%20Ekstraklasa')
            .then((response) => {
                const tableData = response.data.teams;
                this.setState({ tableData });
            })
            .catch((error) => {
                console.error('Error while downloading data:', error);
            });
    }

    renderClubData() {
        const { selectedClub, tableData } = this.state;

        if (selectedClub) {
            const selectedTeam = tableData.find(({ strTeam }) => strTeam === selectedClub);

            if (selectedTeam) {
                return (
                    <ScrollView style={styles.clubInfo}>
                        <View>
                            <Text style={styles.clubName}>Club name: {selectedTeam.strTeam}</Text>
                            <Text style={styles.clubDescription}>Information about the club: {selectedTeam.strDescriptionEN}
                            </Text>
                        </View>
                    </ScrollView>
                );
            } else {
                return <Text style={styles.clubDescription}>Information about the club was not found.</Text>;
            }
        }

        return <Text style={styles.clubDescription}>Select a club from the list above to see the data.</Text>;
    }

    handleClubChange = (itemValue, itemIndex) => {
        this.setState({ selectedClub: itemValue });
    };

    render() {
        const { tableData, selectedClub } = this.state;

        return (
            <View style={styles.container}>
                <Picker
                    style={styles.picker}
                    selectedValue={selectedClub}
                    onValueChange={this.handleClubChange}>
                    {tableData.map((item, index) => (
                        <Picker.Item key={index} label={item.strTeam} value={item.strTeam} />
                    ))}
                </Picker>
                {this.renderClubData()}
            </View>
        );
    }
}

export default App;