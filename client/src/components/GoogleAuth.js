import React from 'react';
import { connect } from 'react-redux';

import { signIn, signOut } from '../actions';

class GoogleAuth extends React.Component {
  componentDidMount() {
    // the callback will only be called after the client auth library is load

    // this will only load the library, nothing here is keeping the user through the auth process
    window.gapi.load('client:auth2', () => {
      window.gapi.client
        .init({
          clientId:
            '484695258013-k1vqhb1027ch9dun1e319l8o20g24479.apps.googleusercontent.com',
          scope: 'profile email',
        })
        .then(() => {
          // here i'm creating another property called auth for this component and putting inside an instance of the authentication instance
          this.auth = window.gapi.auth2.getAuthInstance();

          // here i'm creating a piece of state with the mane isSignedIn, which will take the value from the auth instance
          this.onAuthChange(this.auth.isSignedIn.get());
          // listen returns a boolean value
          // true if user signed in | false if iser signed out
          // that's why onAuthChange received the isSignedIn as aparameter while aparently there is no parameter in the call here
          this.auth.isSignedIn.listen(this.onAuthChange);
        });
    });
  }

  onAuthChange = (isSignedIn) => {
    // remember: this will update the button, because when use setstate the component is 'reloaded'
    if (isSignedIn) {
      this.props.signIn(this.auth.currentUser.get().getId());
    } else {
      this.props.signOut();
    }
  };

  onSignInClick = () => {
    this.auth.signIn();
  };

  onSignOutClick = () => {
    this.auth.signOut();
  };

  renderAuthbutton() {
    if (this.props.isSignedIn === null) {
      return null;
    } else if (this.props.isSignedIn) {
      // this.logProfileInfo();
      return (
        <button
          onClick={this.onSignOutClick}
          className="bg-purple-600 text-white px-4 py-2 shadow"
        >
          <i className="fab fa-google"></i>&nbsp; Sign Out
        </button>
      );
    } else {
      return (
        <button
          onClick={this.onSignInClick}
          className="bg-purple-600 text-white  px-4 py-2 shadow"
        >
          <i className="fab fa-google"></i>&nbsp; Sign In With Google
        </button>
      );
    }
  }

  render() {
    return <div className="GoogleAuth">{this.renderAuthbutton()}</div>;
  }

  logProfileInfo() {
    console.log(
      'ID de Google: ',
      this.auth.currentUser.get().getBasicProfile().getId()
    );

    console.log(
      'Email: ',
      this.auth.currentUser.get().getBasicProfile().getEmail()
    );

    console.log(
      'Avatar URL: ',
      this.auth.currentUser.get().getBasicProfile().getImageUrl()
    );
    console.log(
      'Nombre: ',
      this.auth.currentUser.get().getBasicProfile().getName()
    );
  }
}

const mapStateToProps = (state) => {
  return { isSignedIn: state.auth.isSignedIn };
};

export default connect(mapStateToProps, { signIn, signOut })(GoogleAuth);
