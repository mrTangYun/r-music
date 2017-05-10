import Config from '../config'
import { spin,spinHidden } from './spin'
import api from '../api'


export const MV_RECOMMEND= 'MV_RECOMMEND'
export const MV_NEWEST ='MV_NEWEST'
export const MV_INFO = 'MV_INFO'

const mvRecommend = (obj) => {return {type:MV_RECOMMEND, obj}}
const mvNewest = (obj) => {return {type:MV_NEWEST, obj}}
const mvInfo = (obj) => {return {type:MV_INFO, obj}}

//获取推荐MV列表
export function mvRecommendAction(){
	return async dispatch => {
		dispatch(spin());
		try{
			let data = await api( Config.recommendMV );
			dispatch(mvRecommend(data.result));
			dispatch(spinHidden());
		} catch(error) {
			console.log(error);
		}
	}
}

//获取最新MV列表
export function mvNewestAction(limit=30, offset=0){
	return async dispatch =>{
		dispatch(spin());
		try{
			let data = await api( Config.newestMV, 'get', {limit,offset} );
			dispatch(mvNewest(data.data));
			dispatch(spinHidden());
		} catch(error) {
			console.log(error);
		}
	}
}

//根据mvid获取MV信息
export function mvInfoAction(mvid){
	return async dispatch => {
		dispatch(spin);
		try{
			let data = await api( Config.mvInfo, 'get', {mvid} );
			dispatch(mvInfo(data.data.brs[240]));
			dispatch(spinHidden());
		} catch(error) {
			console.log(error)
		}
	}
}

