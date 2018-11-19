Page({

  /**
   * 页面的初始数据
   */
  data: {

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
  },

})