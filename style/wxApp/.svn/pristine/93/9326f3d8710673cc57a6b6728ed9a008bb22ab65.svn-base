var app = getApp();

Page({

  //确认发布
  goDetail: function (e) {
    setTimeout(() => {
      var name = e.detail.value.name
      var phone = e.detail.value.phone
      var myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/;
      console.log(name)
      if (name == null || phone == "") {
        this.setData(
          { showTopTips: "姓名跟手机号码不能为空" }
        );
        this.ohShitfadeOut();
        return;
      }
      if (!myreg.test(phone)) {
        this.setData(
          { showTopTips: "手机号码格式错误" }
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
  },

})