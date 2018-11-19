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
    wxFans:{},
    productSku:{},
    productSkus:{},
    sale:{},
    address:{},
    wxPayResult:{},
    addressInfo:{},
    backTopValue: false,
    hideShopPopup: true,
    buytype: 'addcar',
    swtUrl: '',
    checked:'true'
  },

  onShareAppMessage: function (res) {
    let self = this;
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    console.log("转发："+self);
    return {
      title: self.data.productSku.title,
      path: '/page/shop/sku/sku?parentUnionid='+self.data.wxFans.unionid,
      success: function (res) {
        console.log(res);
        // 转发成功
        util.showToast('转发成功!');
      },
      fail: function (res) {
        // 转发失败
        console.log(res);
        util.showToast('转发失败!');
      }
    }
  },
  //显示顶部刷新图标
  onPullDownRefresh: function () {    
    wx.showNavigationBarLoading();
    setTimeout(function () {
      wx.hideNavigationBarLoading();
      wx.stopPullDownRefresh();
    }, 500)
  },
  onReachBottom: function () {
    
  },
  // 商务通跳转
  swtOpen: function () {
    wx.navigateTo({
      url: '../../webview/webview?url=' + encodeURIComponent(config.swtUrl)
    })
  },
  addshopcar: function () {
    let self = this;
    self.setData({
      buytype: "addcar"
    })
    self.bindSkuTap();
  },

  //sku弹出层
  bindSkuTap: function () {
    let self = this;
    self.setData({
      hideShopPopup: false
    })
  },
  //sku弹出层隐藏
  closeSkuTap: function () {
    this.setData({
      hideShopPopup: true
    })
  },
  // 监听滚动条坐标
  onPageScroll: function (e) {
    var that = this
    var scrollTop = e.scrollTop
    var backTopValue = scrollTop > 150 ? true : false
    that.setData({
      backTopValue: backTopValue
    })
  },
  // 滚动到顶部
  backTop: () => {
      util.scrollTop();
  },

  /**
   * 监听页面加载: 跳转过来参数中带有alias 或者 扫码进来
   */
  onLoad: function (options) {
    var that = this;
    let alias = options.alias || decodeURIComponent(options.scene);
    console.log(alias);

    let wxFans = wx.getStorageSync('user') || {};
    let userInfo = wx.getStorageSync('userInfo') || {};
    if (!wxFans.unionid) {
      app.getWxFans().then(function (res) {
        console.log(res);
        that.setData({
          wxFans: res.data
        });
        return Promise.resolve(res);
      }).then(function (res) {
        that.getSkuDetail(alias, res.data.unionid);
        return Promise.resolve(res);
      });
    } else {
      that.setData({
        wxFans: wxFans
      });
      that.getSkuDetail(alias);
    }

  },

  getSkuDetail: function (alias, unionid){
    var that = this;
    let data = {};
    data.alias = alias;
    data.appid = config.APPID;
    data.unionid = unionid || that.data.wxFans.unionid;
    data.wxopenid = that.data.wxFans.openid;

    return new Promise(function (resolve, reject) {
      http.httpGet(config.SHOP_SKUDETAIL, data, function (res) {
        console.log(res);
        that.setData({
          productSku: res.productSku || {},
          sale: res.sale || {},
          wxPayResult: res.wxPayResult || {},
          productSkus: res.productSkus || []
        });
        if (res.productSku){
          WxParse.wxParse('content', 'html', res.productSku.content, that, 5);          
          resolve(res);
        }else{
          util.showToast(res.msg || res.wxPayResult.err_code_des);
        }
      });
    });
  },
  // 文档：https://developers.weixin.qq.com/miniprogram/dev/api/open-api/address/wx.chooseAddress.html
  chooseAddress() {
    var self =this;
    return new Promise(function (resolve, reject){
      wx.chooseAddress({
        success: (res) => {
          if (!res.provinceName) {
            util.showToast('请填写省份！');
            return resolve(false);
          }
          if (!res.cityName) {
            util.showToast('请填写城市！');
            return resolve(false);
          }
          if (!res.countyName) {
            util.showToast('请填写地区！');
            return resolve(false);
          }
          if (!res.detailInfo) {
            util.showToast('请填写详细地址！');
            return resolve(false);
          }
          if (!res.detailInfo) {
            util.showToast('请填写详细地址！');
            return resolve(false);
          }
          if (!res.userName) {
            util.showToast('请填写收件人！');
            return resolve(false);
          }
          if (!res.postalCode) {
            util.showToast('请填写邮编！');
            return resolve(false);
          }
          if (!res.telNumber || (!/^0?1[3|4|5|6|7|8|9][0-9]\d{8}$/i.test(res.telNumber))) {
            util.showToast('请填写准确的收件人号码,只支持国内11位！');
            //return resolve(false);
          }
          self.setData({
            addressInfo: res
          })
          return resolve(res);
        },
        fail: function (err) {
          console.log(err);
          util.showToast('请选择收货地址！');
          return resolve(false);
        }
      })
    });    
  },

  checkBuyTime: function (){ //验证购买时间
    var self = this;
    let startTime = self.data.productSku.publishTime;
    let endTime = self.data.productSku.timeExpire;

    if(endTime) {
      var isAfter = util.diffDate(endTime);
      if (isAfter == 1) {
        util.showToast("已过了商品购买日期");
        return false;
      }
    }
		if(startTime) {
      var isAfter = util.diffDate(startTime);
      if (isAfter == 0) {
        util.showToast("还未到商品购买日期,请先浏览!");
        return false;
      }
    }
		return true;
  },

  pay:function(e){
    var that = this;
    console.log(e.currentTarget);
    console.log(that.data.wxPayResult);
    let now = new Date();
    //支付前的验证
    //1. 购买时间的验证
    if (!that.checkBuyTime()) {
      return;
    }

    //判断是否能够购买

    //如果订单需要物流发货，则需要选择收货地址
    if (that.data.productSku.needLogistics ){ //需要收货地址
      that.chooseAddress().then(function(res){
        console.log(res);
        if(res){
          return that.requestPayment();
        }
      });
    }else{
      that.requestPayment();
    }
  },
  //文档：https://pay.weixin.qq.com/wiki/doc/api/wxa/wxa_api.php?chapter=7_7&index=5
  requestPayment:function(){
    var that = this;
    return new Promise(function (resolve, reject){
      wx.requestPayment({
        'timeStamp': that.data.wxPayResult.timeStamp,
        'nonceStr': that.data.wxPayResult.nonce_str,
        'package': 'prepay_id=' + that.data.wxPayResult.prepay_id,
        'signType': 'MD5',
        'paySign': that.data.wxPayResult.paySign,
        'success': function (res) {
          util.showToast('支付成功');
          that.salePaySubmit();
        },
        'fail': function (res) { console.log(res); util.showToast('支付失败 ' + res.errMsg); },
        'complete': function (res) {
          console.log(res);         
        }
      })
    });
  },

  salePaySubmit:function(){  //支付成功后，提交表单
    var that = this;
    let payData = { ...that.data.addressInfo };
    payData.saleId = that.data.wxPayResult.saleId;

    console.log(payData);
    return new Promise(function (resolve, reject){
      http.httpGet('/sale_appPaySuccess', payData,function(res){
        console.log(res);
        if(res.success){
          that.sendTemplate();
          //that.onLoad();
        }else{
          util.showToast(res.msg);
        }        
      });
    });
  },

  sendTemplate:function(){
    let that = this;
    let tempData = {
      appid: config.APPID,
      touser: that.data.wxFans.openid,
      page: '',
      template_id: config.paySuccessTemplate,
      //表单提交场景下，为 submit 事件带上的 formId；支付场景下，为本次支付的 prepay_id
      form_id: that.data.wxPayResult.prepay_id,
      emphasis_keyword: '', //模板需要放大的关键词，不填则默认无放大
      data: {
        "keyword1": { //金额   订单编号
          "value": that.data.sale.id
        },
        "keyword2": {  //商品名称
          "value": that.data.sale.body
        },
        "keyword3": { //支付金额
          "value": that.data.sale.payMoney+""
        }
      }
    };
    http.sendTemplate(tempData, function (res) {
      console.log(res);
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    wx.showLoading({
      title: '加载中',
    })
    setTimeout(function () {
      wx.hideLoading();
    }, 800)
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