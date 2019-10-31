import API from '../../global/request/api.js'

Page({
  data: {
    topicData:{},
    answerData:[],
    editorId: []
  },
  onLoad: function (options) {
    this.getData(options.id)
  },
  onEditorReady() {
    this.data.editorId.forEach((data,index)=>{
      wx.createSelectorQuery().select(data).context((res) => {
        res.context.setContents({
          html: this.data.answerData[index].text
        })
      }).exec()
    })
  },
  getData(id){
    wx.request({
      url: API.wxTopic+'/'+id,
      success:res=>{
        let editorId = res.data.answer.map((data,index)=>{
          return `#answer-editor-${index}`
        })
        this.setData({
          topicData: res.data.topic,
          answerData:res.data.answer,
          editorId:editorId
        })
      }
    })
  }
})