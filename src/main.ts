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
  RiLoader4Line,
} from 'oh-vue-icons/icons'

addIcons(
  MdSearch,
  FaTemperatureHigh,
  BiCloudRainFill,
  BiWind,
  WiDaySunnyOvercast,
  CoLocationPin,
  RiLoader4Line
)

const app = createApp(App)
app.component('v-icon', OhVueIcon)
app.mount('#app')
