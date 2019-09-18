import Vue from "vue"

Vue.prototype.$showMoney = price => ((price | 0) / 100).toFixed(2)
