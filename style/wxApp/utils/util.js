var config = require('../config.js')
var http = require('./httpHelper.js')
var app = getApp();

function formatTime(date) {
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()

  var hour = date.getHours()
  var minute = date.getMinutes()
  var second = date.getSeconds()
  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

function formatDate(date) {
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()

  return [year, month, day].map(formatNumber).join('-')
}

function diffDate(value) { // 比较日期  日期字符串格式： yyyy-MM-dd HH:mm:ss
  var dB = new Date(Date.parse(value.replace(/-/g, "/")));
  var now = new Date();
  if (now > dB) { //现在在某日期之后
    return 1;
  }
  return 0; //现在在某日期之前
}

function isPhone(str) {
  var myreg = /^[1][3,4,5,6,7,8,9][0-9]{9}$/;
  if (!myreg.test(str)) {
    return false;
  } else {
    return true;
  }
}


function transDate(mescStr) {
  var n = mescStr;
  var date = new Date(n);
  var Y = date.getFullYear() + '-';
  var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
  var D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
  return (Y + M + D)
}

function formatNumber(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}

function showToast(title) {
  wx.showToast({
    title: title,
    icon: 'none'
  })
}

//计算数组的长度，如果数组里面的为对象的话，length不对
function count(o) {
  var t = typeof o;
  if (t == 'string') {
    return o.length;
  } else if (t == 'object') {
    var n = 0;
    for (var i in o) {
      n++;
    }
    return n;
  }
  return false;
}
//  用户点击右上角分享
function commonShare() {
  return {
    title: '广美整形',
    path: '/pages/cms/index?id=123',
    success: function(res) {
      console.log("转发成功");
    },
    fail: function(res) {
      console.log("转发失败");
    }
  }
}

//反回顶部
function scrollTop(){
  wx.pageScrollTo({
    scrollTop: 0
  });
}

module.exports = {
  formatTime: formatTime,
  formatDate: formatDate,
  diffDate: diffDate,
  showToast: showToast,
  count: count,
  isPhone: isPhone,
  scrollTop: scrollTop,
  transDate: transDate,
  commonShare: commonShare
}