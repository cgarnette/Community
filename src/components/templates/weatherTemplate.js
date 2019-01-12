import React from 'react';
import { Icon } from 'semantic-ui-react';

export const Weather = (props) => {
    const { weather } = props;

    const snow = ['snow', 'blizzard', 'flurry'];
    const rain = ['rain', 'wet', 'drizzle'];
    const temp = weather.temp || "unknown";
    const conditions = weather.conditions || [];
    
    let icon = "sun";
    conditions.forEach(condition => {
        const test = condition.main.toLowerCase();
        icon = snow.includes(test) ? 'snow' : (rain.includes(test) ? 'rain' : 'sun');
    });

    return (
        <div style={{display: 'flex', flexDirection: 'row'}}>
            <div>
                <b style={{display: 'flex'}}><h1>{temp + "°"}</h1></b>
                {conditions.length > 0 && conditions.map(condition => {
                    return (
                        <div style={{marginTop: '.5em'}}>
                            <b style={{display: 'flex', fontSize: '2em'}}><h2>{(condition.description || "Unknown")}</h2></b>
                        </div>
                    );
                })}
            </div>

            <div style={{width: '50%', display: 'flex', justifyContent: 'flex-end'}}>
                <Icon name={icon} size="huge"/>
            </div>
        </div>
    );
};