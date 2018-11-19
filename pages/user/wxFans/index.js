var app = getApp();
var config = require('../../../config.js')
var http = require('../../../utils/httpHelper.js')
var util = require('../../../utils/util.js')

Page({
  data: {
    wxFans:{},
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    userInfo:{
      avatarUrl:"../../../images/headpic.png",
      nickName:"未登录"
    },
    hasShouQuan: false,
    mode: [
      { 'name': '完善信息', 'url': '/pages/user/information/index' },
      { 'name': '设置密码', 'url': '/pages/user/setPwd/index' },
      { 'name': '收货地址', 'url': '/pages/user/address/index' },
      { 'name': '我的日记本', 'url': '/pages/user/diary/diaryBookList/index' },
      { 'name': '我的二维码', 'url': '/pages/user/erweima/index' },
      { 'name': '我的优惠券', 'url': '/pages/user/quan/quanList/quanList' },
      { 'name': '我的预约', 'url': '/pages/user/appointment/appointment/appointment' },
    ]
  },
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    let that = this;
    //显示顶部刷新图标
    wx.showNavigationBarLoading();
    that.onLoad();
    //模拟加载
    setTimeout(function () {
      wx.hideNavigationBarLoading();
      wx.stopPullDownRefresh();
    }, 400)
  },
  onLoad: function (query) {
    var that = this;
    // scene 需要使用 decodeURIComponent 才能获取到生成二维码时传入的 scene
    console.log(query);
    let parentUnionid = decodeURIComponent(query.scene); //没有传值的话，也是string类型
    console.log(typeof (parentUnionid));

    let wxFans = wx.getStorageSync('user') || {};
    if(!wxFans.unionid){ //不存在
      app.getWxFans(parentUnionid).then(function (res) {
        console.log(res);
        that.setData({
          wxFans: res.data
        });
        if (res.data.parentUnionid ){
          console.log(parentUnionid);
          that.setParentUnionid(res.data.parentUnionid);
        }        
      })
      .then( app.getUserInfo )
      .then(function(res){
        that.setData({
          userInfo: res.data
        });
      });
    }else{            
      that.setData({
        wxFans: wx.getStorageSync('user') || {},
        userInfo: wx.getStorageSync('userInfo') || {},
      });
    }
    // 查看是否授权
    wx.getSetting({
      success: function (res) {
        if (res.authSetting['scope.userInfo']) {
          wx.getUserInfo({
            success: function (res) {}
          });
        }
      }
    })
  },

  setParentUnionid(parentUnionid){
    let wxFans = wx.getStorageSync('user') || {};
    console.log(parentUnionid);
    if (typeof (parentUnionid) == "undefined" || parentUnionid == "undefined" ){
      return;
    }
    if (wxFans.unionid != parentUnionid) {
      wx.setStorageSync('parentUnionid', parentUnionid);//存储parentUnionid
    }
  },

  onReady:function(){ //页面渲染完成
    
  },

  getPhoneNumber: function (e) {
    let that = this;
    if (e.detail.errMsg == 'getPhoneNumber:fail user deny') {
      wx.showModal({
        title: '提示',
        showCancel: false,
        content: '您未授权，更新号码失败，将不能使用部分功能，请重试!',
        success: function (res) { }
      })
    } else {
      wx.login({
        success: res => {
          console.log(res.code);
          wx.request({
            url: config.HTTP_BASE_URL + "/app/wxFans_login",
            data: {
              'encryptedData': e.detail.encryptedData, //encodeURIComponent
              'iv': e.detail.iv,
              'code': res.code,
              'appid': config.APPID
            },
            method: 'GET',
            header: {
              'content-type': 'application/json'
            }, // 设置请求的 header
            success: function (res) {
              console.log(res);
              if (res.statusCode == 200 && res.data.success) {
                //存入缓存即可
                util.showToast('成功更新号码')
                wx.setStorageSync('user', res.data.obj);
                that.setData({
                  wxFans: res.data.obj
                });
                that.onLoad(); //用onLoad周期方法重新加载，实现当前页面的刷新
              }else{
                util.showToast('更新号码失败，请重试')
              }
            },
            fail: function (err) {
              console.log(err);
            }
          })
        }
      })
    }
  },
  bindGetUserInfo:function(e){
    let that = this;
    console.log(e.detail.userInfo);
    wx.setStorageSync('userInfo', e.detail.userInfo);//存储userInfo

    let data = { ...e.detail.userInfo };
    var wxFans = wx.getStorageSync('user') || {};
    data.unionid = wxFans.unionid;
    data.appid = config.APPID;
    data.openid = wxFans.openid;
    
    wx.request({
      url: config.HTTP_BASE_URL + "/app/wxFans_updateInfo",
      data: data,
      success: function (res) {
        console.log(res);        
      },
      fail: function (e) {
        console.log(e);
      }
    });
    that.setData({
      userInfo: e.detail.userInfo,
      hasShouQuan: true
    });
  },
//  转发
  onShareAppMessage: function () {
    util.commonShare
  },
  // 获取位置
  getLocation: function (e) {
    wx.getLocation({
      type: 'gcj02', //返回可以用于wx.openLocation的经纬度
      success: function (res) {
        var latitude = res.latitude
        var longitude = res.longitude
        wx.openLocation({
          latitude: latitude,
          longitude: longitude,
          scale: 18,
          name: '广美整形医院',
          address: "广州市天河区燕岭路13号"
        })
      }
    })
  },
  // 清楚缓存
  clearStorage: function () {
    var that = this;
    that.setData({
      loading: true,
      disabled: true
    });
    wx.clearStorage({
      success: function () {
        that.setData({
          loading: false,
          disabled: false,
        });
        wx.showToast();
      }
    });

  }



  

})