import React from 'react';
import TweetEmbed from 'react-tweet-embed';
import { Segment } from 'semantic-ui-react';

export const Tweet = (props) => {
    const { tweet } = props;
    return (
        <Segment style={{ margin: '1em'}}>
            <div style={{display: 'flex', justifyContent: 'center', width: '100%'}}>
                <TweetEmbed id={tweet.id}/>
            </div>
        </Segment>
    );
};