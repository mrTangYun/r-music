import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { mvInfoAction,mvCommentAction,clearMvInfoAction } from '../actions/mv'

class MVPlay extends Component {

  componentDidMount(){
    const { dispatch } = this.props
    const mvid = this.props.match.params.mvid
    dispatch(mvCommentAction(mvid))
    dispatch(mvInfoAction(mvid))
  }


  goBackAndClear(){
    const { dispatch } = this.props;
    dispatch(clearMvInfoAction());
    this.props.history.goBack();
  }


  render() {
    const { mvInfo,comment } = this.props
    return (
      <div className='root'>

        <div className="header"  style={{backgroundColor:'#ce3d3e',color:'#fff',justifyContent:'space-between'}}>
          <div className="arrow-left" onClick={()=>this.goBackAndClear()}></div>
          <div>{mvInfo.name}</div>
          <div></div>
        </div>
          { mvInfo.brs[480]==null ? '' :
            <video width="100%" controls>
              <source src={`http:\/\/www.cenuon.com:3000/mv/url?url=${mvInfo.brs[1080]}`} type="video/mp4"/>
            </video>
          }

        <div className="container">
          <div className="mvInfo">
            <div className="name">{mvInfo.name}</div>
            <div className="line">
              <div className="artistName">歌手：{mvInfo.artistName}</div>
              <div className="playCount">播放：{mvInfo.playCount}</div>
            </div>
            <div className="publishTime">发行：{mvInfo.publishTime}</div>
            <div className="briefDesc">{mvInfo.briefDesc}</div>
            <div className="desc">{mvInfo.desc}</div>
          </div>

          <div style={{margin:'.5rem',fontSize:'1.1rem',color:'#000'}}>精彩评论</div>

          {
            comment.map(item =>
              <CommentItem data={item} />
            )
          }

        </div>

      </div>
    )
  }
}


class CommentItem extends Component{
  commentTime(time){
    let today = new Date();
    let d = new Date(time);
    let year = d.getFullYear();
    let month = d.getMonth() + 1;
    month = month > 9 ? month : '0' + month
    let date = d.getDate();
    date = date > 9 ? date : '0' + date
    let hour = d.getHours();
    hour = hour > 9 ? hour : '0' + hour
    let minutes = d.getMinutes();
    minutes = minutes > 9 ? minutes : '0' + minutes
    let seconds = d.getSeconds();
    seconds = seconds > 9 ? seconds : '0' + seconds

    return year + '-' + month + '-' + date + ' ' + hour + ':' + minutes + ':' + seconds;
  }
  render(){
    const { data } = this.props;
    const { user } = data;
    return (
      <div className="commentItem">
        <div className="user">
          <img src={user.avatarUrl} className="img" />
          <div className="nicknameAndTime">
            <div className="nickname">{user.nickname}</div>
            <div className="time">{this.commentTime(data.time)}</div>
          </div>
          <div className="likedCount"><div className="heart"></div><span>{data.likedCount}</span></div>
        </div>
        <div className="content">{data.content}</div>
      </div>
    )
  }
}

function map(state) {
  return {
    mvInfo: state.mv.mvInfo,
    comment: state.mv.comment
  }
}

export default connect(map)(MVPlay)
