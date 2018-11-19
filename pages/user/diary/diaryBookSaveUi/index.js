var util = require('../../../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hospital: ['天河旗舰院', '佛山旗舰院', '珠江旗舰院', '白云旗舰院'],
	xm: [
      {name: 'syp', value: '双眼皮'},
      {name: 'dyp', value: '单眼皮'},
      {name: 'syp', value: '双眼皮'}
    ],
    index: 0,
    date: '',
    tempFilePath1: '',
    tempFilePath2: '',
    tempFilePath3: '',
    savedFilePath1: wx.getStorageSync('savedFilePath1') || '',
    savedFilePath2: wx.getStorageSync('savedFilePath2') || '',
    savedFilePath3: wx.getStorageSync('savedFilePath3') || ''
  },
  onLoad: function (options) {
    var that = this;
	var dateTime = util.formatDate(new Date()); 
	console.log('date',dateTime)
	that.setData({
		date:dateTime
	})
  },
  checkboxChange: function(e) {
    console.log('checkbox发生change事件，携带value值为：', e.detail.value)
  },
  bindPickerChange: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
    })
  },
  bindDateChange: function(e) {
    this.setData({
      date: e.detail.value
    })
  },
  
  chooseImage1: function () {
    var that = this
    wx.chooseImage({
      count: 1,
      success: function (res) {
        that.setData({
          tempFilePath1: res.tempFilePaths[0]
        })
		console.log('tempFilePath1',that.data.tempFilePath1)
      }
    })
  },  
  chooseImage2: function () {
    var that = this
    wx.chooseImage({
      count: 1,
      success: function (res) {
        that.setData({
          tempFilePath2: res.tempFilePaths[0]
        })
		console.log('tempFilePath2',that.data.tempFilePath2)
      }
    })
  },  
  chooseImage3: function () {
    var that = this
    wx.chooseImage({
      count: 1,
      success: function (res) {
        that.setData({
          tempFilePath3: res.tempFilePaths[0]
        })
		  /*
		  wx.saveFile({
			tempFilePath: that.data.tempFilePath3,
			success: function (res) {
			  that.setData({
				savedFilePath3:res.savedFilePath
			  })
			console.log('tempFilePath3333',that.data.savedFilePath3)

			  wx.setStorageSync('savedFilePath3', res.savedFilePath)
			},
			fail: function (res) {
				console.log('上传失败')
			}
		  })
		*/
		console.log('tempFilePath3',that.data.tempFilePath3)
      }
    })
  },  
  clear: function () {
	var that = this;
    wx.showModal({
      title: '确定删除图片？',
      content: '',
      confirmText: "确认",
      cancelText: "取消",
      success: function (res) {
        console.log(res);
        if (res.confirm) {
			wx.setStorageSync('savedFilePath', '')
			that.setData({
			  tempFilePath1: '',
			  savedFilePath1: '',
			  tempFilePath2: '',
			  savedFilePath2: '',
			  tempFilePath3: '',
			  savedFilePath3: ''
			})
        } else {
          console.log('取消')
        }
      }
    });	  
	  
  },
  
  
  //确认发布
  goDetail: function (e) {
    setTimeout(() => {
      var pawValue = e.detail.value.password
      var pawValue2 = e.detail.value.password2
      console.log(pawValue)
      if (pawValue == null || pawValue == "") {
        this.setData(
          { showTopTips: "密码不能为空" }
        );
        this.ohShitfadeOut();
        return;
      }
      if (pawValue !== pawValue2 ) {
        this.setData(
          { showTopTips: "两次密码不一样" }
        );
        this.ohShitfadeOut();
        return;
      }      

    }, 100)

  },

  ohShitfadeOut() {
    var fadeOutTimeout = setTimeout(() => {
      this.setData({ showTopTips: '' });
      clearTimeout(fadeOutTimeout);
    }, 3000);
  }

})