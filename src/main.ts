import { createApp } from 'vue'
import App from './App.vue'
import { OhVueIcon, addIcons } from 'oh-vue-icons'
import {
  MdSearch,
  FaTemperatureHigh,
  BiCloudRainFill,
  BiWind,
  WiDaySunnyOvercast,
  CoLocationPin,
  RiLoader2Fill,
} from 'oh-vue-icons/icons'

addIcons(
  MdSearch,
  FaTemperatureHigh,
  BiCloudRainFill,
  BiWind,
  WiDaySunnyOvercast,
  CoLocationPin,
  RiLoader2Fill
)

const app = createApp(App)
app.component('v-icon', OhVueIcon)
app.mount('#app')
