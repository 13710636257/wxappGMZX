var config = require('../../../../config.js');
var http = require('../../../../utils/httpHelper.js');
var app = getApp();
Page({
  data: {
    id: '',
    name: '',
    description: '',
    picHead: '',
    picBack: '',
    createTime: '',
    startTime: '',
    endTime: '',
    price: '',
    state: '',
	headShow:true,
	backShow:false,
    showNoMore: false
  },
  
  onLoad: function (options) {
    console.log(options);
    var that = this;
    that.setData({
      id: options.id
    })
    this.getList();
  },

  getList: function (e) {
    var that = this;
    http.httpGet(config.HTTP_wxfans_quanDetails_URL + "?id=" + that.data.id, {}, function (res) {
      if (res.success) {
        that.setData({
          id: res.obj.rows.id,
          name: res.obj.rows.name,
          description: res.obj.rows.description,
          picHead: res.obj.rows.picHead,
          picBack: res.obj.rows.picBack,
          createTime: res.obj.rows.createTime,
          startTime: res.obj.rows.startTime,
          endTime: res.obj.rows.endTime,
          price: res.obj.rows.price,
          state: res.obj.rows.state,
          showNoMore: false
        })		
		
      } else {

        that.setData({
          showNoMore: true
        })

      }

    });
  },
  
  switchImg: function(){
	var that = this
	if(that.data.headShow){
		that.setData({
			headShow:false,
			backShow:true
		})
	}else{
		that.setData({
			headShow:true,
			backShow:false
		})
	}
	  
  }

})