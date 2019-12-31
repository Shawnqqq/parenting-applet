const app = getApp()
import API from '../../global/request/api.js'

Page({
  data: {
    nullData:true,
    topicData:[],
  },
  onLoad(){
    let id = app.globalData.user_id;
    let nullData = this.data.nullData;
    wx.request({
      url: API.wxUserFollow + '/' + id,
      success:res=>{
        let nullData = this.data.nullData;
        res.data.data.length ? nullData = false : nullData = true
        this.setData({
          nullData,
          topicData:res.data.data
        })
      }
    })
  }
})