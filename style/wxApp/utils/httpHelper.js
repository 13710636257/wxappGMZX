var config = require('../config.js')
const app = getApp();

function __args() {
  var setting = {};
  if (arguments.length === 1 && typeof arguments[0] !== 'string') {
    setting = arguments[0];
  } else {
    setting.url = arguments[0];
    if (typeof arguments[1] === 'object') {
      setting.data = arguments[1];
      setting.success = arguments[2];
    } else {
      setting.success = arguments[1];
    }
  }
  return setting;
}

function __json(method, setting) {
  setting.method = method;
  setting.header = {
    'content-type': 'application/json',
    'X-Requested-With': 'XMLHttpRequest' //ajax请求
  };
  wx.request(setting);
}


function Get(url, data, cb) {
  wx.showNavigationBarLoading();
  wx.request({
    method: 'GET',
    url: config.HTTP_BASE_URL + url,
    data: data,
    dataType:'json',
    header: {
      'content-type': 'application/json' // 默认值
      ,'X-Requested-With':'XMLHttpRequest' //ajax请求
      //, 'openid': app.globalData.openid
    },
    success: (res) => {
      typeof cb == "function" && cb(res.data, "");
      wx.hideNavigationBarLoading();
    },
    fail: (err) => {
      typeof cb == "function" && cb(null, err.errMsg);
      wx.hideNavigationBarLoading();
    }
  });
};

function Post(url, data, cb) {
  wx.request({
    method: 'POST',
    url: config.HTTP_BASE_URL + url,
    data: data,
    header:{
      'content-type': 'application/x-www-form-urlencoded' //必须是这种格式，后台才能够拿到数据
      , 'X-Requested-With': 'XMLHttpRequest'
    },
    success: (res) => {
      typeof cb == "function" && cb(res.data, "");
    },
    fail: (err) => {
      typeof cb == "function" && cb(null, err.errMsg);
      console.log("http请求:" + config.HTTP_url);
      console.log(err)
    }
  });
};

function Upload(url, file, data, cb) {
  wx.uploadFile({
    url: config.HTTP_BASE_URL + url,
    filePath: file,
    name: "file",
    formData: data,
    success: (res) => {
      if (typeof(res.data) == "string") {
        typeof cb == "function" && cb(JSON.parse(res.data), "");
      } else {
        typeof cb == "function" && cb(res.data, "");
      }

    },
    fail: (err) => {
      typeof cb == "function" && cb(null, err.errMsg);
    }
  });
};


module.exports = {
  httpGet: Get,
  httpPost: Post,
  httpUpload: Upload,
  getJSON: function () {
    __json('GET', __args.apply(this, arguments));
  },
  postJSON: function () {
    __json('POST', __args.apply(this, arguments));
  },
  sendTemplate: function (data, success, fail) {
    this.getJSON({
      url: config.HTTP_BASE_URL + '/wxTemplate_sendTemplateMessage',
      data: data,
      success: success,   // 
      fail: fail
    });
  }
};