var config = require('config.js')
var http = require('./utils/httpHelper.js')
var util = require('./utils/util.js')
var service = require('./utils/service.js')

//app.js
App({
  onLaunch: function () {
    //调用API从本地缓存中获取数据
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now());
    wx.setStorageSync('logs', logs);

    var that = this;
    var user = wx.getStorageSync('user') || {};
    var userInfo = wx.getStorageSync('userInfo') || {}; 

    if( (!user.openid)  || (!userInfo.nickName) ) {
      that.getUserInfo();
      that.getWxFans();
    }

    let p = new Promise(function (resolve, reject) {
      service.identityCheck(resolve, reject);
    });
    that.globalData.promise = p; 

  },
  
  getWxFans:function(parentUnionid){
    var that = this;
    return new Promise(function (resolve, reject) { 
      //调用登录接口:https://mp.weixin.qq.com/debug/wxadoc/dev/api/api-login.html#wxloginobject
      wx.login({
        success: function (res) {
          console.log(res);
          if (res.code) {            
            var code = res.code;
            //根据code.获取到粉丝的openid
            wx.request({
              url: config.HTTP_BASE_URL + "/app/wxFans_login",
              data: {
                code: res.code,
                appid:config.APPID,
                parentUnionid: parentUnionid
              },
              success:function(res){
                console.log( res);            
                if (res.statusCode==200 && res.data.success) {
                  that.globalData.user = res.data.obj;
                  wx.setStorageSync('user', res.data.obj);//存储openid 

                  var result = {
                    status: 200,
                    data: res.data.obj
                  }
                  resolve(result);
                }     
              },
              fail:function(e){
                console.log(e);
                reject(e);
              }
            });
          } else {
            console.log('获取用户登录态失败！' + res.errMsg);
            var result = {
              status: 300,
              data: '获取用户登录态失败！'
            }
            reject(result);  
          }
        }
      })
    })
  },
  checkStoreCard: function (storeCardAlias, cardNO){  //检查充值卡的卡号是否正确
    let that = this;
    return new Promise(function (resolve, reject) {
      http.httpGet(config.STORECARD_CHECKID_URL, { cardNO: cardNO, alias: storeCardAlias },function(res){
        if(res.success){
          resolve(res);
        }else{
          reject(res);
        }        
      });
    });
  },
  clear: function () {  //清理缓存
    wx.clearStorage();
  },
  getUserInfo:function(){
    let that = this;
    return new Promise(function (resolve, reject) {
      wx.getUserInfo({
        success: function (res) {
          console.log(res.userInfo);
          //发起网络请求
          var userInfo = res.userInfo;　//用户信息对象，不包含 openid 等敏感信息
          that.globalData.userInfo = userInfo;
          wx.setStorageSync('userInfo', userInfo);//存储userInfo
          var result = {
            status: 200,
            data: res.userInfo
          }
          resolve(result);
        },
        fail: function (e) {
          console.log(e);
          reject(e);
        }
      });
    });
  },
  getPhoneNumber:function(e){
    let that = this;
    return new Promise(function (resolve, reject) {
      if (e.detail.errMsg == 'getPhoneNumber:fail user deny') {        
        reject('您未授权，更新号码失败，将不能使用部分功能，请重试!');
      }else{
        resolve(e);
      }
    });
  },
  login:function(e){
    let that = this;
    return new Promise(function (resolve, reject){
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
                resolve(res.data.obj);
              } else {                
                reject('更新号码失败，请重试');
              }
            },
            fail: function (err) {
              console.log(err);
              reject('更新号码失败');
            }
          })
        }
      })
    });
  },
  globalData:{
    userInfo:null,
    promise:null,
    user:null,
    parentUnionid:'', //推荐人
    addresses: [{
      "alias": "tianHe",
      "name": "天河旗舰院"
    },      
      {
        "alias": "baiYue",
        "name": "白云旗舰院"
      },
      {
        "alias": "zhuJiang",
        "name": "珠江新城精品院"
      },
      {
        "alias": "huaDu",
        "name": "花都旗舰院"
      },
      {
        "alias": "foShan",
        "name": "佛山旗舰院"
      }],
    yuYueItems: [
      { name: '手术', value: '手术' },
      { name: '皮肤', value: '皮肤' },
      { name: '注射', value: '注射' }
    ]
  },
  
 
})