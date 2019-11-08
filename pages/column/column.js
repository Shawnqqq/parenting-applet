import API from '../../global/request/api.js'

Page({
  data: {
    columnData:{},
    topicData:[]
  },
  onLoad: function (options) {
    this.getData(options.id)
  },
  getData(id){
    wx.request({
      url: API.wxColumn+'/'+id,
      success:res=>{
        this.setData({
          columnData:res.data.data
        })
      }
    })
    wx.request({
      url: API.wxColumnSelected + '/' + id,
      success:res=>{
        this.setData({
          topicData: res.data.data
        })
      }
    })
  }
})