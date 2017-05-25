var bmap = require('../../libs/bmap-wx.min.js')
var app = getApp()
Page({
  data: {
    address: "",
    inputShowed: false,
    inputVal: "",
    addressList: []
  },
  onLoad() {
    this.setData({
      address: app.addressData.curAddress
    })
  },
  showInput: function () {
    this.setData({
      inputShowed: true
    });
  },
  hideInput: function () {
    this.setData({
      inputVal: "",
      inputShowed: false
    });
  },
  clearInput: function () {
    this.setData({
      inputVal: ""
    });
  },
  //点定搜索位置，并且显示高亮
  inputTyping: function (e) {
    let that = this
    let poll = 0  //回调结束的线程池
    this.setData({
      inputVal: e.detail.value
    });
    let BMap = new bmap.BMapWX({
      ak: 'eh56CvgsYTcELc7i6qeI78P3x7eory4o'
    })
    let fail = function (data) {
      console.log(data)
    };
    let success = function (data) {
      let dataResult = data.result
      for (let i = 0; i < dataResult.length; i++) {
        let result = dataResult[i]
        let name = result.name
        let inputVal = that.data.inputVal
        let index = name.indexOf(inputVal)
        if (index == 0) {
          let match = name.substr(0, inputVal.length)
          result.match = match
          result.pre = ""
          result.next = name.slice(inputVal.length)
        } else {
          result.pre = result.name
        }
        if (result.location) {
          BMap.regeocoding({
            location: result.location.lat + ',' + result.location.lng,
            success: function (res) {
              console.log(res)
              let address = res.originalData.result.formatted_address
              result.address = address
              poll += 1
              if (poll == dataResult.length) {
                that.setData({
                  addressList: data.result
                })
                poll = 0
              }
            }
          })
        } else {
          poll += 1
          if (poll == dataResult.length) {
            that.setData({
              addressList: data.result
            })
            poll = 0
          }
        }
      }
    }
    BMap.suggestion({
      query: e.detail.value,
      region: '上海市',
      city_limit: true,
      fail: fail,
      success: success
    });
  },
  //选择搜索的地址
  chooseAddress (e) {
    let address = e.currentTarget.dataset.address
    app.addressData.curAddress = address
    wx.navigateBack()
  },
  //重新定位
  getCurAddress() {
    app.getCurAddress((curAddress) => {
      this.setData({
        address: curAddress
      })
    }, () => {
      console.log("定位失败")
    })
  }
})

