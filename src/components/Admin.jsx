import React, {Component} from 'react';
import { Segment, Button } from 'semantic-ui-react';
import { updateAdminSettings } from '../util/apiService';

class Admin extends Component {
    state = {
        hashtags: [""]
    }

    handleChange = (e, index) => {
        let {hashtags} = this.state;

        if(e.target.id === 'remove') {
            hashtags.splice(e.target.key, 1);
        }
        else if(e.target) {
            hashtags[e.target.id] = e.target.value;
        }
        this.setState({hashtags});
    }

    adminFields = () => {
        return (
            <div>
                {this.locationFields()}
                {this.twitterFields()}
                <Button style={{marginTop: '2em'}} onClick={() => this.submit()}>Submit</Button>
            </div>
        );
    }

    submit = () => {

        updateAdminSettings(this.state);
    }

    locationFields = () => {
        return (
            <Segment>
                <div>
                    <b>Location</b>
                </div>
                <div>
                    {['city', 'state', 'zip', 'radius'].map(field => this.generateField(field))}
                </div>
            </Segment>
        );
    }

    twitterFields = () => {
        return (
            <Segment>
                <div>
                    <b>Hashtags</b>
                </div>
                <div style={{marginTop: '1em'}}>
                    {this.state.hashtags.map((tag, index) => this.hashtagInputFields(index))}
                    <Button onClick={() => this.setState({hashtags: this.state.hashtags.concat([""])})}>Add Tag</Button>
                </div>
            </Segment>
        );
    }

    hashtagInputFields = (index) => {
        return (
            <div style={{marginTop: '1em'}}>
                <input type="text" id={index} onChange={e => this.handleChange(e)}/>
                <Button style={{marginLeft: '1em'}} key={index} id="remove" onClick={(e) => this.handleChange(e)}>Remove</Button> 
            </div>
        );
    }


    generateField = (field) => {
        return (
            <div style={{marginTop: '2em'}}>
                <div>
                    {field}
                </div>
                <div style={{marginTop: '1em'}}>
                    <input type="text" onChange={e => this.setState({[field]: e.target.value})}/>
                </div>
            </div>
        );
    }


    render(){
        return (
            <div style={{marginTop: '5em'}}>
                <b style={{fontSize: '2em'}}>Admin Settings</b>
                <Segment style={{margin: '0 5em 5em 5em'}}>
                    {this.adminFields()}
                </Segment>
            </div>
        );
    }
}

export default Admin;