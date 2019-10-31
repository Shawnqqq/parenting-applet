import API from '../../global/request/api.js'

Page({
  data: {
    swiperTabIndex:0,
    category:['全部'],
    topicData:[],
    nowPage:0,
    id:0
  },
  onLoad(options){
    this.getCategory()
    if(options.id==0){
      this.getAll()
    }else{
      this.setData({
        id:options.id,
        swiperTabIndex: Number(options.id)
      })
      this.handleRequest()
    }
  },
  getCategory(){
    wx.request({
      url: API.category,
      success:res=>{
        this.setData({
          category:res.data.data
        })
      }
    })
  },
  getData(e) {
    let id = e.currentTarget.dataset.id
    this.setData({
      swiperTabIndex:id,
      id,
      nowPage:0,
      topicData:[]
    })
    this.handleRequest()
  },
  getAll(){
    this.setData({
      swiperTabIndex:0,
      id:0,
      nowPage:0,
      topicData:[]
    })
    this.handleRequest()
  },
  handleRequest(){
    let params={
      id:this.data.id,
      nowPage:this.data.nowPage
    }
    wx.request({
      url: API.wxTopic,
      data: params,
      success: res => {
        res.data.data.forEach(data => {
          data.text ? data.text = data.text.replace(/<\/?.+?>/g, "") : ''
        })
        if (!res.data.data.length) {
          wx.showToast({
            title: '没有更多内容了',
            icon: 'none',
            duration: 2000
          })
          return
        }
        let topicData = this.data.topicData.concat(res.data.data)
        this.setData({
          topicData,
          nowPage: params.nowPage
        })
      }
    })
  },
  onReachBottom(){
    let nowPage  = this.data.nowPage + 10
    this.setData({nowPage})
    this.handleRequest()
  }
})