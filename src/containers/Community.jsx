import React, {Component} from 'react';
import { Menu, Icon } from 'semantic-ui-react';
import News from '../components/News';
import Events from '../components/Events';
import Home from '../components/Home';
import Services from '../components/Services';
import {getTopUSHeadlines, getTwitterHashtag, getEvents, getWeather} from '../util/apiService';

class Community extends Component {
    state = {
        activeItem: 'home',
        news: {
            entries: []
        },
        events: [],
        weather: {},
        tweets: [],
        services: [],
        loading: true
    };

    async componentWillMount(){
        if(this.state.news.entries.length < 3) {
            const newsResponse = await getTopUSHeadlines()
            const twitterData = await getTwitterHashtag();
            const weatherData = await getWeather();

            const tempKelvin = weatherData.success.list[0].main.temp;

            const weather = {
                temp: Math.round((tempKelvin - 273.15) * 9/5 + 32),
                conditions: weatherData.success.list[0].weather
            };

            const newsData = newsResponse.success.articles ? newsResponse.success : {articles: []};

            const newsEntries = newsData.articles.map(article => {
                return {
                    author: article.author,
                    date: new Date (article.publishedAt),
                    source: article.source,
                    content: article.content,
                    title: article.title,
                    url: article.url,
                    urlToImage: article.urlToImage
                };
            });

            const tweets = twitterData.success.map(tweet => {
                return {
                    id: tweet.id_str,
                    date: new Date(tweet.created_at),
                    isTweet: true
                };
            });
            let entries = newsEntries.concat(tweets);
            entries.sort(this.getRandom);

            let events = [];

            if (this.state.events.length < 2) {
                const response = await getEvents();
                events = response.success;
            }

            this.setState({
                news: {entries},
                tweets,
                events,
                weather,
                loading: false
            });
        }
    }

    handleItemClick = (e) => {
        console.log(e);
        this.setState({
            activeItem: e
        });
    } 

    menuBar = () => {
        const { activeItem } = this.state
        return (
            <div>
                <Menu pointing secondary>
                    <Menu.Item 
                        name='home' 
                        active={activeItem === 'home'} 
                        onClick={() => this.handleItemClick('home')} 
                    />
                    <Menu.Item
                        name='News'
                        active={activeItem === 'News'}
                        onClick={() => this.handleItemClick('News')}
                    />
                    <Menu.Item
                        name='Services'
                        active={activeItem === 'Services'}
                        onClick={() => this.handleItemClick('Services')}
                    />
                    <Menu.Item
                        name='Events'
                        active={activeItem === 'Events'}
                        onClick={() => this.handleItemClick('Events')}
                    />

                    <Menu.Menu position='right'>
                        <Menu.Item
                        name='logout'
                        active={activeItem === 'logout'}
                        onClick={this.handleItemClick}
                        />
                    </Menu.Menu>
                </Menu>
            </div>
        );
    }


    render(){
        const {
            activeItem, 
            news, 
            events, 
            tweets, 
            weather, 
            services,
            loading
        } = this.state;
        return (
            <div>
                {!loading && <div style={{backgroundImage: 'url("/images/background.jpg")'}}>
                    {this.menuBar()}
                    {activeItem === 'News' && <News entries={news.entries}/>}
                    {activeItem === 'Events' && <Events events={events}/>}
                    {activeItem === 'Services' && <Services/>}
                    {activeItem === 'home' && <Home news={news} events={events} tweets={tweets} weather={weather} services={services}/>}
                </div>}
                {loading && <div style={{marginTop: '25em'}}>
                    <b style={{fontSize: '5em'}}>Loading</b> <Icon loading name='spinner' size='massive'/>
                </div>}
            </div>
        );
    }
}

export default Community;