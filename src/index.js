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

    // Obscure key for security
    
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

      // Map items to new names in array

      const mapEvents = eventFetch.map(({ name: {text:title}, start: {utc:start}, end: {utc:end}, url }) => ({ title, start, end, url }));

      this.setState({ events: mapEvents })
      console.log(this.state.events)
  })
  }

  componentDidMount() {
    this.getEvents();
  }
 
  render() {
    const {events} = this.state
    const localizer = momentLocalizer(moment)
    const onEventClick = (events) => window.open(events.url, '_blank')

    return (
      <div style={{width:'500px', height:'500px'}}>
          <Calendar
          localizer={localizer}
            events={events}
            step={30}
            defaultView='month'
            views={['month','week','day']}
            defaultDate={new Date()}
            onSelectEvent={events => onEventClick(events)}
            />

      </div>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
