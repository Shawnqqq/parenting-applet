import API from '../../global/request/api.js'
const app = getApp()

Page({
  data: {
    topicData:{},
    answerData:[],
    nowPage:0,
    optionsId:'',
    follow:false
  },
  onLoad: function (options) {
    this.handlePv(options.id)
    this.getData(options.id)
    this.setData({
      optionsId:options.id
    })
  },
  handlePv(id){
    wx.request({
      url: API.wxTopiPv,
      method: 'PUT',
      data:{id}
    })
  },
  handleFollow(){
    let topic_id = this.data.optionsId
    let user_id = app.globalData.user_id
    wx.request({
      url: API.wxTopic,
      method: 'POST',
      data: {topic_id,user_id},
      success:res=>{
        wx.showToast({
          title: res.data.message,
          icon: 'none',
          duration: 2000
        })
      }
    })
  },
  getData(id){
    let user_id = app.globalData.user_id
    wx.request({
      url: API.wxTopic+'/'+id,
      data: { nowPage: this.data.nowPage, user_id},
      success:res=>{
        if (!res.data.answer.length) {
          wx.showToast({
            title: '没有更多内容了',
            icon: 'none',
            duration: 2000
          })
        }
        res.data.answer.forEach(data => {
          data.text ? data.text = data.text.replace(/<\/?.+?>/g, "") : ''
        })
        let answerData = this.data.answerData.concat(res.data.answer)
        this.setData({
          topicData: res.data.topic,
          answerData,
          follow:res.data.follow
        })
      }
    })
  },
  // 触底事件
  onReachBottom(){
    let nowPage = this.data.nowPage + 10
    let id = this.data.optionsId
    this.setData({ nowPage })
    this.getData(id)
  },
  // 点赞事件
  handlePraise(e){
    let index = e.detail
    let answerData = this.data.answerData
    answerData[index].active = !answerData[index].active
    answerData[index].praise = Number(answerData[index].praise)+1
    this.setData({
      answerData: answerData
    })
  },
  // 取消点赞事件
  handleUnPraise(e){
    let index = e.detail
    let answerData = this.data.answerData
    answerData[index].active = !answerData[index].active
    answerData[index].praise = Number(answerData[index].praise) - 1
    this.setData({
      answerData: answerData
    })
  }
})