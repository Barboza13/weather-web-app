export type WeatherData = {
  temperature: number
  windspeed: number
  rainProbability: number
  weather: string
  location: string
  currentHours: HourData[]
}

export type HourData = {
  datetime: string
  precipprob: number
  temp: number
}

export type CurrentData = {
  iconName: string
  value: string
}
