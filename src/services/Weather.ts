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
   * @returns {WeatherData} weather data.
   */
  getWeatherData(): WeatherData {
    return this.weatherData
  }

  /**
   * Fetch weather data.
   * @param location
   */
  async fetchWeatherData(location: string | null): Promise<void> {
    if (!location) alert('¡No se pudo obtener tu ubicacion!')

    try {
      const response = await fetch(
        `${API_URL}/${location}?unitGroup=metric&key=${API_KEY}`
      )

      if (!response.ok) {
        const json = await response.json()
        throw new Error(`Error: ${json}`)
      }

      const json = await response.json()

      this.weatherData = {
        temperature: json.currentConditions.temp,
        windspeed: json.currentConditions.windspeed,
        rainProbability: json.currentConditions.precipprob,
        weather: json.currentConditions.conditions,
        location: json.resolvedAddress,
        currentHours: json.days[0].hours.map((hour: any) => ({
          datetime: hour.datetime,
          precipprob: hour.precipprob,
          temp: hour.temp,
        })),
      }
    } catch (error) {
      console.error('Error: ', error)
    }
  }
}

export default Weather
