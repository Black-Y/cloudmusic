import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

export default new Vuex.Store({
    state: {
    	playShow: false, //控制reclist显示隐藏
    	audioTarget: '',//音频元素
    	startPlay: false,//控制播放
    	musicUrl: [],//将要播放的音乐集合
    	musicPic: [],//当前音乐封面
    	currentId: '',//当前音乐id
    	currentName: '',//当前音乐名字
    	currentAuthor: '',//当前音乐作者
    	musicLyric: '',//当前歌词
    	timeArr: '',//当前歌词时间断点
    	timeCount: 0,//播放计时
    	timer: '', //定时器
    	musicDuration: '',//当前音乐时长
    	recommendedId: '',//歌单id
    	recommendedCover: '',//歌单封面
    	recommendedTitle: '', //歌单标题
    	showRecDtail: false //控制歌单详情显示
    },
    getters: {
    	playShow: state => state.playShow,
    	audioTarget: state => state.audioTarget,
    	startPlay: state => state.startPlay,
    	musicUrl: state => state.musicUrl,
    	musicPic: state => state.musicPic,
    	currentId: state => state.currentId,
    	currentName: state => state.currentName,
    	currentAuthor: state => state.currentAuthor,
    	musicLyric: state => state.musicLyric,
    	timeArr: state => state.timeArr,
    	timeCount: state => state.timeCount,
    	timer: state => state.timer,
    	musicDuration: state => state.musicDuration,
    	recommendedId: state => state.recommendedId,
    	recommendedCover: state => state.recommendedCover,
    	recommendedTitle: state => state.recommendedTitle,
    	showRecDtail: state => state.showRecDtail
    },
    mutations: {
    	getAudio(state, tar){
    		state.audioTarget = tar;
    	},
    	showPlayingPage(state, flag){
    		state.playShow = flag;
    	},
    	playing(state, flag){
    		state.startPlay = flag;
    	},
    	setCurrentId(state, id){
    		state.currentId = id;
    	},
    	setAuthor(state, str){
    		state.currentAuthor = str;
    	},
    	setCurrentName(state, name){
    		state.currentName = name;
    	},
    	setCurrentPic(state, pic){
    		state.musicPic = pic;
    	},
    	setMusicUrl(state, musicUrl){
    		state.musicUrl = musicUrl;
    	},
    	setLyric(state, arr){
    		state.musicLyric = arr;
    	},
    	setTimeArr(state, arr){
    		state.timeArr = arr;
    	},
    	setTimeCount(state, count){
    		state.timeCount = count;
    	},
    	setTimer(state, timer){
    		state.timer = timer;
    	},
    	setDuration(state, duration){
    		state.musicDuration = duration;
    	},
    	setRecommendedId(state, id){
    		state.recommendedId = id;
    	},
    	setRecommendedCover(state, picUrl){
    		state.recommendedCover = picUrl;
    	},
    	setRecommendedTitle(state, txt){
    		state.recommendedTitle = txt;
    	},
    	setShowRecDtail(state, flag){
    		state.showRecDtail = flag;
    	}
    }
})