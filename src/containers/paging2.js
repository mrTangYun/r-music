import React, {Component} from 'react';
import {render} from 'react-dom';
import { connect } from 'react-redux';
import union from 'lodash/union';

import Config from '../config'
import api from '../api'


import RecommendList from '../components/music/recommendList'
import PullRefresh from '../components/PullRefresh/PullRefresh'

PullRefresh.defaultProps = {

    moveCount: 0,// 位移系数
    
    // 临界值：当拖动多高时触发正在刷新
    dragThreshold: 0.3,

    // 触发下拉刷新前调用
    beforePull: function(){
      console.log('beforePull');
    }, 


    // 触发下拉刷新后调用  flag：true代表触发了刷新 flag：false代表没有触发下拉刷新只是拉下马又收回去了
    afterPull: function(flag){
      console.log('afterPull');
    },

    // 触发下拉刷新回调 可以用来加载数据
    onRefresh: function(){
      console.log('onRefresh');
    }

};

class Paging extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
      pageIndex: 1,
    }
  }

  componentDidMount(){
    const { pageIndex } = this.state;
    api( Config.musicListAPI,'get',{page:pageIndex,json:true} ).then(
      (musicList) => {
        this.setState({
          list: musicList.plist.list.info,
          pageIndex: pageIndex+1,
        });
      }
    );
  }

  onRefresh(){
    const { pageIndex } = this.state;
    api( Config.musicListAPI,'get',{page:pageIndex,json:true} ).then(
      (musicList) => {
        this.setState({
          list: musicList.plist.list.info,
          pageIndex: pageIndex + 1,
        });
      }
    );
  }

  render() {
    const {list} = this.state;
    return (
      <div className='root'>
        <div className="container" id="container">
          <PullRefresh onRefresh={()=>this.onRefresh()} container={'container'}/>
          <RecommendList data={list}/>
        </div>
      </div>
    );
  }

}

function map(state) {
  return {
  }
}

export default connect(map)(Paging)
