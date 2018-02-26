/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {
  Component
} from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TabBarIOS,
} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons'

import List from './app/home/index'
import Edit from './app/edit/index'
import Mine from './app/mine/index'

export default class DogDemo extends Component {

  constructor(props) {
    super(props)
    this.state = {
      selectedTab: 'list',
    }
  }

  render() {
    return (
      <TabBarIOS
        unselectedTintColor="#999999"
        tintColor="#ee735c"
        >
        <Icon.TabBarItem
          title="首页"
          iconName = 'ios-home-outline'
          selectedIconName = 'ios-home'
          selected={this.state.selectedTab === 'list'}
          onPress={() => {
            this.setState({
              selectedTab: 'list',
            });
          }}>
          <List />
        </Icon.TabBarItem>
        <Icon.TabBarItem 
          iconName = 'ios-videocam-outline'
          selectedIconName = 'ios-videocam'
          title="发布"
          selected={this.state.selectedTab === 'edit'}
          onPress={() => {
            this.setState({
              selectedTab: 'edit',
            });
          }}>
          <Edit />
        </Icon.TabBarItem>
        <Icon.TabBarItem
          iconName = 'ios-person-outline'
          selectedIconName = 'ios-person'
          // renderAsOriginal
          title="我的"
          selected={this.state.selectedTab === 'mine'}
          onPress={() => {
            this.setState({
              selectedTab: 'mine',
            });
          }}>
          <Mine />
        </Icon.TabBarItem>
      </TabBarIOS>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },

});

AppRegistry.registerComponent('DogDemo', () => DogDemo);