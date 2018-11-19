var util = require('../../../utils/util.js')
Page({
  //页面的初始数据
  data: {
    name: '',
    phone: '',
    city: '',
    description: '',
    mail: '',
    citys: ["广东省", "上海市", "江苏省","浙江省"],
    cityIndex: 0,
    addressInfo: null
  },
  onLoad: function (options) {
    var that = this;
  },
  //确认发布
  goDetail: function (e) {
    var that = this;
    var name = e.detail.value.name,
      phone = e.detail.value.phone,
      city = e.detail.value.city,
      description = e.detail.value.description,
      mail = e.detail.value.mail;
    console.log(name + phone + city);
    setTimeout(() => {
      if (!that.isphone(phone)) {
        this.setData(
          { showTopTips: "手机号码格式错误！" }
        );
        this.ohShitfadeOut();
        return;
      }
      if (name == "" || phone == "" || city == "" || description == "" || mail == "") {
        this.setData(
          { showTopTips: "表单不能为空" }
        );
        this.ohShitfadeOut();
        return;
      }
    }, 100)
  },
  isphone(str) {
    var myreg = /^[1][3,4,5,7,8][0-9]{9}$/;
    if (!myreg.test(str)) {
      return false;
    } else {
      return true;
    }
  },
  ohShitfadeOut(str) {
    var fadeOutTimeout = setTimeout(() => {
      this.setData({ showTopTips: '' });
      clearTimeout(fadeOutTimeout);
    }, 3000);
  },
// 选择身份
  bindcityChange: function (e) {
    console.log('picker country 发生选择改变，携带值为', e.detail.value);
    this.setData({
      cityIndex: e.detail.value
    })
  }
  
})