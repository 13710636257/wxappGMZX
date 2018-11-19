var WxParse = require('../../../wxParse/wxParse.js');
var WxAutoImage = require('../../../utils/wxAutoImageCal.js');
var http = require('../../../utils/httpHelper.js')
var config = require('../../../config.js')
var app = getApp();

Page({
  onLoad: function (option) {
    var itemIndex = option.id - 1;
    var that = this;
    http.httpGet(config.HTTP_INDEX_ITEMCONTENT_URL, {}, function (res) {
      var itemOne = res;
      // console.info(res);
      that.setData({ "itemOne": itemOne });
      console.info(that.data.itemOne);
      var content = that.data.itemOne.content;
      WxParse.wxParse('content', 'html', content, that, 5)
      wx.setNavigationBarTitle({ title: that.data.itemOne.title })
    }
    ) 
  },
  data: {
    itemOne: {}
  },
})
