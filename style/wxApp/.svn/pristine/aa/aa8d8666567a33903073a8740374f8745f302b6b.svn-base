// pages/user/beauty/introduce/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var wxFans = wx.getStorageSync('user') || {};
    if (!wxFans.unionid) {
      app.getWxFans().then(function (res) {
        console.log(res);
        that.setData({
          wxFans: res.data,
          url: config.HTTP_BASE_URL + '/beauty_indexIntroduce?__ajax=json&beautyId=' + res.data.beautyId
        });
      })
      app.getUserInfo().then(function (res) {
        that.setData({
          userInfo: res.data
        });
      });
    } else {
      that.setData({
        wxFans: wx.getStorageSync('user') || {},
        userInfo: wx.getStorageSync('userInfo') || {},
        url: config.HTTP_BASE_URL + '/beauty_indexIntroduce?__ajax=json&beautyId=' + res.data.beautyId
      });
    } 
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})