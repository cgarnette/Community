import React, {Component} from 'react';
import { Segment, Image } from 'semantic-ui-react';

class Events extends Component {
    
    constructor(props){
        super(props);
        this.state = {
            ...props,
        };
    }

    componentWillReceiveProps(nextProps){
        this.setState(nextProps)
    }

    getAddress = (event) => {
        let location = event.venue.name;
        location = event.venue.address.address_1 ? location + ' ' + event.venue.address.address_1 : location;
        location = location + ' ' + event.venue.address.localized_address_display;

        return location;
    }

    eventDisplay = (event) => {

        return (
            <Segment style={{height: '50em', width: '40em', margin: '1em'}} key={event.name.text}>
                <b>{event.name.text}</b>
                <div style={{marginTop: '2em'}}>
                    Event Description
                </div>
                <div style={{marginTop: '1em', height: '65%', overflow: 'auto'}}>
                    <div style={{display: 'flex', margin: '1em 0 1em 0', justifyContent: 'center'}}>
                        {event.logo ? <Image src={event.logo.url}/> : "No Image"}
                    </div>
                    <div style={{margin: '1em'}}>
                        {event.description.text}
                    </div>
                </div>
                <Segment style={{width: '100%', display: 'flex', justifyContent: 'flex-start', flexDirection: 'column'}}>
                    <div style={{display: 'flex'}}>
                        Location: <span style={{fontSize: '.8em'}}>{this.getAddress(event)}</span>
                    </div>
                    <div style={{display: 'flex'}}>
                        Start Time: {new Date(event.start.local).toLocaleTimeString()}
                    </div>
                    <div style={{display: 'flex'}}>
                        End Time: {new Date(event.end.local).toLocaleTimeString()}
                    </div>
                    <div style={{display: 'flex'}}>
                        For Additional Info Visit: <a href={event.url} style={{fontSize: '.8em'}}>{event.url}</a>
                    </div>
                </Segment>
            </Segment>
        );
    }


    render(){

        console.log('events', this.state.events);
        const events = this.state.events.events || [];
        console.log(events.length)

        return (
            <div>
                Welcome to Events Section
                <div style={{display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between'}}>
                    {events.length > 0 && events.map(event => this.eventDisplay(event))}
                </div>
            </div>
        );
    }
}


export default Events;