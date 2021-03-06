var WxParse = require('../../../../wxParse/wxParse.js');
var config = require('../../../../config.js');
var http = require('../../../../utils/httpHelper.js');
var app = getApp();
Page({
  data: {
	id:'',
	name:'',
	sex:'',
	city:'',
	time:'',
	duibiImg1:'',
	duibiImg2:'',
	duibiImg3:'',
	hospital:'',
	price:'',
	content:'',
  content1: '',
	item:'',
    showNoMore: false	
  },

  onLoad: function (options) {
    console.log(options);
    var that = this;
	that.setData({
		id:options.id
	})
    this.getList();
  },

  getList: function (e) {
    var that = this;
    http.httpGet(config.HTTP_wxfans_diaryDetails_URL+"?id="+that.data.id,{},function (res) {
      if (res.success) {
        that.setData({
          name:res.obj.rows.name,
          sex:res.obj.rows.sex,
          city:res.obj.rows.city,
          time:res.obj.rows.time,
          duibiImg1:res.obj.rows.duibiImg1,
          duibiImg2:res.obj.rows.duibiImg2,
          duibiImg3:res.obj.rows.duibiImg3,
          hospital:res.obj.rows.hospital,
          price:res.obj.rows.price,
          content: res.obj.rows.content,
          content1: [{
            name: 'li',
            attrs: {
              class: 'div_class',
              style: 'line-height: 60px; color: red;'
            },
            children: [{
              type: 'text',
              text: res.obj.rows.content
            }]
          }],
          item:res.obj.rows.item,
          showNoMore: false
        })
        var content = that.data.content;
        console.log("suibia:"+content);
        WxParse.wxParse('content', 'html', content, that, 5)
      }else{
        that.setData({
          showNoMore: true
        })
      }
    });
  },
  //图片点击事件
  imgBig: function (event) {
    var that = this;
    var src = event.currentTarget.dataset.src;
    var imgList = [that.data.duibiImg1, that.data.duibiImg2, that.data.duibiImg3];
    console.log(imgList);
    wx.previewImage({
      current: src,
      urls: imgList
    })
  }

})


