var util = require('../../../../utils/util.js');
var http = require('../../../../utils/httpHelper.js');
var app = getApp();
var config = require('../../../../config.js')

Page({

  data: {
    showTips: false,
    errorTip: "错误提示！",
    wxFans: {},
    currAddress: '',
    startdate: "",
    address: '', //预约地址
    addresses: app.globalData.addresses,
    checkboxItems: app.globalData.yuYueItems,
    items:[],
    addressIndex: 0,
    yuyueTime: '', //预约时间
    nowDate: new Date(),
  },

  onLoad: function (options) {
    var that = this;
    var dateTime = util.formatDate(new Date());
    console.log('date', dateTime)
    that.setData({
      yuyueTime: dateTime,
      startdate: dateTime,
      address: that.data.addresses[that.data.addressIndex].alias
    })

    let wxFans = wx.getStorageSync('user') || {};
    let userInfo = wx.getStorageSync('userInfo') || {};
    console.log(wxFans.unionid);
    if (!wxFans.unionid) {
      app.getWxFans().then(function (res) {
        console.log(res);
        that.setData({
          wxFans: res.data
        });
        return Promise.resolve(res);
      })
    } else {
      that.setData({
        wxFans: wxFans
      });
    }
  },

  showTopTip: function () {
    var that = this;
    that.setData({
      showTips: true
    });
    setTimeout(function () {
      that.setData({
        showTips: false
      });
    }, 2000);
  },
 
  checkboxChange: function (e) {
    console.log('checkbox发生change事件，携带value值为：', e.detail.value);
    let that = this;
    var checkboxItems = that.data.checkboxItems,
      values = e.detail.value;
    for (var i = 0, lenI = checkboxItems.length; i < lenI; ++i) {
      checkboxItems[i].checked = false;
      for (var j = 0, lenJ = values.length; j < lenJ; ++j) {
        if (checkboxItems[i].value == values[j]) {
          checkboxItems[i].checked = true;
          break;
        }
      }
    }
    that.setData({
      checkboxItems: that.data.checkboxItems,
      items: e.detail.value
    });
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
    this.setData({
      yuyueTime: e.detail.value
    })
  },

  clear: function () {
    wx.clearStorage();
  },
  //提交表单
  formSubmit: function (e) {
    console.log(e.detail.value);
    var that = this;

    let data = e.detail.value;
    data.item = that.data.items;
    data.yuyueTime = that.data.yuyueTime;
    data.unionid = that.data.wxFans.unionid;
    data.address = that.data.address;
    data.channel = "广美整形小程序";
    console.log(data);

    if (data.item == '' || that.data.hospitals == '' || data.description == '') {
      that.setData({
        errorTip: '不能为空！'
      })
      that.showTopTip();
      return false;
    }

    

    http.httpPost(config.YuYue_ADD_URL, data, function (res) {
      console.info(res);
      if (res.success) {
        util.showToast("预约成功!");
      } else {
        util.showToast(res.msg);
      }
    });    
  },
  formReset: function (e) {
    let that = this;
    console.log('form发生了reset事件，携带数据为：', e.detail.value)
    that.setData({
      chosen: ''
    })
  }
});