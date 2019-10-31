Page({
  data: {
    user_id:''
  },
  onLoad(options){
    this.setData({
      user_id:options.id
    })
  }
})