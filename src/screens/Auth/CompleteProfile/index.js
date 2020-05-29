import React from 'react';
import {Actions} from 'react-native-router-flux';
import {connect} from 'react-redux';

import {actions as auth} from '@screens/Auth/index';
import AuthForm from '@components/AuthForm';

const {updateUserProfileData} = auth;

const fields = [
  {
    key: 'username',
    label: 'Username',
    placeholder: 'Username',
    autoFocus: false,
    secureTextEntry: false,
    value: '',
    type: 'default',
  },
];

const error = {
  general: '',
  username: '',
};

class CompleteProfile extends React.Component {
  constructor() {
    super();
    this.state = {
      error: error,
    };

    this.onSubmit = this.onSubmit.bind(this)
    this.onSuccess = this.onSuccess.bind(this)
    this.onError = this.onError.bind(this)
  }

  onSubmit(data) {
    this.setState({error: error}); // clear out error messages

    // attach user id
    const {user} = this.props;
    data.id = user.uid;

    this.props.updateUserProfileData(data, this.onSuccess, this.onError);
  }

  onSuccess() {
    Actions.Main();
  }

  onError(_error) {
    let errObj = this.state.error;

    if (error.hasOwnProperty('message')) {
      errObj.general = error.message;
    } else {
      let keys = Object.keys(_error);
      keys.map((key, index) => {
        errObj[key] = _error[key];
      });
    }

    this.setState({error: errObj});
  }

  render() {
    return (
      <AuthForm
        fields={fields}
        showLabel={false}
        onSubmit={this.onSubmit}
        buttonTitle={'CONTINUE'}
        error={this.state.error}
      />
    );
  }
}

export default connect(null, {updateUserProfileData})(CompleteProfile);
