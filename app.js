
//引入地图api
var bmap = require('/libs/bmap-wx.min.js')
//app.js
App({
  onLaunch: function () {
    //这东西不要删除，我用来对地理位置测试使用
    wx.openSetting()
  },
  //获取当前位置
  getCurAddress: function (cb1,cb2) {
    var that = this
    var BMap = new bmap.BMapWX({
      ak: 'eh56CvgsYTcELc7i6qeI78P3x7eory4o'
    });
    var fail = function (data) {
      console.log(data)
    };
    var success = function (res) {
      console.log(res)
      that.addressData.curAddress = res.wxMarkerData[0].address
      typeof cb1 == "function" && cb1(that.addressData.curAddress)
    }
    wx.getLocation({
      success (res) {
        BMap.regeocoding({
          location: res.latitude + ',' + res.longitude,
          fail: fail,
          success: success,
        });
      },
      fail (err) {
        console.log(err)
        //如果是用户自己关闭地理授权则，则显示开启定位
        if (err.errMsg == "getLocation:fail auth deny"){
          wx.showModal({
            title: '提示',
            content: '由于您没有同意定位授权,导致定位失败',
          })
        }else{
          wx.showModal({
            title: '提示',
            content: '地理位置定位失败，请重新定位',
          })
        }
        cb2()
      }
    })
  },
  //当用户取消位置授权,则再次重新定位
  getAddressAgain (cb1,cb2) {
    var that = this
    if (wx.openSetting){
      wx.openSetting({
        success () {
          that.getCurAddress(cb1,cb2)
        }
      })
    }else{
      wx.showModal({
        title: '提示',
        content: '当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。'
      })
    }
  },
  addressData: {
    curAddress: ""  //共用的全局定位地址
  }
})