
var config = require('../../../../config.js');
var http = require('../../../../utils/httpHelper.js');
var app = getApp();
Page({

  onLoad: function (options) {
    console.log(options);
    var that = this;
    http.httpGet(config.HTTP_wxfans_teamList_URL, { page: 1, rows: 10 }, function (res) {
      console.info(res);
      console.log(res)
      var teamList = res.obj;
      var teamListLength = teamList.rows.length;
      console.info(res.obj);
      that.setData({ "teamList": teamList });
    }
    )
  },

  data: {
    teamList: {}
  }


})