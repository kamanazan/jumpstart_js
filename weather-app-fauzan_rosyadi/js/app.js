// app.js
import { fetchWeather } from './weatherApi.js';
import {kelvin2Celsius, getDate} from "./utils.js";

class WeatherApp {
  constructor() {
    this.searchBtn = document.getElementById('search-btn');
    this.cityInput = document.getElementById('city-input');
    this.weatherContainer = document.getElementById('weather-container');
    this.historyList = document.getElementById('history-list');
    this.clearButton = document.getElementById('clear-btn');
    this.searchHistory = [];
    
    this.init();
  }
  
  init() {
    const savedHistory = JSON.parse(window.localStorage.getItem('searchHistory'))
    console.log({savedHistory})
    if (savedHistory) {
      this.searchHistory = savedHistory;
      this.updateHistoryList();
    }
    this.searchBtn.addEventListener('click', () => {
      this.handleSearch();
      this.addToHistory(this.cityInput.value);
    });
    this.cityInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter'){
        this.handleSearch();
        this.addToHistory(e.target.value)
      }
    });
    this.clearButton.addEventListener('click', () => {
      this.clearAllHistory()
    })
    const url = new URL(window.location);
    const city = url.searchParams.get('city');
    if (city) {
      this.cityInput.value = city;
      this.handleSearch();
      this.addToHistory(city);
    }
  }
  
  handleSearch() {
    const city = this.cityInput.value;
    if (city) {
      fetchWeather(city)
        .then(data => {
          this.displayWeather(data);
        })
        .catch(error => {
          console.error(error)
          this.weatherContainer.textContent = error;
        })
    }
  }
  
  displayWeather(data) {
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
    if (!this.searchHistory.includes(city)) {
      this.searchHistory.unshift(city)
      window.localStorage.setItem('searchHistory', JSON.stringify(this.searchHistory))
      const li = document.createElement('li');
      li.textContent = city;
      li.addEventListener('click', (e) => {
        this.handleHistoryClick(e)
      })
      this.historyList.insertBefore(li, this.historyList.firstChild);
    }
    this.updateURL(city);
  }
  
  updateHistoryList() {
    this.searchHistory.forEach( city => {
      const li = document.createElement('li');
      li.textContent = city;
      li.addEventListener('click', (e) => {
        this.handleHistoryClick(e)
      })
      this.historyList.appendChild(li)
    })
    
  }
  
  handleHistoryClick(e) {
    const city = e.target.textContent;
    this.updateURL(city);
    this.cityInput.value = city
    this.handleSearch();
  }
  
  updateURL(city) {
    const url = new URL(window.location);
    url.searchParams.set('city', city);
    window.history.pushState({}, '', url);
  }
  
  clearAllHistory() {
    this.historyList.innerHTML = '';
    this.searchHistory = []
    window.localStorage.setItem('searchHistory', '[]')
  }
}

const app = new WeatherApp();
