export type WeatherData = {
  temperature: number
  windspeed: number
  rainProbability: number
  weather: string
  currentHours: HourData[]
}

export type HourData = {
  datetime: string
  conditions: string
  temp: number
}

export type CurrentData = {
  iconName: string
  value: string
}
