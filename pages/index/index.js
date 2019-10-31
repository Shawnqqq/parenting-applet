const app = getApp()

Page({
  data: {
    recomme:true,
    recommeData:[{id:1},{id:2}],
    answerData:[{id:1}]
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
