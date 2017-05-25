//logs.js
var app = getApp()
var sliderWidth = 96; 
Page({
  data: {
    array: [{ address: "fffff", distance: "20mm" }, { address: "ggggg", distance: "20mm" }, { address: "ggggg", distance: "20mm" }, { address: "ggggg", distance: "20mm" }, { address: "ggggg", distance: "20mm" }, { address: "ggggg", distance: "20mm" }, { address: "ggggg", distance: "20mm" }, { address: "ggggg", distance: "20mm" }, { address: "ggggg", distance: "20mm" }, { address: "ggggg", distance: "20mm" }, { address: "ggggg", distance: "20mm" }, { address: "ggggg", distance: "20mm" }, { address: "ggggg", distance: "20mm" }, { address: "ggggg", distance: "20mm" }, { address: "ggggg", distance: "20mm" }, { address: "ggggg", distance: "20mm" }, { address: "ggggg", distance: "20mm" }, { address: "ggggg", distance: "20mm" }, { address: "ggggg", distance: "20mm" }, { address: "ggggg", distance: "20mm" }, { address: "ggggg", distance: "20mm" }, { address: "ggggg", distance: "20mm" }, { address: "ggggg", distance: "20mm" }, { address: "ggggg", distance: "20mm" }],
    array2: [{ address: "fffff", distance: "20mm" }, { address: "ggggg", distance: "20mm" }, { address: "aaaaa", distance: "20mm" }, { address: "aaaaa", distance: "20mm" }, { address: "aaaaa", distance: "20mm" }, { address: "aaaaa", distance: "20mm" }, { address: "aaaaa", distance: "20mm" }, { address: "aaaaa", distance: "20mm" }, { address: "aaaaa", distance: "20mm" }, { address: "aaaaa", distance: "20mm" }, { address: "aaaaa", distance: "20mm" }, { address: "aaaaa", distance: "20mm" }, { address: "aaaaa", distance: "20mm" }, { address: "aaaaa", distance: "20mm" }, { address: "aaaaa", distance: "20mm" }, { address: "aaaaa", distance: "20mm" }, { address: "aaaaa", distance: "20mm" }, { address: "aaaaa", distance: "20mm" }, { address: "aaaaa", distance: "20mm" }, { address: "aaaaa", distance: "20mm" }, { address: "aaaaa", distance: "20mm" }, { address: "aaaaa", distance: "20mm" }, { address: "aaaaa", distance: "20mm" }, { address: "aaaaa", distance: "20mm" }],
    address : '',
    tabs: ["附近人餐厅", "餐厅足迹"],
    activeIndex: 0,
    sliderOffset: 0,
    sliderLeft: 0,
    addressOK : false,
    addressErr : false
  },
  tabClick: function (e) {
    console.log(e)
    this.setData({
      sliderOffset: e.currentTarget.offsetLeft,
      activeIndex: e.currentTarget.id
    });
  },
  onShareAppMessage : function(){
    return {
      title : "aaa",
      path: 'pages/demo/demo',
      success : function(res){
        console.log(res)
      }
    }
  },
  //点击再次打开定位
  getAddressAgain () {
    app.getAddressAgain((curAddress)=> {
      this.setData({
        address: curAddress,
        addressOK: true,
        addressErr: false
      })
    }, function () {
      address: '定位失败',
      this.setData({
        addressErr: true
      })
    })
  },
  onShow () {
    //重新定位回退时，当前地址不和重新定位地址一样的话，重从给值
    if (this.data.address != app.addressData.curAddress){
      this.setData({
        address: app.addressData.curAddress
      })
    }
  },
  onLoad: function () {
    var that = this
    //手机的信息
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          sliderLeft: (res.windowWidth / that.data.tabs.length - sliderWidth) / 2,
          sliderOffset: res.windowWidth / that.data.tabs.length * that.data.activeIndex
        });
      }
    });
    //初始化定位当前地址
    app.getCurAddress((curAddress)=>{
      this.setData({
        address: curAddress,
        addressOK: true,
        addressErr: false
      })
    },()=>{
      this.setData({
        address : '定位失败',
        addressErr: true
      })
    })
  }
})
