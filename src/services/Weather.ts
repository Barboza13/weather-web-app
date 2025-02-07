import type { WeatherData } from '@/types'

const API_URL = import.meta.env.VITE_API_URL
const API_KEY = import.meta.env.VITE_API_KEY

class Weather {
  private weatherData: WeatherData

  constructor() {
    this.weatherData = {} as WeatherData
  }

  /**
   * Get weather data.
   * @returns weatherData.
   */
  getWeatherData(): WeatherData {
    return this.weatherData
  }

  /**
   * Set weather data.
   * @param weatherData
   */
  setWeatherData(weatherData: WeatherData): void {
    this.weatherData = weatherData
  }

  /**
   * Fetch Weather Data.
   * @param location
   * @returns WeatherData[] | null
   */
  async fetchWeatherData(location: string): Promise<void> {
    try {
      const response = await fetch(`${API_URL}/${location}?key=${API_KEY}`)

      if (!response.ok) {
        const json = await response.json()
        throw new Error(`Error: ${json}`)
      }

      const json = await response.json()

      this.setWeatherData({
        temperature: json.currentConditions.temp,
        windspeed: json.currentConditions.windspeed,
        rainProbability: json.currentConditions.precipprob,
        weather: json.currentConditions.conditions,
        currentHours: json.days[0].hours.map((hour: any) => ({
          datetime: hour.datetime,
          precipprob: hour.precipprob,
          temp: hour.temp,
        })),
      })
    } catch (error) {
      console.error('Error: ', error)
    }
  }
}

export default Weather
