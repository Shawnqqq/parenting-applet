const app = getApp()
import API from '../../global/request/api.js'

Component({
  properties: {
    answerData: {
      type: Array,
      value: []
    }
  },
  methods:{
    handlePraise(e){
      let answer_id = e.currentTarget.dataset.id
      let user_id = app.globalData.user_id
      wx.request({
        url: API.wxPraise,
        method: 'PUT',
        data: { answer_id, user_id},
        success:res=>{
          console.log(res.data.message)
        }
      })
      let index = e.currentTarget.dataset.index
      this.triggerEvent('eventPraise', index)
    },
    handleUnpraise(e){
      let answer_id = e.currentTarget.dataset.id
      let user_id = app.globalData.user_id
      wx.request({
        url: API.wxUnPraise,
        method: 'PUT',
        data: { answer_id, user_id },
        success: res => {
          console.log(res.data.message)
        }
      })
      let index = e.currentTarget.dataset.index
      this.triggerEvent('eventUnPraise',index)
    }
  }
})