//const baseUrl = 'http://natapp.gmzx.com/gmweb';
const baseUrl = 'https://wx.gmzx.com';
const config = {
  APPID:'wx2610b9ef9485e09e',  //广美服务号关联的小程序
  APPSECRET:'964288a662d25f7b0e82735dd3d8bf68',
  HTTP_BASE_URL:baseUrl,
  swtUrl: "https://gmzx.zoosnet.net/LR/Chatpre.aspx?id=LGU31671888&lng=cn",
  paySuccessTemplate:'XHy2xAMPQ3avEX4-I9P1BfVfgub-39RFA7ojFCvxCX4', //支付成功的模板消息id
  HTTP_INDEX_NAV_URL: "/wxApp/index/navTop.json",
  HTTP_INDEX_NAV_ITEMS_URL: "/wxApp/index/navItems.json",
  HTTP_INDEX_ICON_ITEMS_URL: "/wxApp/cms/iconItems.json",
  HTTP_INDEX_PROBANNER_ITEMS_URL:"/wxApp/cms/proBanner.json",
  HTTP_INDEX_ITEMCONTENT_URL: "/wxApp/cms/itemContent.json",
  HTTP_INDEX_MINGYUAN_URL: "/wxApp/cms/mingyuanItems.json",
  HTTP_wxfans_baobeiList_URL: "/wxApp/user/wxFans/baobeiList.json",
  HTTP_wxfans_cashList_URL: "/wxApp/user/wxFans/cashList.json",
  HTTP_wxfans_diaryBookList_URL: "/wxApp/user/wxFans/diaryBookList.json",
  HTTP_wxfans_diaryDetails_URL: "/wxApp/user/wxFans/diaryDetails.json",
  HTTP_wxfans_scoreList_URL: "/wxApp/user/wxFans/scoreList.json",
  HTTP_wxfans_quanList_URL: "/wxApp/user/wxFans/quanList.json",
  HTTP_wxfans_quanDetails_URL: "/wxApp/user/wxFans/quanDetails.json",
  HTTP_wxfans_teamList_URL: "/wxFans_appTeamAjax", //wxApp/user/wxFans/teamList.json
  HTTP_SHOP_INDEX_NAV_URL: "/wxApp/shop/index/navTop.json",
  HTTP_SHOP_INDEX_LIST1_URL: "/wxApp/shop/index/productList1.json",
  HTTP_SHOP_INDEX_LIST2_URL: "/wxApp/shop/index/productList2.json",
  HTTP_SHOP_INDEX_LIST3_URL: "/wxApp/shop/index/productList3.json",
  HTTP_SHOP_INDEX_PROJECT1_URL: "/wxApp/shop/index/mallProjects.json",
  YuYue_URL: '/appointment_yuYueInfoAjax', //wxApp/yuYue/yuYue.json
  STORECARD_CHECKID_URL:'/storeCard_checkCardNOAjax',
  STORECARDRECORD_INFO_URL:'/storeCard_appViewAjax',  
  STORECARD_ACTIVE_URL: '/storeCard_activeCardAjax',
  YuYue_BAOMING_URL: '/appointment_baoMingAjax',
  YuYue_ADD_URL: '/appointment_addAjax', //普通预约
  SHOP_SKUDETAIL:'/productSku_appBuyUI',
  SALE_LIST_QUERY:'/sale_appList',
  sale_delete_url:'/sale_deleteJson'

}

module.exports = config;
