const app = getApp()
import API from '../../global/request/api.js'

Page({
  data: {
    state:false,
    image:{
      preparation: "../../image/preparation.png",
      pregnancy: "../../image/pregnancy.png",
      bred: "../../image/bred.png"
    },
    text: {
      preparation: '科学备孕给宝宝最好的开始',
      pregnancy: '静心养胎提前了解孩子的世界',
      bred: '了解其他妈妈的养娃之道'
    },
    status:{}
  },
  onLoad: function (options) {
    let id = app.globalData.user_id
    wx.request({
      url: API.wxUser+'/'+id,
      success:res=>{
        res.data.data.state = Number(res.data.data.state)
        let value={}
        if(res.data.data.state!==0){
          switch (res.data.data.state){
            case 2 :
              value.image = this.data.image.pregnancy
              value.text = this.data.text.pregnancy
              value.state = 2
              break;
            case 3 :
              value.image = this.data.image.bred
              value.text = this.data.text.bred
              value.state = 3
              break;
            default:
              value.image = this.data.image.preparation
              value.text = this.data.text.preparation
              value.state = 1
          }
          this.setData({
            status: value,
            state:true
          })
        }
      }
    })
  },
  handleChange(){
    this.setData({
      state:false
    })
  },
  preparation(){
    let value={
      image:this.data.image.preparation,
      text:this.data.text.preparation,
      state: 1
    }
    this.setData({
      state:true,
      status:value
    })
  },
  pregnancy(){
    let value = {
      image: this.data.image.pregnancy,
      text: this.data.text.pregnancy,
      state: 2
    }
    this.setData({
      state: true,
      status: value
    })
  },
  bred(){
    let value = {
      image: this.data.image.bred,
      text: this.data.text.bred,
      state: 3
    }
    this.setData({
      state: true,
      status: value
    })
  },
  handleSumbit(e){
    let state = e.currentTarget.dataset.state
    let id = app.globalData.user_id
    wx.request({
      url: API.wxUser + '/' + id,
      method: 'PUT',
      data: { state},
      success: res => {
        if (res.data.code === 200) {
          wx.showToast({
            title: res.data.message,
            icon: 'none',
            duration: 2000
          })
        }
      }
    })
  }
})