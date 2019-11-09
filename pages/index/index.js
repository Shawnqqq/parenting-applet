const app = getApp()
import API from '../../global/request/api.js'

Page({
  data: {
    bannerData:[],
    columnData:[],
    recomme:true,
    recommeData:[{id:1},{id:2}],
    answerData:[{id:1}]
  },
  onLoad(){
    wx.request({
      url: API.wxColumn,
      success:res=>{
        this.setData({
          columnData:res.data.data
        })
      }
    }),
    wx.request({
      url: API.wxRecommend,
      success:res=>{
        res.data.data.forEach(data => {
          data.text ? data.text = data.text.replace(/<\/?.+?>/g, "") : ''
        })
        this.setData({
          recommeData:res.data.data
        })
      }
    }),
    wx.request({
      url: API.wxAnswer,
      success:res=>{
        res.data.data.forEach(data => {
          data.text ? data.text = data.text.replace(/<\/?.+?>/g, "") : ''
        })
        this.setData({
          answerData: res.data.data
        })
      }
    })
    wx.request({
      url: API.wxBanner,
      success:res=>{
        this.setData({
          bannerData:res.data.data
        })
      }
    })
    wx.showShareMenu({
      withShareTicket: true
    })
  },
  handleRecomme(){
    this.setData({
      recomme:true
    })
  },
  handleAnswer(){
    this.setData({
      recomme:false
    })
  }
})
