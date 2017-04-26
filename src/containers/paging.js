import React, {Component} from 'react';
import {render} from 'react-dom';
//import promise from 'es6-promise';
import union from 'lodash/union';
import iScroll from 'iscroll/build/iscroll-probe';
import ReactIScroll from '../components/reactjs-iscroll/scripts'
//import callApi from './fetch';

import Config from '../config'
import api from '../api'


import RecommendList from '../components/music/recommendList'

// Promise 兼容性处理
//promise.polyfill();

export default class Paging extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
      currentPage: 1,
      lastPage: false
    };
  }

  componentWillMount() {
    this.loadData();
    //this.handleRefresh.bind(this)
  }

  //调用 IScroll refresh 后回调函数
  handleRefresh(downOrUp, callback) {
    let {currentPage, lastPage} = this.state;
    if (downOrUp === 'up') { // 加载更多
      if (currentPage === 50) {
        lastPage = true;
      } else {
        currentPage++;
      }
    } else { // 刷新
      lastPage = false;
      currentPage = 1;
    }
    this.setState({
      currentPage,
      lastPage
    }, () => {
      this.loadData(downOrUp, callback);
    });
  }

  //加载数据
  loadData(downOrUp, callback) {
    const {currentPage,list} = this.state;
    api( Config.musicListAPI,'get',{page:currentPage,json:true} ).then(
      (musicList) => {
        this.setState({
          list: downOrUp === 'up' ? union(list, musicList.plist.list.info) : musicList.plist.list.info
        });
        if (callback && typeof callback === 'function') {
          callback();
        }
      },
      (error) => {
        if (callback && typeof callback === 'function') {
          callback();
        }
      }
    );
  }

  render() {
    const {list} = this.state;
    const options = {
      //click: true,
      mouseWheel: true,
    }
    return (
      <div className="container">
        <ReactIScroll iScroll={iScroll} handleRefresh={this.handleRefresh.bind(this)}>
          <RecommendList data={list}/>
        </ReactIScroll>
      </div>
    );
  }
}

//render(<Paging/>, document.getElementById('layout'));
