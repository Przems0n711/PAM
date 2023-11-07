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
                console.error('Błąd podczas pobierania danych:', error);
            });
    }

    renderClubData() {
        if (this.state.selectedClub) {
            const selectedTeam = this.state.tableData.find(
                ({ team_name }) => team_name === this.state.selectedClub
            );

            if (selectedTeam) {
                return (
                    <View>
                        <Text>Nazwa klubu: {selectedTeam.strTeam}</Text>
                        <Text>Informacje o klubie: {selectedTeam.strDescriptionEN}</Text>
                    </View>
                );
            } else {
                return <Text>Nie znaleziono informacji o klubie.</Text>;
            }
        }
        return <Text>Wybierz klub z listy powyżej, aby zobaczyć dane.</Text>;
    }

    render() {
        return (
            <View style={styles.container}>
                <Picker
                    selectedValue={this.state.selectedClub}
                    onValueChange={(itemValue, itemIndex) =>
                        this.setState({ selectedClub: itemValue })
                    }
                >
                    {this.state.tableData.map((item, index) => (
                        <Picker.Item key={index} label={item.strTeam} value={item.strTeam} />
                    ))}
                </Picker>
                {this.renderClubData()}
            </View>
        );
    }
}

export default App;