
var config = require('../../../../config.js');
var http = require('../../../../utils/httpHelper.js');
var app = getApp();
Page({

  onLoad: function (options) {
    console.log(options);
    var that = this;
    http.httpGet(config.HTTP_wxfans_cashList_URL, { page: 1, rows: 10 }, function (res) {
      console.info(res);
      var cashList = res.obj;
      console.info(res.obj);
      that.setData({ "cashList": cashList });
    }
    )
  },

  data: {
    cashList: {}
  }


})