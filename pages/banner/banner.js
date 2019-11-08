import API from '../../global/request/api.js'

Page({
  data: {
    bannerData:{}
  },
  onLoad: function (options) {
    wx.request({
      url: API.wxBanner+'/'+options.id,
      success:res=>{
        this.setData({
          bannerData:res.data.data
        })
      }
    })
  }
})