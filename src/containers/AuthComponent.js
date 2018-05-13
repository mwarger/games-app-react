import React, { Component } from 'react';
import { Authenticator } from 'aws-amplify-react';
import { Button } from 'react-bootstrap';

const Buttons = ({ facebookSignIn, googleSignIn, prefix }) => {
  return (
    <Fragment>
      <Button
        color="facebook"
        fluid
        onClick={facebookSignIn}
        className="socialButtonMargin"
        style={{ marginBottom: 10 }}
      >
        <Icon name="facebook" /> {prefix} with Facebook
      </Button>
      <Button
        color="google plus"
        fluid
        onClick={googleSignIn}
        className="socialButtonMargin"
      >
        <Icon name="google" /> {prefix} with Google
      </Button>
    </Fragment>
  );
};

export default class AuthComponent extends Component {
  state = { enabledFederated: false };
  handleStateChange = state => {
    console.log(state);
    if (state === 'signedIn') {
      this.props.userHasAuthenticated(true);
    }
  };

  enabledSocialLogin = () => {
    this.setState({ enabledFederated: !this.state.enabledFederated });
  };

  render() {
    const federated = {
      google_client_id: '123',
      facebook_app_id: '456'
    };

    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center'
        }}
      >
        <Button
          style={{ width: '500px', margin: '0 auto' }}
          onClick={this.enabledSocialLogin}
        >
          Enabled Social Login
        </Button>
        {this.state.enabledFederated ? (
          <Authenticator
            onStateChange={this.handleStateChange}
            federated={federated}
          />
        ) : (
          <Authenticator onStateChange={this.handleStateChange} />
        )}
      </div>
    );
  }
}
