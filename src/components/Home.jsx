import React, {Component} from 'react';
import { Tweet } from './templates/tweetTemplate';
import { NewsEntry } from './templates/newsTemplate';
import { EventDisplay } from './templates/eventTemplate';
import { Introduction } from './templates/introduction';
import { Weather } from './templates/weatherTemplate';
import { ItemDisplay } from './templates/itemDisplayTemplate';
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

    getComponents = () => {
        const events = this.state.events.events || [];
        const entries = this.state.news.entries || [];

        const countingEntries = {'tweets': 0, 'articles': 0, 'events': 0};

        let components = entries.map(entry => {
            if (entry.isTweet) {
                if (countingEntries.tweets > 2) {
                    return undefined;
                }
                countingEntries.tweets = countingEntries.tweets + 1;
                return <Tweet tweet={entry}/>
            } else {
                if (countingEntries.articles > 2) {
                    return undefined;
                }
                countingEntries.articles = countingEntries.articles + 1;
                return <NewsEntry content={entry}/>
            }
        });
        components = components.concat(events.map(event => {
            if (countingEntries.events > 2) {
                return undefined;
            }
            countingEntries.events = countingEntries.events + 1;
            return <EventDisplay event={event}/>
        }));

        components = _.compact(components);
        return components;
    }
    


    render(){
        const components = this.getComponents();
        return (
            <div>
                <ItemDisplay>
                    <Introduction/>
                </ItemDisplay>
                <ItemDisplay width={"20%"}>
                    <Weather weather={this.state.weather}/>
                </ItemDisplay>
                <div style={{display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between'}}>
                    {components}
                </div>
            </div>
        );
        
    }
}

export default Home;