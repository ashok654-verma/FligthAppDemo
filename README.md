# ✈️ React Native Flight Search App

A simple **flight search mobile app** built using **React Native CLI** and **Sky-Scrapper API** (via RapidAPI). Users can log in, search for flights by origin, destination, and date range, and view detailed flight information including time, price, duration, and airline.

## 🚀 Features

- 🔐 Authentication (Sign Up, Login, Logout)
- 🔍 Search flights between two locations with date selection
- 📅 Flexible date-based search using FlatList UI
- 📄 View search results with:
  - Departure/arrival times
  - Duration
  - Airline info
  - Price and distance
- 🚫 Graceful empty state UI ("No flights found")
- 🌐 API integration with [Sky-Scrapper API (v2)](https://rapidapi.com/skyscanner/api/sky-scrapper)

## 📱 Screens

- `LoginScreen` – Email/password login
- `SignupScreen` – New user registration
- `HomeScreen` – Form to input origin, destination, and dates
- `SearchResultsScreen` – Displays flight search results
- `ProfileScreen` – Includes logout functionality

## 🛠️ Tech Stack

- React Native CLI (JavaScript)
- React Navigation
- Context API for global auth state
- Axios for API calls
- Sky-Scrapper API (RapidAPI)
- FlatList, ActivityIndicator, and React Native components

## ⚙️ Setup Instructions

1. **Clone the repo**
   ```bash
   git clone https://github.com/ashok654-verma/FligthAppDemo.git
   cd flight-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```


3. **Run on Android or iOS**
   ```bash
   npx react-native run-android
   # or
   npx react-native run-ios
   ```

## 📦 Folder Structure

```
/screens
  ├── LoginScreen.js
  ├── SignupScreen.js
  ├── HomeScreen.js
  ├── SearchResultsScreen.js
  └── ProfileScreen.js

/context
  └── AuthContext.js

/services
  └── api.js
```

## 🔒 Authentication Flow

- `AuthContext` handles auth logic
- Signup calls `register(email, password)`
- Login validates credentials
- Logout resets auth state

## 📤 Sample API Call Format

```js
GET https://sky-scrapper.p.rapidapi.com/api/v2/flights/searchFlights?originSkyId=LOND&destinationSkyId=NYCA&dateFrom=2025-09-10
Headers:
  X-RapidAPI-Key: your_key
  X-RapidAPI-Host: sky-scrapper.p.rapidapi.com
```


## 🧪 To Do / Improvements

- Add error handling for failed API requests
- Store user token with secure storage
- Add support for round-trip selection
- Pagination or infinite scroll for results
