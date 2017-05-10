import { combineReducers } from 'redux'
import  home from './home'
import  login from './login'
import  spin from './spin'
import  message from './message'
import  dialog from './dialog'
import  user from './user'
import  album from './album'
import  music from './music'
import  search from './search'
import  rank from './rank'
import  mv from './mv'

const reducers = combineReducers({
  home,
  login,
  spin,
  message,
  dialog,
  user,
  album,
  music,
  search,
  rank,
  mv
})

export default reducers