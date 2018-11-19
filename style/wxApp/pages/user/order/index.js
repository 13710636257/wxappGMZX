var config = require('../../../config.js');
var http = require('../../../utils/httpHelper.js');
var util = require('../../../utils/util.js');
var app = getApp();

var sliderWidth = 96; // 需要设置slider的宽度，用于计算中间位置

// pages/my.js
Page({
  data: {
    payStatuses: [{ value: 0, name: "未付款" }, { value: 1, name:"已付款" },
      { value: 2, name: "支付失败" }],
    payStatusIndex: 0,
    orderStatuses: [{ value: 0, name: "未付款" }, { value: 1, name:"已付款"},
      { value: 2, name: "已消费" }, { value: 3, name: "已完成" },
      { value: 4, name: "已退款" }, { value: 5, name: "已失效" }],
    orderStatusIndex: 0,
    wxFans:{},
    orderIndex: 0,
    scrollHeight: 0,
    hideShopPopup: true,
    beginPageIndex:1,
    endPageIndex:1,
    page:1, //第几页
    rows:10,  //一页显示多少条
    pageCount:0, //总页数
    recordList:[], //所有记录
    total:0, //总记录数量
    showId:'',  
    orderStatus: '',
    orderNo:'',
    payStatus:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    /*获取屏幕高度*/
    wx.getSystemInfo({
      success: function (res) {
        var scrollHeight = res.windowHeight - 118
        that.setData({
          scrollHeight: scrollHeight
        });
        console.log("scroll高度: " + scrollHeight)
      }
    });

    let wxFans = wx.getStorageSync('user') || {};
    let userInfo = wx.getStorageSync('userInfo') || {};

    that.setData({ wxFans: wxFans });

    that.getList(wxFans.unionid, that.data.orderStatus, that.data.payStatus, that.data.orderNo, 
      that.data.page, that.data.rows).then(function(res){

    }).catch(function(e){
      util.showToast(e.msg);
    });

  },

  getList: function (unionid, orderStatus, payStatus, orderNo,page,rows){
    let that = this;
    let data = {};
    data.unionid = unionid;
    data.orderStatus = orderStatus;
    data.orderNo = orderNo;
    data.page=page;
    data.rows = rows;
    data.payStatus = payStatus;

    return new Promise(function(resolve,reject){
      http.httpPost(config.SALE_LIST_QUERY, data ,function(ret){
        console.log(ret);   
        that.setData(ret);
        resolve(ret);
      });
    });    
  },

  // 支付状态
  bindPayChange: function (e) {
    console.log('picker pay  发生选择改变，携带值为', e.detail.value);
    this.setData({
      payStatusIndex: e.detail.value,
      payStatus: e.detail.value
    })
  },
  // 订单状态
  bindOrderChange: function (e) {
    console.log('picker pay  发生选择改变，携带值为', e.detail.value);
    this.setData({
      orderStatusIndex: e.detail.value,
      orderStatus: e.detail.value
    })
  },

  
  //sku弹出层
  showSale: function (e) {
    let that = this;
    let saleId = e.target.dataset.id;
    that.setData({
      showId: saleId
    })
  },
  //sku弹出层隐藏
  closeSkuTap: function () {
    this.setData({
      showId: ''
    })
  },

  deleteConfirm: function (e) { //删除
    console.log(e);
    let that = this;
    let saleId = e.target.dataset.id;
    wx.showModal({
      title: '确定删除该订单吗？',
      content: '',
      confirmText: "确认",
      cancelText: "取消",
      success: function (res) {
        if (res.confirm) {
          that.deleteSale(saleId).then(function(res){
            that.onLoad();
          }).catch(function(e){
            util.showToast(e.msg);
          });
        } else {
          console.log('取消')
        }
      }
    });
  },  

  payUI:function(e){ //支付 ： 跳到sku页面
    let that = this;
    let alias = e.target.dataset.alias;
    wx.navigateTo({
      url: '/pages/shop/sku/sku?alias=' + alias,
    });
  },

  //下一页
  nextPage: function (e) {
    console.log(e);
    var that = this;
    if (that.data.pageCount > that.data.page) {
      let p = that.data.page + 1;
      that.setData({
        page: p
      })
      that.getList(that.data.wxFans.unionid, that.data.orderStatus, that.data.payStatus, that.data.orderNo,
        that.data.page, that.data.rows);
    } else {
      util.showToast('已到最后一页了');
    }
  },
  //上一页
  prevPage: function (e) {
    console.log(e);
    var that = this;
    if (that.data.page > 1) {
      let p = that.data.page - 1;
      that.setData({
        page: p
      })
      that.getList(that.data.wxFans.unionid, that.data.orderStatus, that.data.payStatus, that.data.orderNo,
        that.data.page, that.data.rows);
    } else {
      util.showToast('已到第一页了');
    }
  },

  deleteSale:function(saleId){ //删除订单
    let that = this;
    let unionid = that.data.wxFans.unionid;
    return new Promise(function(resolve,reject){
      http.httpPost(config.sale_delete_url, { id: saleId, unionid: unionid} ,function(res){
        if(res.success){
          resolve(res);
        }else{
          reject(res);
        }
      });
    });
  },

  formSubmit:function(e){
    let that = this;
    console.log('form发生了submit事件，携带数据为：', e.detail.value)
    let data = e.detail.value;
    that.getList(that.data.wxFans.unionid, that.data.orderStatus, that.data.payStatus, that.data.orderNo,
      that.data.page, that.data.rows);
  }

})