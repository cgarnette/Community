import React, {Component} from 'react';
import { Menu, Icon } from 'semantic-ui-react';
import News from '../components/News';
import Events from '../components/Events';
import Home from '../components/Home';
import Services from '../components/Services';
import { getDataPartial, getDataFull } from '../util/helpers';

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
            let response = {};
            if (this.state.events.length < 2) {
                response = await getDataFull();
            } else {
                response = await getDataPartial();
            }

            this.setState({
                ...response,
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
                    <b><h1>Loading</h1></b> <Icon style={{marginTop: '.3em'}} loading name='spinner' size='massive'/>
                </div>}
            </div>
        );
    }
}

export default Community;