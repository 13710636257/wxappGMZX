var config = require('../../../../config.js');
var http = require('../../../../utils/httpHelper.js');
var app = getApp();
Page({
  data: {
    list: [],
    showLoadMore: false,
    showNoMore: false,
    showlist: false,
    page: 1,
    total: 0,
    scrollHeight: 0,
    isbut: true,
    rows: 20
  },

  onLoad: function (options) {
    console.log(options);
    var that = this;
    this.getList();
    /*获取屏幕高度*/
    wx.getSystemInfo({
      success: function (res) {
        var hight = (res.windowHeight) * (750 / res.windowWidth);
        that.setData({
          scrollHeight: hight
        });
        console.log("屏幕高度: " + res.windowHeight + " 像素比", res.pixelRatio, "  ", hight)
      }
    })
  },

  getList: function (e) {
    var that = this;
    http.httpGet(config.HTTP_wxfans_diaryBookList_URL, { page: that.data.page, rows: that.data.rows }, function (res) {
      if (res.success) {
        /*判断有没有数据*/
        if (res.obj.total == 0) {
          that.setData({
            showlist: true
          })
          return;
        }
        console.log('that.data.page:' + that.data.page)
        var page = that.data.page;
        var listNum = that.data.rows;
        var curPage = (page - 1) * listNum;
        var List3 = that.data.list;
        console.log('page', page)
        console.log('listNum', listNum)

        if (page == 1) {
          that.setData({
            list: res.obj.rows.slice(curPage, listNum),
            total: res.obj.total,
            showLoadMore: true
          });
          console.log('list', that.data.list)
        } else {
          var List2 = res.obj.rows.slice(curPage, curPage + listNum);
          console.log('curPage', curPage);
          console.log('List2', List2);
          for (var i = 0; i < List2.length; ++i) {
            List3.push(List2[i]);
          }
          console.log('List3', List3)
          that.setData({
            list: List3,
            total: res.obj.total,
            isbut: true
          });
        }

      } else {

        that.setData({
          showNoMore: true
        })

      }

    });
  },

  loadMore: function (e) {
    var that = this;
    if (that.data.isbut) {
      if (that.data.page * 20 > that.data.total) {
        that.setData({
          showLoadMore: false,
          showNoMore: true,
          isbut: false
        });
      } else {
        var p = that.data.page + 1;

        that.setData({
          page: p,
          showLoadMore: true,
          isbut: false
        })
        that.getList();
      }
    }
  },
  tapAction: function (e) {
    console.log(e);
    wx.navigateTo({
      url: '../diaryDetail/index?id=' + e.currentTarget.dataset.id,
      success: function (res) {
        // success
      },
      fail: function () {
        // fail
      },
      complete: function () {
        // complete
      }
    })
  },

  openConfirm: function (e) {
    var that = this;
    var id = e.currentTarget.dataset.id;
    var index = e.currentTarget.dataset.index;
    var title = e.currentTarget.dataset.title;
    console.log("id", id);
    console.log("index", id);
    var arr = that.data.list;
    wx.showModal({
      title: '确定删除该篇日记吗？',
      content: title,
      confirmText: "确认",
      cancelText: "取消",
      success: function (res) {
        console.log(res);
        if (res.confirm) {
          arr.splice(index, 1);
          console.log('arr', arr);
          that.setData({
            list: arr
          })
          wx.showToast({
            title: '删除成功',
            icon: 'success',
            duration: 2000
          })
        } else {
          console.log('取消')
        }
      }
    });
  }

})


