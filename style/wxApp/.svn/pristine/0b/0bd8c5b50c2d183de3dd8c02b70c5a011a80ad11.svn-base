//全局过滤器 filter.js
const appData = getApp().globalData;

function identityFilter(pageObj) {
  if (pageObj.onShow) {
    let _onShow = pageObj.onShow;
    pageObj.onShow = function () {
      appData.promise.then(() => {
        //跳转到登录页
        wx.redirectTo({
          url: "/pages/user/login/login"
        });
      }, () => {
        //获取页面实例，防止this劫持
        let currentInstance = getPageInstance();
        _onShow.call(currentInstance);
      });
    }
  }
  return pageObj;
}

function getPageInstance() {
  var pages = getCurrentPages();
  return pages[pages.length - 1];
}

exports.identityFilter = identityFilter;