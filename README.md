# r-music
## 序
该项目作为react技术栈的练手项目，使用了酷狗和网易云的数据。

其中酷狗的数据拉取，相对容易；网易云数据的拉取，参照： [https://binaryify.github.io/NeteaseCloudMusicApi/](https://binaryify.github.io/NeteaseCloudMusicApi/)

感谢[ScorpionJay](https://github.com/ScorpionJay)同学，该项目前期的工作，大量都由他完成。

- 源码地址：[https://github.com/ScorpionJay/r-music](https://github.com/ScorpionJay/r-music)
- MV数据暂未合到主干：[https://github.com/li772091958/r-music](https://github.com/li772091958/r-music)

前端坑多，该项目还有很多bug，欢迎一起学习交流，共同爬坑。

## 目录
- [参考文档](#参考文档)
- [在线体验](#在线体验)
- [效果展示](#效果展示)
- [项目说明](#项目说明)
	- [技术栈](#技术栈)
	- [项目结构](#项目结构)
	- [项目运行](#项目运行)
- [知识梳理](#知识梳理)

## 参考文档

开发这个项目，我参阅的学习文档如下：
 
-  React 入门实例教程：[http://www.ruanyifeng.com/blog/2015/03/react](http://www.ruanyifeng.com/blog/2015/03/react)
-  React Router 使用教程：[http://www.ruanyifeng.com/blog/2016/05/react_router.html](http://www.ruanyifeng.com/blog/2016/05/react_router.html)
-  ECMAScript 6 入门：[http://es6.ruanyifeng.com/](http://es6.ruanyifeng.com/)
-  redux中文文档：[http://www.redux.org.cn/](http://www.redux.org.cn/)
-  Redux 入门教程（三）——React-Redux 的用法：[http://www.ruanyifeng.com/blog/2016/09/redux_tutorial_part_three_react-redux.html](http://www.ruanyifeng.com/blog/2016/09/redux_tutorial_part_three_react-redux.html)
-  Flex 布局教程——语法篇：[http://www.ruanyifeng.com/blog/2015/07/flex-grammar.html](http://www.ruanyifeng.com/blog/2015/07/flex-grammar.html)

## 在线体验

[http://cenuon.com:8666](http://cenuon.com:8666)

![-](qcode.png)

## 效果展示
![个性推荐](prtscn-recommend.png) ![排行榜列表](prtscn-rank.png) 

![歌单详情](prtscn-albuminfo.png) ![搜索](prtscn-search1.png)

![播放音乐](prtscn-playmusic.png) ![播放MV](prtscn-playmv.png)

## 项目说明

### 技术栈
react + react-router + redux + webpack + ES6 + fetch + sass + flex

### 项目结构

	r-music
	│  .babelrc
	│  .eslintrc.js
	│  .gitignore
	│  package.json
	│  README.md
	│  server.js                    //node启动脚本
	│  webpack.config.js            
	│  
	├─config
	│      webpack.dev.js           //开发环境的webpack配置文件
	│      webpack.hash.js          //开发环境的webpack配置文件
	│      webpack.prod.js          //生产环境的webpack配置文件
	│           
	└─src
	    │  api.js                   //封装的fetch
	    │  app.js                   
	    │  config.js                //api接口配置文件
	    │  index.hash.js
	    │  index.js
	    │  index.temp.hash.html
	    │  index.temp.html
	    │  routers.js               //路由
	    │  storage.js               //window.localStorage的各种方法
	    │      
	    ├─components               //组件
	    │          
	    ├─containers               //页面
	    │      account.js
	    │      album.js
	    │      friend.js
	    │      home.js
	    │      music.js
	    │      play.js
	    │      
	    ├─images
	    │      favicon.ico
	    │      
	    ├─json
	    │      home.json
	    │       
	    ├─actions                 //redux -- action
	    │      album.js
	    │      dialog.js
	    │      home.js
	    │      .
	    │      .     
	    ├─reducers                //redux -- reducer
	    │      album.js
	    │      dialog.js
	    │      home.js
	    │      index.js
	    │      login.js
	    │      message.js
	    │      music.js
	    │      spin.js
	    │      user.js
	    │      
	    stores                     //redux  -- store
	    │      index.js
	    │      
	    └─sass                    //样式文件
	            common.scss
	            home.scss
	            login.scss
	            main.scss
	            pagination.scss
	            slider.scss
       


## 项目运行

	git clone https://github.com/ScorpionJay/r-music.git
	cd r-music
	npm install

### 本地开发环境

	npm run dev

该命令在package.json的scripts中，即`"dev": "webpack-dev-server --config webpack.config.js --hot"`，启动一个服务。
如果一切正常，会自动打开浏览器并访问`http://localhost:9999`。

	// config/webpack.dev.js部分代码
    devServer: {
        contentBase: "./src",//本地服务器所加载的页面所在的目录
        historyApiFallback: true,//不跳转
        inline: true,//实时刷新
        host: '0.0.0.0',
        port:9999,
        // 设置代理
        proxy:{
            "/kugou": {
                target: "http://m.kugou.com",
                changeOrigin: true,
                pathRewrite: {"^/kugou" : ""}
            }
        }
    }

因为在 `config/webpack.dev.js `设置了host:'0.0.0.0'，所以同局域网的其他手机或PC也可以通过ip+端口号访问。

proxy，设置代理，是为了解决跨域的问题。


### 生产环境

	npm run build

该命令会将所有文件打包，并放在dist目录下。

#### 配置nginx，设置反向代理，解决跨域问题
安装好nginx，找到nginx.conf，并添加如下代码（与默认80端口的server同级，这里只列出了主要的配置项）

	server {
	    #端口号
	    listen 8666;
	    #项目根目录位置
	    root E:/r-music/dist
	    #访问首页文件
	    location / {
	        index index.html
		      try_files $uri  /index.html    // 解决刷新页面404问题
	   }
	    #缓存静态文件，30d表示30天，可按需调整大小
	    location ~ ^/(images|javascript|js|css|flash|media|static)/ {
	        expires 30d; 
	    }
	    #设置代理，解决跨域
	    location ^~/kugou/{
	      rewrite ^/kugou/(.*)$ /$1 break;
	      proxy_pass http://m.kugou.com;
	    }
	    
	    location ^~/ad/{
	      rewrite ^/ad/(.*)$ /$1 break;
	      proxy_pass http://ads.service.kugou.com;
	    }
	    
	    location ^~/musicSearch/{
	      rewrite ^/musicSearch/(.*)$ /$1 break;
	      proxy_pass http://mobilecdn.kugou.com;
	    }
        location ^~/mobilecdn/{
            rewrite ^/mobilecdn/(.*)$ /$1 break;
            proxy_pass http://mobilecdn.kugou.com;
        }
		#网易MV的数据，详见https://binaryify.github.io/NeteaseCloudMusicApi/
        location ^~/NeteaseCloudMusicApi/{
            rewrite ^/NeteaseCloudMusicApi/(.*)$ /$1 break;
            proxy_pass http://www.cenuon.com:3000;
        }
	}

重启nginx即可

	nginx -s reload


## 知识梳理

### 流程图解

通过我自己的理解方式，简单地整理了react、redux、react-redux三者之间的关系图，如下：

![](relation.png)


### 通过代码，梳理redux、react-redux

注：下面代码只列出搜索功能的关键部分，源码地址：[https://github.com/ScorpionJay/r-music](https://github.com/ScorpionJay/r-music)

#### 1. Provider

react-redux提供的`Provider`组件，可以让容器组件取得`state`。

##### src/index.js
	import configureStore from './stores'
	const store = configureStore()

	<Provider store={store}>
		<Router history={browserHistory} routes={routers} />
	</Provider>

上面代码中，`Provider`使得`Router`的所有子组件可以取得`state`。

`import configureStore from './stores'`为redux的store，如下：

##### src/store/index.js
	
	import reducers from '../reducers/index';

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
		return store;
	};



#### 2. react：Component
##### src/containers/search.js
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

react-redux的`connect`方法，用于从 UI 组件生成容器组件。

上面代码中，`connect(map)(Search)`使得组件`Search`可以通过`props`取得`map`返回的数据。

`dispatch(searchHotAPI())`和`dispatch(clearSearchResultAPI())`，获取数据并分发action。

#### 3. redux

##### src/actions/search.js
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

上面代码中，`searchHot`和`searchResult`都是Action creator，即分别返回一个action。

action是一个带有type关键字的对象，如`{type:SEARCH_HOT, obj}`和`{type:SEARCH_RESULT, obj}`。

`searchHotAPI`和`searchResultAPI`分别返回一个获取数据并分发action的异步函数，一般在容器组件里会调用。

##### src/reducer/search.js
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

上面代码中，`hots`函数收到名为`SEARCH_HOT`的 Action 以后，就返回一个新的 State，作为热门搜索的结果。

在`src/store/index.js`中，开发环境下，引入了中间件`redux-logger`的`createLogger`，在浏览器console可以观察到每次reducer的结果，如下：

![](logger-searchhot.png)

##### src/reducer/index.js
	import { combineReducers } from 'redux'
	//...
	import  search from './search'
	
	const reducers = combineReducers({
	  //...
	  search,
	})
	
	export default reducers

Reducer 是一个函数，它接受 Action 和当前 State 作为参数，返回一个新的 State，然后View发生变化。
`combineReducers`将多个拆分的reducer合并。

