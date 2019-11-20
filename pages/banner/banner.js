import API from '../../global/request/api.js'

Page({
  data: {
    bannerData:""
  },
  onLoad: function (options) {
    wx.request({
      url: API.wxBanner+'/'+options.id,
      success:res=>{
        this.setData({
          bannerData:res.data.data.content
        })
      }
    })
  },
  onEditorReady() {
    wx.createSelectorQuery().select('#editor-banner').context(res => {
      res.context.setContents({
        html: this.data.bannerData
      })
    }).exec()
  }
})