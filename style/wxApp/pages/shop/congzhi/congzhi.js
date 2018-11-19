var WxAutoImage = require('../../../utils/wxAutoImageCal.js');
var config = require('../../../config.js')
var http = require('../../../utils/httpHelper.js')
var imageUtil = require('../../../utils/util.js');
var util = require('../../../utils/util.js');
var app = getApp();
var WxParse = require('../../../wxParse/wxParse.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    money:1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  congZhi:function(){
    var self = this;
    var money = self.data.money;
    if(money<=0){
      util.showToast('充值金额需大于0元');
      return;
    }
    
    var data ={};
    http.httpGet('',data,function(ret){
      if(ret){
        var wxPayResult={};
        wx.requestPayment({
          'timeStamp': wxPayResult.timeStamp,
          'nonceStr': wxPayResult.nonce_str,
          'package': 'prepay_id=' + wxPayResult.prepay_id,
          'signType': 'MD5',
          'paySign': wxPayResult.paySign,
          'success': function (res) {
            console.log(res);
          },
          'fail': function (res) { console.log(res); },
          'complete': function (res) {
            console.log('支付完成');
            if (res.errMsg == 'requestPayment:ok') {
              wx.showModal({
                title: '提示',
                content: '支付成功'
              });
              if (url) {
                setTimeout(function () {
                  wx.redirectTo({
                    url: '/pages' + url
                  });
                }, 2000)
              } else {
                setTimeout(() => {
                  wx.navigateBack();
                }, 2000)
              }
            }
          }
        })
      }
    });


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