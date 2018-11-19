
var config = require('../../../config.js');
var http = require('../../../utils/httpHelper.js');
var util = require('../../../utils/util.js');

const app = getApp()
Page({
  data: {
    list: [],
    showLoadMore: false,
    showNoMore: false,
    showlist: false,
    page: 1, //当前页
    total: 0,  //总数量
    rows: 12,  //一页的数量
    scrollHeight: 0,
    isbut: true,
    scrollY:true

  },

  onLoad: function (options) {
    console.log(options);
    var that = this;
    let wxFans = wx.getStorageSync('user') || {};

    that.getList();
    /*获取屏幕高度*/
    wx.getSystemInfo({
      success: function (res) {
        var hight = (res.windowHeight) * (750 / res.windowWidth);
        var scrollHeight = res.windowHeight - 115
        that.setData({
          scrollHeight: scrollHeight
        });
        console.log("屏幕高度: " + res.windowHeight + " 像素比", res.pixelRatio, "  ", scrollHeight)
      }
    })
  },
  //从服务器获取团队人员
  getList: function (e) {
    var that = this;
    let wxFans = wx.getStorageSync('user') || {};
    let data = { ...wxFans};
    data.page = that.data.page;
    data.rows = that.data.rows;
    data.type=1;

    http.httpGet(config.HTTP_wxfans_teamList_URL,data, function (res) {
      console.log(res);
      that.setData({ ...res });
    });
  },
 //下一页
  nextPage: function (e) {
    console.log(e);
    var that = this;
    if (that.data.pageCount > that.data.page) {
      let p = that.data.page +1;
      that.setData({
        page: p
      })
      that.getList();
    }else{
      util.showToast('已到最后一页了');
    }
    
  }, 
  //上一页
  prevPage:function(e){
    console.log(e);
    var that = this;
    if (that.data.page>1) {
      let p = that.data.page - 1;
      that.setData({
        page: p
      })
      that.getList();
    }else{
      util.showToast('已到第一页了');
    }
   
  }
})