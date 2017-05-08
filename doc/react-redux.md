# redux 个人整理
## 序
阅读了redux的文档后，并参与了一个练手项目[r-music](https://github.com/ScorpionJay/r-music)后，通过自己的理解，整理了这篇文档。初学，所以一定会有不详或者错误的地方。

开发这个项目，我参阅的学习文档如下：
> redux中文文档：[http://www.redux.org.cn/](http://www.redux.org.cn/)
> 

通过我自己的理解方式，简单得整理了react、redux、react-redux三者之间的关系图，如下：

![](relation.png)



# 以search为例，讲解redux，react-redux
## Provider
#### src/index.js
	import configureStore from './stores'
	const store = configureStore()

	<Provider store={store}>
		<Router history={browserHistory} routes={routers} />
	</Provider>
#### src/store/index.js
	export default function(initialState) {
		let createStoreWithMiddleware
	
		// 判断环境是否logger
		if (process.env.NODE_ENV === 'production') {
			createStoreWithMiddleware = applyMiddleware(thunk)(createStore);
		}else{
			//开发环境在console可以看到整个状态树的实时日志
			const logger = createLogger();
			createStoreWithMiddleware = applyMiddleware(thunk,logger)(createStore);
		}
		let store = createStoreWithMiddleware(reducers, initialState);
		// get token from storage
		store.dispatch(login(storage.get('token')));
		return store;
	};

## UI / component
#### src/containers/search.js
	import React, { Component, PropTypes } from 'react'
	import { connect } from 'react-redux'
	
	import { searchHotAPI,searchResultAPI,clearSearchResultAPI} from '../actions/search'
	
	class Search extends Component {
	
	  constructor(props) {
	    super(props);
	  }
	
	  componentDidMount(){
	    const { dispatch } = this.props
	    dispatch(searchHotAPI())
	  }
	
	  searchEvt(keyword,page=1){
	    const { dispatch } = this.props;
	    keyword = keyword || this.refs.keyword.value
	    if(keyword!=''){
	      dispatch(searchResultAPI(keyword, page));
	    }else{
	      dispatch(clearSearchResultAPI());
	    }
	    this.refs.keyword.value = keyword;
	  }
	
	
	  render() {
	    const { dispatch,controll,search } = this.props;
	    return (
	      <div className='root' style={{fontSize:'1.2rem'}}>

			//...

	      </div>
	    )
	  }
	}
	
	function map(state) {
	  return {
	    search: state.search,
	    controll: state.music.controll
	  }
	}
	
	export default connect(map)(Search)

## redux
#### src/actions/search.js
	import Config from '../config'
	import { spin,spinHidden } from './spin'
	import api from '../api'
	
	import Storage from '../storage'
	
	//定义常量
	export const SEARCH_HOT = 'SEARCH_HOT'
	export const SEARCH_RESULT = 'SEARCH_RESULT'
	
	//actionCreator,这里是一个函数，返回action对象
	const searchHot = (obj) => {return {type:SEARCH_HOT, obj}}
	const searchResult = (obj) => {return {type:SEARCH_RESULT, obj}}
	
	//搜索热门关键字
	export function searchHotAPI(){
		return async dispatch => {
			try{
				let hots = await api( Config.searchHotAPI );
				dispatch(searchHot(hots.data.info));
			} catch(error) {
				console.log(error);
			}
		}
	}
	
	//通过关键字搜索
	export function searchResultAPI(keyword,page){
		return async dispatch => {
			try {
				let result = await api( Config.searchResultAPI, 'get', {keyword,page} );
				//搜索历史存到localStorage
				setSearchHistory(keyword);
				dispatch(searchResult(result.data.info));
			} catch(error) {
				console.log(error);
			}
		}
	}

#### src/reducer/search.js
	import { combineReducers } from 'redux'
	import { SEARCH_HOT,SEARCH_RESULT } from '../actions/search'
	
	function hots(state = [], action){
	  switch(action.type) {
	    case SEARCH_HOT:
	      return action.obj;
	    default:
	      return state;
	  }
	}
	
	function result(state = [], action){
	  switch(action.type) {
	    case SEARCH_RESULT:
	      return action.obj;
	    default:
	      return state;
	  }
	}
	
	
	const Reducers = combineReducers({
	  hots,result,
	})
	
	export default Reducers

#### src/reducer/index.js
	import { combineReducers } from 'redux'
	//...
	import  search from './search'
	
	const reducers = combineReducers({
	  //...
	  search,
	})
	
	export default reducers
