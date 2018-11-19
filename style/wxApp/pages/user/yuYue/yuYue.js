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
    yuYue:{},
    wxFans:{},
    currAddress:'',
    addressIndex:'',
    yuyueTime:'', //预约时间
    hiddenModal: true,
    cardNO:'',
    hasYuYue:false, //是否已预约
    nowDate: new Date(),
    address:'', //预约地址    
    addresses: app.globalData.addresses
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
    this.setData({
      hiddenModal: !this.data.hiddenModal
    })
  },
  rulesConfirm: function () {
    this.setData({
      hiddenModal: true
    })
  },
  rulesrCancel: function () {
    this.setData({
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
  bindDateChange:function(e){
    this.setData({
      yuyueTime: e.detail.value
    })
  },

  clear:function(){
    wx.clearStorage();
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var scene = decodeURIComponent(options);
    let alias = scene.q || 'store5000';
    console.log(alias);


    let wxFans = wx.getStorageSync('user') || {};
    let userInfo = wx.getStorageSync('userInfo') || {};
    let yuyueInfo = wx.getStorageSync('yuyue' + alias) || {};//存储预约信息
    let cardNO = wx.getStorageSync('storeCardNO-' + alias) || ''; //存储的卡号
    if (yuyueInfo.yuyueTime){
      that.setData(yuyueInfo);
      return ;
    }

    that.setData({
      cardNO: cardNO
    });

    console.log(wxFans.unionid);
    if(!wxFans.unionid){
      app.getWxFans().then( function(res){
        console.log(res);
        that.setData({
          wxFans: res.data
        });   
        return Promise.resolve(res);   
      }).then( function(res) {
        that.getAppointment(alias,res.data.unionid);
        return Promise.resolve(res);   
      });
    }else{
      that.setData({
        wxFans: wxFans
      });      
      that.getAppointment(alias);
    }
  },

  getAppointment: function (alias, unionid){
    var that = this;
    return new Promise(function (resolve, reject) { 
      http.httpGet(config.YuYue_URL, { alias: alias, unionid: unionid || that.data.wxFans.unionid }, function (res) {
        console.info(res);
        var yuYue;
        if(res){
          yuYue = res;
          var addressIndex = 0;
          let yuyueTime=new Date();
          let address;
          let hasYuYue=false;
          if (res.needHospital && res.appointments.length>0){
            let appointment = res.appointments[0];
            hasYuYue=true;
            yuyueTime = new Date(Date.parse(appointment.yuyueTime));
            console.info(yuyueTime);
            for (let i = 0; i < app.globalData.addresses.length; i++) {
              if (appointment.address === app.globalData.addresses[i].alias) {
                addressIndex=i;
                address = appointment.address;
              }
            }
          }

          WxParse.wxParse('description', 'html', yuYue.description, that, 5)
          that.setData({
            "yuYue": yuYue
            , "addressIndex": addressIndex
            , "yuyueTime": util.formatDate(yuyueTime)
            , "address": address || ''
            , "hasYuYue": hasYuYue
          });
          resolve(res);
        }
      });
    });
  },

  // 获取手机号码
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
              , 'X-Requested-With': 'XMLHttpRequest'
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
                that.onLoad();
              } else {
                util.showToast('更新号码失败，请重试')
              }
            },
            fail: function (err) {
              console.log(err);
              util.showToast('更新号码失败');
            }
          })
        }
      })
    }
  },

  formSubmit:function(e){
    let that = this;
    if (that.data.hasYuYue){
      //util.showToast("您已预约过了");
      //return;
    }
    console.log('form发生了submit事件，携带数据为：', e.detail.value)
    let data= e.detail.value;
    data.yuyueTime = that.data.yuyueTime;
    data.alias = that.data.yuYue.alias;
    data.unionid = that.data.wxFans.unionid;
    data.address = that.data.address;
    data.channel="广美整形小程序";
    console.log(data);

    //提交前的验证
    if (!data.name || data.name.length<2){
      util.showToast('请输入真实姓名!');
      return;
    }
    if ( !util.isPhone(data.phone) ) {
      util.showToast('请输入11位手机号码!');
      return;
    }   
    if (!data.cardNO) {
      util.showToast('请输入卡号!');
      return;
    }
    that.activeCard(data).then(function(ret){
      console.log(ret);
      return new Promise(function (resolve, reject){
        http.httpPost(config.YuYue_BAOMING_URL, data, function (res) {
          console.info(res);
          if (res.success) {
            util.showToast("预约成功");
            wx.setStorageSync('yuyue' + data.alias, that.data);//存储预约信息
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
  },

  activeCard:function(data){
    let that = this;
    //激活卡号
    return new Promise(function (resolve, reject) {
      http.httpPost(config.STORECARD_ACTIVE_URL, data, function (res) {
        console.info(res);
        if (res.success) {
          wx.setStorageSync('storeCardNO-' + data.alias, res.obj.cardNO);//存储卡号信息
          that.setData({
            cardNO: res.obj.cardNO
          });
          resolve(res);
        } else {
          reject(res);
        }        
      });
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