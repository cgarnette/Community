import React, { Component } from 'react';
import { Segment, Image } from 'semantic-ui-react';
import TweetEmbed from 'react-tweet-embed';
import { getRandomInt } from '../util/helpers';

class News extends Component {

    constructor(props){
        super(props);
        this.state = {
            ...props,
        };
    }

    componentWillReceiveProps(nextProps){
        this.setState({...nextProps});
    }

    getRandom = () => {
        return getRandomInt(2);
    } 

    generateEntryDisplay = () => {
        const { entries } = this.state;
        return entries.map(entry => {
            if (entry.isTweet) {
                return this.tweetTemplate(entry)
            } else {
                return this.newsEntryTemplate(entry);
            }
        });
    }

    tweetTemplate = (tweet) => {
        return (
            <Segment style={{width: '90%', marginLeft: '5%', marginRight: '5%', marginTop: '2%'}}>
                <div style={{display: 'flex', justifyContent: 'center', width: '100%'}}>
                    <TweetEmbed id={tweet.id}/>
                </div>
            </Segment>
        );
    }

    newsEntryTemplate = (content) => {
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
    }

    render() {
        console.log(this.state);
        return (
            <div style={{marginTop: '5%', marginBottom: '2em'}}>
                {this.state.entries.length > 2 && this.generateEntryDisplay()}
            </div>
        ); 
    }
}

export default News;