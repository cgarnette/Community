import React from 'react';
import { Segment } from 'semantic-ui-react';

export const ItemDisplay = (props) => {
    const { children, width } = props
    return (
        <Segment style={{margin: '1em', width: width || "90%", marginLeft: '5%', marginRight: '5%'}}>
            {children}
        </Segment>
    );
}