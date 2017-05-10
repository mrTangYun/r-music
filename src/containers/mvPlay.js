import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { mvInfoAction } from '../actions/mv'

class MVPlay extends Component {

  componentDidMount(){
    const { dispatch } = this.props
    const mvid = this.props.match.params.mvid
    dispatch(mvInfoAction(mvid))
  }
  render() {
    const { mvInfo } = this.props
    console.log(mvInfo)
    return (
      <div className='root'>

        <div className="header"  style={{backgroundColor:'#ce3d3e',color:'#fff'}}>
          播放MV
        </div>

        <div className="container">
          <video width="320" height="240" controls>
            <source src={'http://localhost:3000/mv/url?url='+mvInfo} type="video/mp4"/>
          </video>
        </div>

      </div>
    )
  }
}

function map(state) {
  return {
    mvInfo: state.mv.mvInfo
  }
}

export default connect(map)(MVPlay)
