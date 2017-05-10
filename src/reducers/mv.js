import { combineReducers } from 'redux'
import { MV_RECOMMEND,MV_NEWEST,MV_INFO } from '../actions/mv'

function recommend(state = [], action){
  switch(action.type) {
    case MV_RECOMMEND:
      return action.obj;
    default:
      return state;
  }
}

function newest(state = [], action){
  switch(action.type) {
    case MV_NEWEST:
      return action.obj;
    default:
      return state;
  }
}

function mvInfo(state = "http://v4.music.126.net/20170511055844/a9faa333e80afc62866cc8ca70a91685/web…c/ICUwMCRgYmRiIjAwMSQgYA==/mv/5516708/3e0541be684a1a56e48bcb9cbf84f3c1.mp4", action){
  switch(action.type) {
    case MV_INFO:
      return action.obj;
    default:
      return state;
  }
}

const Reducers = combineReducers({
  recommend,newest,mvInfo
})

export default Reducers