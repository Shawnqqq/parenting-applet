const app = getApp()
import API from '../../global/request/api.js'

Page({
  data: {
    nullData: true,
    answerData: [],
  },
  onLoad() {
    let id = app.globalData.user_id;
    let nullData = this.data.nullData
    wx.request({
      url: API.wxUserSend + '/' + id,
      success: res => {
        res.data.data.forEach(data => {
          data.text ? data.text = data.text.replace(/<\/?.+?>/g, "") : ''
        })
        res.data.data.length ? nullData = false : nullData = true
        this.setData({
          nullData,
          answerData: res.data.data
        })
      }
    })
  },
  // 点赞事件
  handlePraise(e) {
    let index = e.detail
    let answerData = this.data.answerData
    answerData[index].active = !answerData[index].active
    answerData[index].praise = Number(answerData[index].praise) + 1
    this.setData({
      answerData: answerData
    })
  },
  // 取消点赞事件
  handleUnPraise(e) {
    let index = e.detail
    let answerData = this.data.answerData
    answerData[index].active = !answerData[index].active
    answerData[index].praise = Number(answerData[index].praise) - 1
    this.setData({
      answerData: answerData
    })
  }
})