import { 
    COMMUNITY_NEWS_ENDPOINT, 
    COMMUNITY_SERVICES_TWITTER_ENDPOINT, 
    COMMUNITY_EVENTS_EVENTBRITE_ENDPOINT,
    WEBPAGE_ADMIN,
    COMMUNITY_ADMIN_ENDPOINT
 } from './constants';

export const getTopUSHeadlines = async () => {
    return getNews(COMMUNITY_NEWS_ENDPOINT + WEBPAGE_ADMIN);
};

export const getTwitterHashtag = async () => {
    return getNews(COMMUNITY_SERVICES_TWITTER_ENDPOINT + WEBPAGE_ADMIN);
};

export const getNews = async (url) => {
    return await fetch(url, {method: 'GET'}).then(response => response.json()).then(data => data).catch(error => console.log(error));
};

export const getEvents = async (city='arlington', state='va', radius='5') => {
    return await fetch(`${COMMUNITY_EVENTS_EVENTBRITE_ENDPOINT}${WEBPAGE_ADMIN}`, {method: 'GET'})
        .then(response => response.json()).then(data => data)
        .catch(error => console.log(error));
};

export const updateAdminSettings = async (adminSettings) => {

    const settings = {
        hashtags: adminSettings.hashtags,
        location: {
            city: adminSettings.city,
            state: adminSettings.state,
            radius: adminSettings.radius
        },
        username: 'admin_0'
    }
    return await fetch(COMMUNITY_ADMIN_ENDPOINT, {
        method: 'PUT', 
        body: JSON.stringify(settings),
        headers: {
            "Content-Type": "application/json"
        },
    })
        .then(response => response.json()).then(data => data)
        .catch(error => console.log(error));
};