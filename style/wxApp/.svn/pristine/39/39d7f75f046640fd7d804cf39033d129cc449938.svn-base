var WxAutoImage = require('../../../utils/wxAutoImageCal.js');
var config = require('../../../config.js')
var http = require('../../../utils/httpHelper.js')

var app = getApp();

Page({
  onLoad: function () {
    var that = this;
    http.httpGet(config.HTTP_CMS_CATEGORY_ITEM_URL, {}, function (res) {
      console.info(res);
      var categoryItem = res.obj;
      that.setData({ "categoryItem": categoryItem });
    }
    )
  },
  data: {
    currentItem: 1,
    categoryItem: {},
  },
  cusImageLoad: function (e) {
    var that = this;
    that.setData(WxAutoImage.wxAutoImageCal(e));
  },
  categoryClick: function (options) {
    var that = this
    var id = options.currentTarget.dataset.id;
    that.setData({
      'currentItem': id
    })
  }
})