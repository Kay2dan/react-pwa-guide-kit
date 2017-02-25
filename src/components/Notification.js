import React, {Component} from 'react';
import {TextField, Snackbar} from 'material-ui';
import {Card, CardText, CardTitle} from 'material-ui/Card';
import FirebaseMessaging from '../services/FirebaseMessaging';

class Notification extends Component {
  constructor(props) {
    super(props);
    
    this.message = new FirebaseMessaging(Object.assign(FIREBASE_CONFIG, {
      handleMessage: this.handleMessage.bind(this)
    }));

    this.state = {
      token: '',
      toast: false,
      toastMessage: ''
    };
  }

  componentDidMount() {
    this.message.requirestPermission().then(token => {
      this.setState({token})
    })
    .catch(err => {
      console.log(err)
    });
  }

  handleMessage = ({notification: {title = 'Title', body = 'Body'} = {}}) => {
    this.setState({
      toast: true,
      toastMessage: `${title}: ${body}`
    });
  }

  render() {
    return (
      <div>
        <Card>
          <CardTitle title="Message" subtitle="Here is token for the browser"/>
          <CardText>
            <TextField
              floatingLabelText="Token"
              disabled={true}
              fullWidth={true}
              multiLine={true}
              rows={2}
              value={this.state.token}
            />
          </CardText>
        </Card>
        <Snackbar
          open={this.state.toast}
          message={this.state.toastMessage}
          autoHideDuration={4000}
          onRequestClose={() => this.setState({toast: false})}
        />
      </div>
    );
  }
}

export default Notification;