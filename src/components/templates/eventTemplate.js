import React from 'react';
import { Segment, Image } from 'semantic-ui-react';
import { getAddress } from '../../util/helpers';

export const EventDisplay = (props) => {
    const { event } = props;
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
                    Location: <span style={{fontSize: '.8em'}}>{getAddress(event)}</span>
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