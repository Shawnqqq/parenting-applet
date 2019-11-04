import API from '../../global/request/api.js'
const app = getApp()


Page({
  data: {
    answer_id:'',
    answerData:{},
    inputValue:'',
    replyData:[],
    replyShow:[],
    replyActive:true,
    sendActive:false
  },
  onLoad: function (options) {
    this.setData({
      answer_id: options.id
    })
    this.getData(options.id)
  },
  getData(id){
    let user_id = app.globalData.user_id
    wx.request({
      url: API.wxAnswer+'/'+id,
      data: { user_id },
      success:res=>{
        let replyShow = res.data.data.reply.slice(0,2)
        this.setData({
          answerData:res.data.data.answer,
          replyShow,
          replyData:res.data.data.reply
        })
      }
    })
  },
  handleAll(){
    this.setData({
      replyActive:false
    })
  },
  onEditorReady(){
    wx.createSelectorQuery().select('#editor-single').context(res =>{
      res.context.setContents({
        html: this.data.answerData.text
      })
    }).exec()
  },
  // 点赞事件
  handlePraise(e) {
    let answer_id = e.currentTarget.dataset.id
    let user_id = app.globalData.user_id
    wx.request({
      url: API.wxPraise,
      method: 'PUT',
      data: { answer_id, user_id },
      success: res => {
        if(res.data.message === '点赞成功'){
          let answerData = this.data.answerData
          answerData.praiseActive = !answerData.praiseActive
          answerData.praise = Number(answerData.praise) + 1
          this.setData({
            answerData
          })
        }
      }
    })
  },
  // 取消点赞事件
  handleUnpraise(e) {
    let answer_id = e.currentTarget.dataset.id
    let user_id = app.globalData.user_id
    wx.request({
      url: API.wxUnPraise,
      method: 'PUT',
      data: { answer_id, user_id },
      success: res => {
        if (res.data.message === '取消成功') {
          let answerData = this.data.answerData
          answerData.praiseActive = !answerData.praiseActive
          answerData.praise = Number(answerData.praise) - 1
          this.setData({
            answerData
          })
        }
      }
    })
  },
  // 收藏事件
  handleCollect(e){
    let answer_id = e.currentTarget.dataset.id
    let user_id = app.globalData.user_id
    wx.request({
      url: API.wxCollect,
      method: 'PUT',
      data: { answer_id, user_id },
      success: res => {
        if (res.data.message === '收藏成功') {
          let answerData = this.data.answerData
          answerData.collectActive = !answerData.collectActive
          answerData.collect = Number(answerData.collect) + 1
          this.setData({
            answerData
          })
        }
      }
    })
  },
  // 取消收藏事件
  handleUnCollect(e){
    let answer_id = e.currentTarget.dataset.id
    let user_id = app.globalData.user_id
    wx.request({
      url: API.wxUnCollect,
      method: 'PUT',
      data: { answer_id, user_id },
      success: res => {
        if (res.data.message === '取消成功') {
          let answerData = this.data.answerData
          answerData.collectActive = !answerData.collectActive
          answerData.collect = Number(answerData.collect) - 1
          this.setData({
            answerData
          })
        }
      }
    })
  },
  handleInput(e){
    let value = e.detail.value
    let send
    value.trim() ? send=true : send=false
    this.setData({
      inputValue: value,
      sendActive: send
    })
  },
  handleSend(){
    let text = this.data.inputValue
    if(!text.trim()){
      wx.showToast({
        title: '内容不能为空',
        icon: 'none',
        duration: 2000
      })
      return
    }
    let answer_id = this.data.answer_id
    let user_id = app.globalData.user_id
    wx.request({
      url: API.wxReply,
      method: 'POST',
      data: { answer_id, user_id ,text},
      success: res => {
        if (res.data.message === '增加成功') {
          this.getData(answer_id)
          this.setData({
            inputValue: ''
          })
        }else{
          console.log(res.data.message)
        }
      }
    })
  }
})