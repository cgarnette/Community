import React from 'react';
import { Segment, Image } from 'semantic-ui-react';

export const NewsEntry = (props) => {
    const { content } = props;
    return (
        <Segment style={{width: '90%', marginLeft: '5%', marginRight: '5%', marginTop: '2%', display: 'flex', flexDirection: 'column'}}>
            <div style={{width: '100%', display: 'flex'}}>
                <div style={{width: '50%', display: 'flex', justifyContent: 'flex-start'}}>
                    {content.source.name}
                </div>
                <div style={{width: '50%', display: 'flex', justifyContent: 'flex-end'}}>
                    {"Reported By: " + (content.author || "Anon.")}
                </div>
            </div>
            <h2 style={{justifyContent: 'flex-end'}}>{content.title}</h2>
            <div>
                <Image
                    src={content.urlToImage}
                    as='a'
                    size='medium'
                    href={content.url}
                    target='_blank'/>
            </div>
            <div style={{marginTop: '1em'}}>
                {content.content}
            </div>
            
            <div style={{marginTop: '1em'}}>
                <span>{"Read More at: "}<a href={content.url}>{content.url}</a></span>
            </div>
        </Segment>
    );
};