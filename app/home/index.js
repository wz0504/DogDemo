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
  ListView,
  TouchableHighlight,
  Image,
  Dimensions,
} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons'
import request from '../common/request'
import config from '../common/config'
var width = Dimensions.get('window').width


export default class List extends Component {
  constructor(props) {
    super(props);
    var ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });
    this.state = {
      dataSource: ds.cloneWithRows([]),
    };
  }

  componentDidMount() {
    this._fetchData()
  }

  _fetchData() {
    request.get(config.api.base + config.api.creations)
      .then((responseJson) => {
        console.log(responseJson)
        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(responseJson.data)
        })
      })
      .catch((error) => {
        console.error(error)
      });
  }

  renderRow(row) {
    return (
      <TouchableHighlight>
        <View style = {styles.item}>
          <Text style={styles.title}>{row.title}</Text>
          <Image
            source={{uri:row.thumb}}
            style={styles.thumb} 
          >
            <Icon 
              name = 'ios-play'
              size={28}
              style={styles.play}
            />
          </Image>

          {/* 底部 点赞 和 评论 功能 */}
          <View style={styles.itemFooter}>
            {/* 点赞 */}
            <View style={styles.handleBox}>
              <Icon 
                name='ios-heart-outline'
                size={28}
                style={styles.up} />
              <Text style={styles.handelText}>喜欢</Text>
            </View>
            {/* 评论 */}
            <View style={styles.handleBox}>
              <Icon 
                name='ios-chatboxes-outline'
                size={28}
                style={styles.commentIcon} />
              <Text style={styles.handelText}>评论</Text>
            </View>

          </View>
        
        </View>
      </TouchableHighlight>
    )

  }

  render() {
    return (
      <View style={styles.container}>
        {/* 导航栏相关 */}
        <View style={styles.header}>
          <Text style = {styles.headerTitle}>狗狗说</Text>
        </View>
        {/* 列表相关 */}
        <ListView
          dataSource={this.state.dataSource}
          renderRow={this.renderRow}
          style = {styles.listView}
          automaticallyAdjustContentInsets = {false}
          enableEmptySections={true}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center', 
    // alignItems: 'center',
    backgroundColor: '#f1f2f3',
  },
  header: {
    paddingTop: 25,
    paddingBottom: 12,
    backgroundColor: '#ee735c',
  },
  headerTitle: {
    color: 'white',
    fontSize: 17,
    fontWeight: "600",
    textAlign: 'center',
  },

  // listView: {
  //   marginBottom: -49,

  // },

  item: {
    backgroundColor: '#f1f2f3',
    width: width,
    marginBottom: 10,
  },

  title: {
    paddingBottom: 5,
    paddingTop: 5,
    fontSize: 15,
    paddingLeft: 6,
    backgroundColor: 'white',
  },

  thumb: {
    width: width,
    height: width * 0.5,
    resizeMode: 'cover',
  },

  play: {
    position: 'absolute',
    bottom: 14,
    right: 18,
    width: 46,
    height: 46,

    paddingLeft: 18,
    paddingTop: 9,

    backgroundColor: 'transparent',

    borderColor: '#fff',
    borderWidth: 1,
    borderRadius: 23,
    color: '#ed7b66',
  },

  itemFooter: {
    flexDirection: 'row',
    backgroundColor: '#eee',
    justifyContent: 'space-between',
  },

  handleBox: {
    flexDirection: 'row',
    padding: 10,
    justifyContent: 'center',
    backgroundColor: '#fff',
    width: width / 2 - 0.5,
  },
  handelText: {
    paddingLeft: 12,
    fontSize: 18,
    color: '#333'
  },
  up: {
    fontSize: 20,
    color: '#333',
  },
  commentIcon: {
    fontSize: 20,
    color: '#333',
  },


});

module.exports = List