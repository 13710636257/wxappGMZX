// pages/users/PhoneNumber/phoneNumber.js
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
    alias: '',
    wxFans: {},
    hiddenModal: true,
    cardNO: '',
    storeCard:{},
    storeCardRecord: {},
    photoUrls:[]
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    let that = this;
    //显示顶部刷新图标
    wx.showNavigationBarLoading();
    that.onLoad();
    setTimeout(function () {
      wx.hideNavigationBarLoading();
      wx.stopPullDownRefresh();
    }, 400)
  },
  onReachBottom: function () {
    util.showToast("加载中"),
      setTimeout(function () {
        wx.hideLoading();
      }, 1500)
  },

  // 规则弹框效果
  rulesButton: function () {
    let that = this;
    that.setData({
      hiddenModal: !that.data.hiddenModal
    })
  },
  rulesConfirm: function () {
    let that = this;
    that.setData({
      hiddenModal: true
    })
  },
  rulesrCancel: function () {
    let that = this;
    that.setData({
      hiddenModal: true
    })
  },

  // 选择医院
  bindAddressyChange: function (e) {
    var that = this;
    console.log('picker country 发生选择改变，携带值为', e.detail);
    that.setData({
      addressIndex: e.detail.value,
      address: that.data.addresses[e.detail.value].alias
    })
  },
  //选择预约时间
  bindDateChange: function (e) {
    let that = this;
    that.setData({
      yuyueTime: e.detail.value
    })
  },

  clear: function () {
    app.clear();
  },

  previewImage:function(e){
    let that = this;
    var current = e.target.dataset.src;
    //预览图片
    wx.previewImage({
      current: current,
      urls: that.data.photoUrls,
    });
  },

  /**
   * 生命周期函数--监听页面加载  跳转过来参数中带有alias 或者 扫码进来
   */
  onLoad: function (options) {
    var that = this;

    let alias = options.alias || decodeURIComponent(options.scene);
    console.log(alias);

    let wxFans = wx.getStorageSync('user') || {};
    let userInfo = wx.getStorageSync('userInfo') || {};
    let storeCard = wx.getStorageSync('storeCard-' + alias) || {};//存储充值卡信息
    let cardNO = wx.getStorageSync('storeCardNO-' + alias) || ''; //存储的卡号   

    that.setData({
      cardNO: cardNO,
      storeCard: storeCard,
      alias: alias
    });

    console.log(wxFans.unionid);
    if (!wxFans.unionid) {
      app.getWxFans().then(function (res) {
        console.log(res);
        that.setData({
          wxFans: res.data
        });
        return Promise.resolve(res);
      }).then(function (res) {
        that.getStoreCardRecord(alias, res.data.unionid);
        return Promise.resolve(res);
      });
    } else {
      that.setData({
        wxFans: wxFans
      });
      that.getStoreCardRecord(alias);
    }
  },

  getStoreCardRecord: function (alias, unionid) {
    var that = this;
    return new Promise(function (resolve, reject) {
      http.httpGet(config.STORECARDRECORD_INFO_URL, { alias: alias, unionid: unionid || that.data.wxFans.unionid }, function (res) {
        console.info(res);
        if (res && res.storeCard) {
          WxParse.wxParse('description', 'html', res.storeCard.description, that, 5);
          let photoUrls = [];
          if (res.storeCard.picHead){
            photoUrls.push(res.storeCard.picHead);
          }
          if (res.storeCard.picBack) {
            photoUrls.push(res.storeCard.picBack);
          }
          that.setData({
            "storeCard": res.storeCard,
            photoUrls: photoUrls
          });
          if (res.storeCardRecord){
            that.setData({
              "cardNO": res.storeCardRecord.cardNO
            });
          }
          resolve(res);
        }else{
          util.showToast('没有此卡!');
        }
      });
    });
  },

  // 获取手机号码
  getPhoneNumber: function (e) {
    let that = this;
    app.getPhoneNumber(e).then( function(ret){
      app.login(ret).then(function (res) {
        that.setData({
          wxFans: res
        });
      }).catch(function (e) {
        util.showToast(e);
      });
    }).catch(function(e){
      util.showToast(e);
    }); 
  },

  formSubmit: function (e) {
    let that = this;
    console.log('form发生了submit事件，携带数据为：', e.detail.value)
    let data = e.detail.value;
    data.alias = that.data.alias;
    data.unionid = that.data.wxFans.unionid;
    data.channel = "广美整形小程序";
    console.log(data);

    //提交前的验证
    if (!data.name || data.name.length < 2) {
      util.showToast('请输入真实姓名!');
      return;
    }
    if (!util.isPhone(data.phone)) {
      util.showToast('请输入11位手机号码!');
      return;
    }
    if (!data.cardNO) {
      util.showToast('请输入卡号!');
      return;
    }
    app.checkStoreCard(data.alias, data.cardNO)
    .then(function () {
      //激活卡号
      return new Promise(function (resolve, reject) {
        http.httpPost(config.STORECARD_ACTIVE_URL, data, function (res) {
          console.info(res);
          if (res.success) {
            that.setData({
              cardNO: res.obj.cardNO
            });
          } else {
            util.showToast(res.msg);
          }
          resolve(res);
        });
      });
    })
    .catch(function (error) {
      console.log(error);
      util.showToast(error.msg);
    });
  }

})