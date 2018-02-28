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
  Image,
  Dimensions,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';

// import Icon from 'react-native-vector-icons/Ionicons'
import request from '../common/request'
import config from '../common/config'
import ListRow from '../home/ListRow'
var width = Dimensions.get('window').width


var cacheResults = {
  items: [],
  nextPage: 1,
  total: 0
}

export default class List extends Component {
  constructor(props) {
    super(props);

    var ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });
    this.state = {
      dataSource: ds.cloneWithRows([]),
      isLoadingTail: false,
      isRefreshing: false,
    };
  }

  componentDidMount() {
    this._fetchData(0)
  }

  _fetchData(page: number) {

    var that = this // self = this;//为了防止this.setState的this对象不一致

    if (page !== 0) {
      this.setState({
        isLoadingTail: true,
      })
    } else {
      this.setState({
        isRefreshing: true,
      })
    }

    request.get(config.api.base + config.api.creations, {
        accessToken: 'abc',
        page: page,
      })
      .then((responseJson) => {
        console.log(responseJson)
        if (responseJson.success) {
          var items = cacheResults.items.slice()

          if (page !== 0) {
            items = items.concat(responseJson.data)
            cacheResults.nextPage += 1
          } else {

            items.splice(0, items.length); //清空数组
            items = responseJson.data
          }

          cacheResults.items = items
          cacheResults.total = responseJson.total
          console.log(items)

          if (page !== 0) {
            this.setState({
              dataSource: this.state.dataSource.cloneWithRows(items),
              isLoadingTail: false,
            })
          } else {
            this.setState({
              dataSource: this.state.dataSource.cloneWithRows(items),
              isRefreshing: false,
            })
          }
        }

      })
      .catch((error) => {
        console.error(error)
        if (page !== 0) {
          this.setState({
            isLoadingTail: true,
          })
        } else {
          this.setState({
            isRefreshing: true,
          })
        }
      });
  }

  _hasMore() {
    return cacheResults.items.length !== cacheResults.total
  }

  _fetchMoreData() {
    if (!this._hasMore() || this.state.isLoadingTail) {
      return
    }

    var page = cacheResults.nextPage

    this._fetchData(page)
  }

  _onRefresh() {
    if (this.state.isRefreshing) {
      return
    }
    this._fetchData(0)
    console.log('_onRefresh')
  }


  _renderRow(row) {
    return (
      <ListRow row = {row} />
    )
  }

  _renderFooter() {
    if (!this._hasMore() && cacheResults.total !== 0) {
      return (
        <View style={styles.loadingMore}>
          <Text style={styles.loadingText}>没有更多了</Text>
        </View>
      )
    }

    if (!this.state.isLoadingTail) {
      return <View style={styles.loadingMore} />
    }

    return (
      <ActivityIndicator
        style={styles.loadingMore}
      />
    )
  }

  render() {
    return (
      <View style={styles.container}>
        {/* 导航栏相关 */}
        <View style={styles.header}>
          <Text style = {styles.headerTitle}>狗冲说</Text>
        </View>
        {/* 列表相关 */}
        <ListView
          dataSource={this.state.dataSource}
          renderRow={this._renderRow}
          onEndReached = {this._fetchMoreData.bind(this)}
          renderFooter = {this._renderFooter.bind(this)}
          refreshControl={
            <RefreshControl
              refreshing={this.state.isRefreshing}
              onRefresh={this._onRefresh.bind(this)}
              tintColor='#ff6600'
              title='拼命加载中'
              titleColor='#00ff00'
            />
          }
          onEndReachedThreshold = {20} //距离底部的距离 开始触发onEndReached
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

  // item: {
  //   backgroundColor: '#f1f2f3',
  //   width: width,
  //   marginBottom: 10,
  // },

  // title: {
  //   paddingBottom: 5,
  //   paddingTop: 5,
  //   fontSize: 15,
  //   paddingLeft: 6,
  //   backgroundColor: 'white',
  // },

  // thumb: {
  //   width: width,
  //   height: width * 0.5,
  //   resizeMode: 'cover',
  // },

  // play: {
  //   position: 'absolute',
  //   bottom: 14,
  //   right: 18,
  //   width: 46,
  //   height: 46,

  //   paddingLeft: 18,
  //   paddingTop: 9,

  //   backgroundColor: 'transparent',

  //   borderColor: '#fff',
  //   borderWidth: 1,
  //   borderRadius: 23,
  //   color: '#ed7b66',
  // },

  // itemFooter: {
  //   flexDirection: 'row',
  //   backgroundColor: '#eee',
  //   justifyContent: 'space-between',
  // },

  // handleBox: {
  //   flexDirection: 'row',
  //   padding: 10,
  //   justifyContent: 'center',
  //   backgroundColor: '#fff',
  //   width: width / 2 - 0.5,
  // },
  // handelText: {
  //   paddingLeft: 12,
  //   fontSize: 18,
  //   color: '#333'
  // },
  // up: {
  //   fontSize: 20,
  //   color: '#333',
  // },
  // commentIcon: {
  //   fontSize: 20,
  //   color: '#333',
  // },

  loadingMore: {
    marginVertical: 20,
  },
  loadingText: {
    color: '#777',
    textAlign: 'center',
  },
});

module.exports = List