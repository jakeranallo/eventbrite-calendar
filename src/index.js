import ReactDOM from "react-dom";
import React, { Component } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import axios from "axios";

moment.locale('en-GB');

require("dotenv").config()

class App extends Component {
  state = {
    date: new Date(),
    events: []
  }

  async getEvents() {

    // Obscure this for security
    
    const API_KEY =`${process.env.REACT_APP_API_KEY}`

    let webApiUrl =
      "https://www.eventbriteapi.com/v3/users/me/events/";
    let tokenStr =
      API_KEY;

    await axios
      .get(webApiUrl, {
        headers: {
          Authorization: "Bearer " + tokenStr
        }
      })

    .then(response => {
      let eventFetch = response.data.events;

      // Standardise date format

      for (let i = 0; i < eventFetch.length; i++) {
        eventFetch[i].start.utc = moment.utc(eventFetch[i].start.utc).toDate();
        eventFetch[i].end.utc = moment.utc(eventFetch[i].end.utc).toDate();}

      // TODO Map items to new names in array

      eventFetch.map(event => ({
        title: `${event.name.text}`,
        start: `${event.start.utc}`,
        end: `${event.end.utc}`,
        url:`${event.url}`
      }))

      // TODO Destructure to only setState with required fields

      this.setState({ events: eventFetch })
      console.log(this.state.events)
  })
  }

  componentDidMount() {
    this.getEvents();
  }
 
  render() {
    const {events} = this.state
    const localizer = momentLocalizer(moment)
    return (
      <div style={{width:'500px', height:'500px'}}>
          <Calendar
          localizer={localizer}
            events={events}
            step={30}
            defaultView='month'
            views={['month','week','day']}
            defaultDate={new Date()}/>
      </div>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
