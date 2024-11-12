import React, { useState } from 'react'

const App = () => {
  const [city, setCity] = useState('')
  const [result, setResult] = useState('')

  const changeHandler = (e) => {
    setCity(e.target.value)
  }

  const submitHandler = (e) => {
    e.preventDefault()

    fetch(
      `https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=10&language=en&format=json`
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.results && data.results.length > 0) {
          const latitude = data.results[0].latitude
          const longitude = data.results[0].longitude
          fetchWeather(latitude, longitude, city)
        } else {
          setResult('City not found')
        }
      })
      .catch((error) => console.log(error))

    setCity('')
  }

  const fetchWeather = (latitude, longitude, city) => {
    const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`

    fetch(weatherUrl)
      .then((response) => response.json())
      .then((weatherData) => {
        const temperature = weatherData.current_weather.temperature
        setResult(`Temperature at ${city}: ${temperature}°C`)
      })
      .catch((error) => console.log(error))
  }

  return (
    <div>
      <center>
        <div className='card'>
          <div className='card-body'>
            <h4 className='card-title'>Weather App</h4>
            <form onSubmit={submitHandler}>
              <input
                size='30'
                type='text'
                name='city'
                onChange={changeHandler}
                value={city}
              />{' '}
              <br />
              <br />
              <input type='submit' value='Get Temperature' />
            </form>
            <br /> <br />
            <div>
              <h1>{result}</h1>
            </div>
          </div>
        </div>
      </center>
    </div>
  )
}

export default App
