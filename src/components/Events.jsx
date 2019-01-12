import React, {Component} from 'react';
import { Segment, Image } from 'semantic-ui-react';
import { EventDisplay } from './templates/eventTemplate';

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

    render(){
        const events = this.state.events.events || [];
        return (
            <div>
                Welcome to Events Section
                <div style={{display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between'}}>
                    {events.length > 0 && events.map(event => <EventDisplay event={event}/>)}
                </div>
            </div>
        );
    }
}


export default Events;