import React, {Component} from 'react';
import {render} from 'react-dom';
//import promise from 'es6-promise';
import union from 'lodash/union';
import iScroll from 'iscroll/build/iscroll-probe';
import ReactIScroll from 'reactjs-iscroll'
//import callApi from './fetch';

import Config from '../config'
import api from '../api'

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
  }

  //调用 IScroll refresh 后回调函数
  handleRefresh(downOrUp, callback) {
    //真实的世界中是从后端取页面和判断是否是最后一页
    let {currentPage, lastPage} = this.state;
    if (downOrUp === 'up') { // 加载更多
      if (currentPage === 5) {
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

  async loadData(downOrUp, callback) {
    const {currentPage} = this.state;
    api( Config.musicListAPI,'get',{page:currentPage,json:true} ).then(
      (musicList) => {
        this.setState({
          list: downOrUp === 'up' ? union(list, musicList.plist.list.info) : musicList.plist.list.info
        });
      }
    );




    // let musicList = await api( Config.musicListAPI,'get',{page:page,json:true} );
    // this.setState({
    //   list: downOrUp === 'up' ? union(list, musicList.plist.list.info) : musicList.plist.list.info;
    // });


    // const url = `../json/person/${currentPage}.json`;
    // callApi({url}).then(
    //   ({json, response}) => {
    //     //这里为了展示效果，延长1秒
    //     setTimeout(() => {
    //       const {list} = this.state;
    //       this.setState({
    //         list: downOrUp === 'up' ? union(list, json.data.list) : json.data.list
    //       });
    //       if (callback && typeof callback === 'function') {
    //         callback();
    //       }
    //     }, 1000);
    //   },
    //   (error) => {
    //     if (callback && typeof callback === 'function') {
    //       callback();
    //     }
    //   });

  }

  render() {
    const {list} = this.state;
    return (
      <div>
        <ReactIScroll iScroll={iScroll} handleRefresh={this.handleRefresh.bind(this)} className="example">
          <ul className="example-paging">
            {list.map((item) =>
              <li>{item.specialname}</li>
            )}
          </ul>
        </ReactIScroll>
      </div>
    );
  }
}

//render(<Paging/>, document.getElementById('layout'));
