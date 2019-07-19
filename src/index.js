import ReactDOM from "react-dom";
import React, { Component } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
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
      "https://www.eventbriteapi.com/v3/users/me/events/";
    let tokenStr =
      "ZFP4UHEKXMUCMP6RLLH5";

    await axios
      .get(webApiUrl, {
        headers: {
          Authorization: "Bearer " + tokenStr
        }
      })

    .then(response => {
      const eventFetch = response.data.events
      this.setState({ events: eventFetch })
      console.log(this.state.events)
  })
  }

  componentDidMount() {
    this.getEvents();
  }
 
  render() {
    const cal_events = []
    const localizer = momentLocalizer(moment)
    return (
      <>
      {this.state.events.map((event) => (
          <div key={event.id}>
           <p>{event.name.text}</p>  
           <p>{event.start.local}</p>  
           <p>{event.url}</p>            
          </div>
        ))}
      <div style={{width:'500px', height:'500px'}}>
          <Calendar
          localizer={localizer}
            events={cal_events}
            step={30}
            defaultView='month'
            views={['month','week','day']}
            defaultDate={new Date()}/>
      </div>
      </>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
