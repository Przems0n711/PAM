import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import axios from 'axios';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        padding: 20,
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
                    <View>
                        <Text>Club name: {selectedTeam.strTeam}</Text>
                        <Text>Information about the club: {selectedTeam.strDescriptionEN}</Text>
                    </View>
                );
            } else {
                return <Text>Information about the club was not found.</Text>;
            }
        }

        return <Text>Select a club from the list above to see the data.</Text>;
    }

    handleClubChange = (itemValue, itemIndex) => {
        this.setState({ selectedClub: itemValue });
    };

    render() {
        const { tableData, selectedClub } = this.state;

        return (
            <View style={styles.container}>
                <Picker selectedValue={selectedClub} onValueChange={this.handleClubChange}>
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