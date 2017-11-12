import axios from 'axios'

// axios 配置
axios.defaults.timeout = 10000;
axios.defaults.baseURL = '/apis';
axios.defaults.headers = {'X-Requested-With':'Access-Control-Allow-Origin'};

export function getData(url, param){
	return new Promise((resolve,reject) => {
		axios.get(url, {param: param})
		.then(response => {
            resolve(response.data)
        }, err => {
            reject(err)
        })
        .catch((error) => {
            reject(error)
        })
	})
}

export default{
	login(url){//登录
		return getData(url);
	},
	getDetail(url){//获取用户详情
		return getData(url);
	},
	getBanner(){//轮播图片
		return getData('/banner');
	},
	reclist(){ //歌单
		return getData('/top/playlist/highquality?limit=10');
	},
	dailylist(){ //每日推荐
		return getData('/recommend/songs');
	},
	ranklist(){ //排行
		return getData('/top/list?idx=0');
	},
	homereclist(){ //推荐歌单
		return getData('/personalized');
	},
	getMymusic(url){//我的歌单
		return getData(url);
	},
	getWeekData(url){//获取一周的播放记录
		return getData(url);
	},
	getMusicUrl(id){//获取音乐链接
		return getData('/music/url?id='+id);
	},
	getLyric(id){//获取歌词
		return getData('/lyric?id='+id);
	},
	getRecommendDetail(id){//获取歌单详情
		return getData('/playlist/detail?id='+id);
	},
	formatLyric(lyc){
		let lycArr = lyc.split("\n");
		let newArr = [];
		lycArr.pop();
		let reg = /\[\d*:\d*((\.|\:)\d*)*\]/g;
		for(let i=0; i<lycArr.length;i++){
			let timeArr = lycArr[i].match(reg);
			let arr = lycArr[i].replace(reg, '');
			if(arr == "" || typeof(arr) == "undefined"){
				lycArr.splice(i,1);  
              	i= i-1;  
			}else{
				if(timeArr != null && timeArr.toString() != lycArr[i]){
					newArr.push(arr);
				}
			}
		}
		return newArr;
	},
	timeStamp(lyc){
		let lycArr = lyc.split("\n");
		let reg = /\[\d*:\d*((\.|\:)\d*)*\]/g;
		let timeTemple = [];
		for(let i=0; i<lycArr.length; i++){
			let timeArr = lycArr[i].match(reg);
			if(timeArr != null && timeArr.toString() != lycArr[i]){
				let min =  Number(lycArr[i].toString().match(/\[\d*/i).toString().slice(1));
				let sec = Number(lycArr[i].toString().match(/\:\d*/i).toString().slice(1))
				let time = min*60 + sec;
				timeTemple.push(time);
			}
		}
		return timeTemple;
	},
	formatTime(time){
	 	let min = Math.floor(time/60);
	 	let sec = time - min*60;
	 	if(min.toString().length==1){
	 		min = '0'+min;
	 	}
	 	if(sec.toString().length ==1){
	 		sec = '0'+sec;
	 	}
	 	return min+':'+sec;
	}
}
