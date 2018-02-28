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
  TouchableHighlight,
  Image,
  Dimensions,
  AlertIOS,

} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons'
import request from '../common/request'
import config from '../common/config'

var width = Dimensions.get('window').width

export default class ListRow extends Component {
  constructor(props) {
    super(props);

    var row = this.props.row
    this.state = {
      row: row,
      up: row.voted, //是否被点赞
    };
  }

  shouldComponentUpdate() {
    return true
  }

  componentWillReceiveProps(props) {
    this.setState({
      row: this.props.row
    })
  }

  _up() {

    var up = !this.state.up
    var row = this.state.row

    var body = {
      id: row._id,
      up: up ? '1' : '0',
      accessToken: 'abc',
    }

    var url = config.api.base + config.api.up
    request.post(url, body)
      .then((responseJson) => {
        if (responseJson && responseJson.success) {

          this.setState({
            up: up,
          })
        } else {
          AlertIOS.alert('点赞失败，稍后重试')
        }
      })
      .catch((err) => {
        AlertIOS.alert('点赞失败，稍后重试')
      })
  }

  render() {
    return (
      <TouchableHighlight>
        <View style = {styles.item}>
          <Text style={styles.title}>{this.state.row.title}</Text>
          <Image
            source={{uri:this.state.row.thumb}}
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
                name = {this.state.up ? 'ios-heart' : 'ios-heart-outline'}
                size={28}
                style={[styles.up,this.state.up ? null:styles.down]}
                onPress={this._up.bind(this)} 
              />
              <Text style={styles.handelText} onPress={this._up.bind(this)}>喜欢</Text>
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
}

const styles = StyleSheet.create({
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
    color: '#ed7b66',
  },

  down: {
    fontSize: 20,
    color: '#333',
  },

  commentIcon: {
    fontSize: 20,
    color: '#333',
  },
})

module.exports = ListRow