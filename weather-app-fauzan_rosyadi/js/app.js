// app.js
import { fetchWeather } from './weatherApi.js';
import {kelvin2Celsius, getDate} from "./utils.js";

class WeatherApp {
  constructor() {
    this.searchBtn = document.getElementById('search-btn');
    this.cityInput = document.getElementById('city-input');
    this.weatherContainer = document.getElementById('weather-container');
    this.historyList = document.getElementById('history-list');
    this.searchHistory = [];
    
    this.init();
  }
  
  init() {
    // TODO: Add event listeners
    // TODO: Check for city in URL parameters
    this.searchBtn.addEventListener('click', () => {
      this.handleSearch();
    });
    this.cityInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter'){
        this.handleSearch();
      }
    });
    
    this.updateHistoryList();
  }
  
  handleSearch() {
    // TODO: Implement search functionality
    const city = this.cityInput.value;
    this.cityInput.value = '';
    if (city) {
      fetchWeather(city)
        .then(data => {
          this.displayWeather(data);
          this.addToHistory(city);
        })
        .catch(error => {
          console.error(error)
          this.weatherContainer.textContent = error;
        })
    }
  }
  
  displayWeather(data) {
    // TODO: Display weather data
    if (this.weatherContainer.classList.contains('hide')) {
      this.weatherContainer.classList.remove('hide');
    }
    
    const iconId = data?.weather[0]?.icon || '01d';
    const iconUrl =`https://openweathermap.org/img/wn/${iconId}@2x.png`
    const temp = `${kelvin2Celsius(data?.main?.feels_like)}°C`
    const desc = data?.weather[0]?.description || ''
    const weatherStatus = desc ? `${temp}, ${desc}` : temp;
    
    const weatherHtml = `
    <div class="weather-data">
       <h2>${data?.name}</h2>
      <img id="weather-icon" src="${iconUrl}"/>
      <h3 class="temp-display">${weatherStatus}</h3>
      <div class="status">
          <div class="condition-field">
              <span><b>Cloud coverage: </b></span>
              <span>${data?.clouds?.all}%</span>
          </div>
          <div class="condition-field">
              <span><b>Visibility: </b></span>
              <span>${data?.visibility}</span>
          </div>
          <div class="condition-field">
              <span><b>Humidity: </b></span>
              <span>${data?.main?.humidity}</span>
          </div>
          <div class="condition-field">
              <span><b>Wind: </b></span>
              <span>${data?.wind?.speed}</span>
          </div>
      </div>
    </div>
    <span class="last-update-text">Last Update: ${getDate(data?.dt)}</span>
    `;
    
    this.weatherContainer.innerHTML = weatherHtml;
  }
  
  addToHistory(city) {
    // TODO: Add city to search history
    this.searchHistory.unshift(city)
    const li = document.createElement('li');
    li.textContent = city;
    li.addEventListener('click', (e) => {
      this.handleHistoryClick(e)
    })
    this.historyList.insertBefore(li, this.historyList.firstChild);
    
  }
  
  updateHistoryList() {
    // TODO: Update the history list in the UI
    for (let city in this.searchHistory) {
      const li = document.createElement('li');
      li.textContent = city;
      li.addEventListener('click', (e) => {
        this.handleHistoryClick(e)
      })
      this.historyList.appendChild(li)
    }
    
  }
  
  handleHistoryClick(e) {
    // TODO: Handle clicks on history items
    this.updateURL(e.target.value);
  }
  
  updateURL(city) {
    // TODO: Update URL with the searched city
  }
}

const app = new WeatherApp();
