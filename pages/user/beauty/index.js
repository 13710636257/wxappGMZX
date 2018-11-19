var app = getApp();

Page({
  userInfo: {},
  data: {
    beautyList: [
      { 'name': '我的积分', 'url': '/pages/user/beauty/score/index' },
      { 'name': '报备推荐', 'url': '/pages/user/beauty/baoBeiUi/index' },
      { 'name': '报备记录', 'url': '/pages/user/beauty/baoBeiList/index' },
      { 'name': '我的消费', 'url': '/pages/user/beauty/cashList/index' },
      { 'name': '我的团队', 'url': '/pages/user/beauty/team/index' },
      { 'name': '修改密码', 'url': '/pages/user/beauty/editPwd/index' },
      { 'name': '美丽大使介绍', 'url': '/pages/user/beauty/introduce/index' },
      { 'name': '积分规则', 'url': '/pages/user/beauty/rule/index' },
      { 'name': '客服电话', 'url': 'gmzx.com' },
      { 'name': '在线咨询', 'url': 'gmzx.com' },
      { 'name': '关于我们', 'url': 'gmzx.com' }
    ]
  },
  onLoad: function () {
    var that = this;
    wx.login({
      success: function () {
        wx.getUserInfo({
          success: function (res) {
            that.setData({
              userInfo: res.userInfo
            })
          }
        })
      }
    });
  }
})