import axios from 'axios';
import React, { Component } from 'react';
import { View, Text } from 'react-native';

class App extends Component {
  state = {
    tableData: [],
  };

  componentDidMount() {
    axios
        .get('https://www.thesportsdb.com/api/v1/json/3/search_all_teams.php?l=Polish%20Ekstraklasa')
        .then(response => {
          const tableData = response.data.data;
          this.setState({ tableData });
        })
        .catch(error => {
          console.error('Błąd podczas pobierania danych:', error);
        });
  }

  render() {
    return (
        <View>
          <Text>Tabela Ekstraklasy:</Text>
          {this.state.tableData.map((item, index) => (
              <View key={index}>
                <Text>{item.team_name}</Text>
                <Text>Punkty: {item.total_points}</Text>
                {/* Dodaj więcej informacji, które chcesz wyświetlić */}
              </View>
          ))}
        </View>
    );
  }
}

export default App;