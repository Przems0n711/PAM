import axios from 'axios';
import React, { Component } from 'react';
import { View, Text} from 'react-native';
import { Picker } from '@react-native-picker/picker';

class App extends Component {
    state = {
        tableData: [],
        selectedClub: null,
    };

    componentDidMount() {
        axios
            .get('https://www.thesportsdb.com/api/v1/json/3/search_all_teams.php?l=Polish%20Ekstraklasa')
            .then(response => {
                const tableData = response.data.teams;
                this.setState({ tableData });
            })
            .catch(error => {
                console.error('Błąd podczas pobierania danych:', error);
            });
    }

    renderClubData() {
        if (this.state.selectedClub) {
            const selectedTeam = this.state.tableData.find(
                ({team_name}) => team_name === this.state.selectedClub
            );

            let view = <><View>
                <Text>Nazwa klubu: {selectedTeam.team_name}</Text>
                <Text>Punkty: {selectedTeam.total_points}</Text>
            </View></>;
            return view;
        } else {
            return <Text>Wybierz klub z listy powyżej, aby zobaczyć dane.</Text>;
        }
    }

    render() {
        return (
            <View>
                <Text>Dane Ekstraklasy:</Text>
                <Picker
                    selectedValue={this.state.selectedClub}
                    onValueChange={(itemValue, itemIndex) =>
                        this.setState({ selectedClub: itemValue })
                    }>
                    {this.state.tableData.map((item, index) => (
                        <Picker.Item
                            key={index}
                            label={item["team_name"]}
                            value={item["team_name"]}
                        />
                    ))}
                </Picker>
                {this.renderClubData()}
            </View>
        );
    }
}

export default App;