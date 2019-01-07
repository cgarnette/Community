import React, {Component} from 'react';
import { Segment, Image, Icon } from 'semantic-ui-react';
import TweetEmbed from 'react-tweet-embed';
import * as _ from 'lodash';

class Home extends Component {

    constructor(props){
        super(props);
        this.state = {
            ...props
        };
    }

    componentWillReceiveProps(nextProps) {
        this.setState(nextProps);
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

    tweetTemplate = (tweet) => {
        return (
            <Segment style={{height: '50em', width: '40em', margin: '1em'}}>
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


    weatherDisplay = () => {
        const snow = ['snow', 'blizzard', 'flurry'];
        const rain = ['rain', 'wet', 'drizzle'];
        const temp = this.state.weather.temp || "unknown";
        const conditions = this.state.weather.conditions || [];
        
        let icon = "sun";
        conditions.forEach(condition => {
            const test = condition.main.toLowerCase();
            icon = snow.includes(test) ? 'snow' : (rain.includes(test) ? 'rain' : 'sun');
        });

        return (
            <div style={{display: 'flex', flexDirection: 'row'}}>
                <div>
                    <b style={{display: 'flex', fontSize: '3em'}}>{temp + "°"}</b>
                    {conditions.length > 0 && conditions.map(condition => {
                        return (
                            <div style={{marginTop: '2em'}}>
                                <b style={{display: 'flex', fontSize: '2em'}}>{(condition.description || "Unknown")}</b>
                            </div>
                        );
                    })}
                </div>

                <div style={{width: '50%', display: 'flex', justifyContent: 'flex-end'}}>
                    <Icon name={icon} size="huge"/>
                </div>
            </div>
        );
    }

    itemDisplayContainer = (item, width="90%") => {
        return (
            <Segment style={{margin: '1em', width: width, marginLeft: '5%', marginRight: '5%'}}>
                {item}
            </Segment>
        );
    }

    introduction = () => {
        return (
            <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
                <b style={{fontSize: '3em', marginTop: '1em'}}>Welcome to the Community App!</b>
                <b style={{fontSize: '2em', marginTop: '2em'}}>
                    This application will help you get to know your community and keep you in the loop.
                </b>
                <b style={{fontSize: '2em', marginTop: '1em'}}>
                    For News pertaining to your community please visit the News Tab
                </b>
                <b style={{fontSize: '2em', marginTop: '1em'}}>
                    For Events taking place in or near your community please visit the Events Tab
                </b>
                <b style={{fontSize: '1em', marginTop: '1em'}}>
                    <span>
                        For information regarding a variety of services offered 
                    </span>
                    <span>
                        in the community please visit the Services Tab (Under Development)
                    </span>
                </b>
            </div>
        );
    }


    render(){
        const events = this.state.events.events || [];
        const entries = this.state.news.entries || [];

        const countingEntries = {'tweets': 0, 'articles': 0, 'events': 0};

        let components = entries.map(entry => {
            if (entry.isTweet) {
                if (countingEntries.tweets > 2) {
                    return undefined;
                }
                countingEntries.tweets = countingEntries.tweets + 1;
                return this.tweetTemplate(entry)
            } else {
                if (countingEntries.articles > 2) {
                    return undefined;
                }
                countingEntries.articles = countingEntries.articles + 1;
                return this.newsEntryTemplate(entry);
            }
        });
        components = components.concat(events.map(event => {
            if (countingEntries.events > 2) {
                return undefined;
            }
            countingEntries.events = countingEntries.events + 1;
            return this.eventDisplay(event);
        }));

        components = _.compact(components);

        return (
            <div>
                {/* <img src={"/images/background.jpg"}/> */}
                {this.itemDisplayContainer(this.introduction())}
                {this.itemDisplayContainer(this.weatherDisplay(), "20%")}
                <div style={{display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between'}}>
                    {components}
                </div>
            </div>
        );
        
    }
}

export default Home;