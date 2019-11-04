import API from '../../global/request/api.js'
const qiniuUpload = require('../../utils/qiniuUploader.js')
const app = getApp()

Page({
  data: {
    editorValue:'',
    token:'',
    domain:'',
    topic_id:'',
    topic_title:''
  },
  onLoad: function (options) {
    this.getTopic(options.id)
    this.getToken()
    this.setData({
      topic_id:options.id
    })
  },
  getTopic(id){
    wx.request({
      url: API.wxTopicTitle + '/' + id,
      success:res=>{
        this.setData({
          topic_title:res.data.data.title
        })
      }
    })
  },
  getToken(){
    wx.request({
      url: API.qiniu,
      success:res=>{
        this.setData({
          token:res.data.token,
          domain:res.data.domain
        })
      }
    })
  },
  onEditorReady(url){
    wx.createSelectorQuery().select('#editor').context(res => {
      res.context.setContents({
        html: this.data.editorValue
      })
      if(url.length){
        res.context.insertImage({
          src:url
        })
      }
    }).exec()
  },
  editorInput(e){
    this.setData({
      editorValue:e.detail.html
    })
  },
  chooseImage(){
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success:res=>{
        let filePath = res.tempFilePaths[0];
        let key = 'parenting/'+app.globalData.user_id+'_'+Date.now()
        qiniuUpload.upload(filePath,(res)=>{
          this.onEditorReady(res.imageURL)
        },(err)=>{
          console.log(err)
        },{
          region: 'SCN',
          domain: this.data.domain,
          key:key,
          uptoken:this.data.token
        })
      }
    })
  },
  sandAnswer(){
    let topic_id = this.data.topic_id
    let user_id = app.globalData.user_id
    let text = this.data.editorValue
    if (!text.trim()){
      wx.showToast({
        title: '内容不能为空',
        icon: 'none',
        duration: 2000
      })
      return
    }
    wx.request({
      url: API.wxAnswer,
      method:'POST',
      data: { topic_id,user_id,text },
      success:res=>{
        if(res.data.code === 200){
          let url = '/pages/answer/answer?id=' + res.data.data;
          wx.redirectTo({ url })
        }else{
          console.log(res.data.message)
        }
      }
    })
  }
})