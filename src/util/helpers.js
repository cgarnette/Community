import { 
  getTopUSHeadlines, 
  getTwitterHashtag, 
  getEvents, 
  getWeather
} from './apiService';

export const getRandomInt = (max) => {
    return Math.floor(Math.random() * Math.floor(max));
};

export const getAddress = (event) => {
  let location = event.venue.name;
  location = event.venue.address.address_1 ? location + ' ' + event.venue.address.address_1 : location;
  location = location + ' ' + event.venue.address.localized_address_display;
  return location;
};

export const getDataFull = async () => {
  return await getData(true);
};

export const getDataPartial = async () => {
  return await getData();
};

const getData = async (all=false) => {
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

  let events = [];

  if (all) {
      const response = await getEvents();
      events = response.success;
  }

  return {
    news: {entries},
    tweets,
    events,
    weather,
  };
};