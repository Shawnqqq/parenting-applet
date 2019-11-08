const app = getApp()
const qiniuUpload = require('../../utils/qiniuUploader.js')
import API from '../../global/request/api.js'

Page({
  data: {
    userInfo:{},
    token:'',
    domain:''
  },
  onLoad(){
    let userInfo = app.globalData.userInfo
    this.setData({
      userInfo
    })
    this.getToken()
  },
  getToken(){
    wx.request({
      url: API.qiniu,
      success: res => {
        this.setData({
          token: res.data.token,
          domain: res.data.domain
        })
      }
    })
  },
  handleAvatar(){
    let id = app.globalData.user_id
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: res => {
        let filePath = res.tempFilePaths[0];
        let key = 'parenting/' + id + '_' + Date.now()
        qiniuUpload.upload(filePath, (res) => {
          let imageUrl = res.imageURL
          wx.request({
            url: API.wxUser+'/'+id,
            method:'PUT',
            data: { avatar: imageUrl },
            success:res=>{
              if(res.data.code===200){
                wx.showToast({
                  title: res.data.message,
                  icon: 'none',
                  duration: 2000
                })
                app.globalData.userInfo.avatarUrl = imageUrl
                let userInfo = app.globalData.userInfo
                wx.setStorageSync('userInfo', userInfo);
              }
            }
          })
        }, (err) => {
          console.log(err)
        }, {
            region: 'SCN',
            domain: this.data.domain,
            key: key,
            uptoken: this.data.token
          })
      }
    })
  }
})