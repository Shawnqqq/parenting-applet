const app = getApp()
import API from '../../global/request/api.js'

Page({
  data: {
    nullData:true,
    topicData:[],
  },
  onLoad(){
    let id = app.globalData.user_id
    wx.request({
      url: API.wxUserFollow + '/' + id,
      success:res=>{
        this.setData({
          nullData:false,
          topicData:res.data.data
        })
      }
    })
  }
})