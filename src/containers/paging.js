import React, {Component} from 'react';
import {render} from 'react-dom';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import Beat from '../components/music/beat'
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

class Paging extends Component {
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
    const { controll } = this.props
    const {list} = this.state;
    return (
      <div className='root'>
        <div className="header" style={{backgroundColor:'#ce3d3e',color:'#fff',display:'flex',justifyContent: 'space-between',padding:'0 1rem'}}>
          <div onClick={()=>this.back()} style={{display:'flex',flex:1}}>返回</div>
          <div style={{display:'flex',flex:1,justifyContent: 'center'}}>歌单</div>
          <Link style={{display:'flex',flex:1,justifyContent: 'flex-end'}}  to='/play'>
            <Beat  beat={controll === 'play'} />
          </Link>
        </div>
        <div className="container">
          <ReactIScroll iScroll={iScroll} handleRefresh={this.handleRefresh.bind(this)}>
            <RecommendList data={list}/>
          </ReactIScroll>
        </div>
      </div>
    );
  }
}

function map(state) {
  return {
    controll:state.music.controll,
  }
}

export default connect(map)(Paging)
