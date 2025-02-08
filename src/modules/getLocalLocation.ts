/**
 * Get local location.
 * @returns {Promise<{ latitude, longitude }>} Object with local location coordinates.
 */
function getLocalLocation(): Promise<{ latitude: number; longitude: number }> {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error('Geolocalizacion no soportada por este navegador.'))
      return
    }

    navigator.geolocation.getCurrentPosition(
      (position: GeolocationPosition) => {
        const { latitude, longitude } = position.coords
        resolve({ latitude, longitude })
      },
      (error: GeolocationPositionError) => {
        switch (error.code) {
          case 1:
            reject(new Error('¡Permiso denegado por el usuario!'))
            break
          case 2:
            reject(new Error('¡No se pudo determinar la ubicación!'))
            break
          case 3:
            reject(new Error('Tiempo de espera agotado.'))
            break
          default:
            reject(new Error(error.message))
        }
      },
      {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0,
      }
    )
  })
}

export default getLocalLocation
