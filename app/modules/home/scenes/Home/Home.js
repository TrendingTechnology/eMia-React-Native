// How to add Firebase Auth with react native !!!
// https://github.com/g6ling/React-Native-Tips/tree/master/How_to_add_Firebase_Auth_with_react_native

// A well tested feature rich Firebase implementation for React Native,
// supporting both iOS & Android platforms for 12+ Firebase modules
// (including a feature rich Notifications implementation)
// https://github.com/invertase/react-native-firebase

// react native module for firebase cloud messaging and local notification
// https://github.com/evollu/react-native-fcm

// Camera
// https://github.com/react-native-community/react-native-camera
// https://github.com/wix/react-native-camera-kit
// https://www.npmjs.com/package/react-native-grid-component?activeTab=readme
// npm install react-native-grid-component --save

import React from 'react';
import ReactNative from 'react-native';
import Grid from 'react-native-grid-component';
import NativeBase from 'native-base';

import {Actions} from 'react-native-router-flux';
import {connect} from 'react-redux';

import styles from './styles';
import Movie from './components/grid_item';

import { actions as home } from '../../index';
import { config as global } from '../../index';
import { actions as auth } from '../../../auth/index';

import { Container, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon, Text } from 'native-base'

const {
  AppRegistry,
  Image,
  StyleSheet,
  View,
  Alert,
  TouchableHighlight
} = ReactNative;

const {
  Component
} = React;

const {
  fetchUsers
} = home;
const {
  login
} = auth;
const {
  APP_NAME
} = global;


export class Home extends Component {
  constructor (props) {
    super(props);
    this.state = {
      dataSource: null,
      loaded: false,
      data: null
    };
    this.onCompletion = this.onCompletion.bind(this);
    this.onFailed = this.onFailed.bind(this);
  }

  componentDidMount () {
    this.fetchData();
  }

  fetchData () {
    this.props.fetchUsers(this.onCompletion, this.onFailed);
  }

  onCompletion (items) {
    this.setState({
      dataSource: items,
      loaded: true
    });
  }

  onFailed (error) {
    if (error != null) {
      Alert.alert('Oops!', error.message);
    }
    this.setState({
      dataSource: [],
      loaded: true
    });
  }

  render () {
    if (!this.state.loaded) {
      return this.renderLoadingView();
    }
    return (
      <Container>
        <Content
          contentContainerStyle={{ flex: 1, backgroundColor: '#fff' }}
          padder={false}>
          <Grid
            style={styles.list}
            renderItem={this.renderItem}
            renderPlaceholder={this.renderPlaceholder}
            data={this.state.dataSource}
            itemsPerRow={2}
            itemHasChanged={(d1, d2) => d1 !== d2}
          // callback on reaching the end of the available data
          // onEndReached={() =>
          //   this.setState({
          //     data: [...this.state.data, ...dataSource],
          //   })
          // }
          />
        </Content>
      </Container>
    )
  }

  renderLoadingView () {
    return (
      <View>
        <Text>
          Loading topics...
        </Text>
      </View>
    )
  }

  renderPlaceholder () {
    return (
      <View style={styles.item}>
        <Text>
          Placeholder
        </Text>
      </View>
    )
  }

  renderItem (item) {
    var name = item.value.username
    var key = item.key
    return (
      <View style={styles.item} key={key}>
        <Text>
          {name}
        </Text>
      </View>
    ) 
  }
}

export default connect(null, { login, fetchUsers })(Home)
