import React, {Component} from 'react';
import {Card, CardHeader, CardText, CardMedia} from 'material-ui/Card';
import queryString from 'query-string';

class GoogleMap extends Component {
  constructor(props) {
    super(props);

    this.state = {
      map: Object.assign({
        center: 'Seoul',
        zoom: 17,
        size: '600x300',
        maptype: 'roadmap',
        format: 'png'
      })
    };
  }

  render() {
    return (
        <div>
            <img 
              src={`https://maps.googleapis.com/maps/api/staticmap?${queryString.stringify(this.state.map)}`}
              style={{width:'100%',height:'auto'}}
            />
        </div>
    );
  }
}

GoogleMap.propTypes = {
	map: React.PropTypes.object
};

class Contact extends Component {
	render() {
		return (
			<Card>
				<CardHeader title="Contact" subtitle="This is the contact section"/>
				<CardMedia>
          <GoogleMap/>
				</CardMedia>
				<CardText>
          Here is for address
				</CardText>
			</Card>
		);
	}
}

export default Contact;