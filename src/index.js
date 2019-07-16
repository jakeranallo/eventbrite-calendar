import ReactDOM from "react-dom";
import React, { Component } from 'react';
import Calendar from 'react-calendar';
import axios from "axios";
 
class App extends Component {
  state = {
    date: new Date(),
    events: [],
    isLoading: true,
    errors: null
  }

  async getEvents() {
    let webApiUrl =
      "https://api.webflow.com/collections/5c75b9db8dd1aea073b92c21/items?api_version=1.0.0";
    let tokenStr =
      "8ecd95dc36e18983f7632af2602b9e9aa8cf2bf441dc4cc7e9dd690ea50067de";

    await axios
      .get(webApiUrl, {
        headers: {
          Authorization: "Bearer " + tokenStr
        }
      })

      .then(c => console.log(c));

      // .then(json =>
      //   json.data.items.map(result => ({
      //     name: `${result.name}`,
      //     content: `${result.content}`
      //   }))
      // )
      // .then(events => {
      //   this.setState({
      //     events,
      //     isLoading: false
      //   });
      // })
      // .catch(error => this.setState({ error, isLoading: false }));
  }

  componentDidMount() {
    this.getEvents();
  }
 
  render() {
    return (
      <div>
        <Calendar
          value={this.state.date}
          tileContent={({ date, view }) => view === 'month' && date.getDate() === '2017-01-01' ? <p>It's Sunday!</p> : null}
        />
      </div>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
