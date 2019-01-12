import React, { Component } from 'react';
import { Tweet } from './templates/tweetTemplate';
import { NewsEntry } from './templates/newsTemplate';

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

    generateEntryDisplay = () => {
        const { entries } = this.state;
        return entries.map(entry => {
            if (entry.isTweet) {
                return <Tweet tweet={entry}/>
            } else {
                return <NewsEntry content={entry}/>
            }
        });
    }

    render() {
        return (
            <div style={{display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between'}}>
                {this.state.entries.length > 2 && this.generateEntryDisplay()}
            </div>
        ); 
    }
}

export default News;