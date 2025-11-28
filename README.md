# Weather App By Sunetra

A beautiful and feature-rich weather application inspired by Samsung Weather, built with pure HTML, CSS, and JavaScript. This app provides real-time weather information with stunning animations and a responsive design that works seamlessly across all devices.

## 🌟 Features

### Core Functionality
- **Real-time Weather Data**: Fetches current weather conditions and hourly forecasts using OpenWeatherMap API
- **City Search**: Search for weather information by entering any city name worldwide
- **Enter Key Support**: Quick search with Enter key press for better user experience
- **Current Weather Display**: Shows temperature, weather description, high/low temperatures
- **Detailed Weather Metrics**: 
  - Humidity with animated progress bar
  - Wind speed and direction with animated compass
  - Visibility range
  - "Feels like" temperature
  - Atmospheric pressure
  - UV Index
- **Hourly Forecast**: 24-hour weather prediction with icons and temperatures
- **Sun Times**: Sunrise and sunset times with animated arc visualization

### Visual Features
- **Dynamic Weather Backgrounds**: Background automatically changes based on weather conditions:
  - Clear Day (blue sky with animated sun)
  - Clear Night (dark sky with twinkling stars and aurora effect)
  - Cloudy (gray sky with drifting clouds)
  - Rainy (darker sky with animated rain and clouds)
  - Stormy (dramatic sky with lightning flashes and heavy rain)

### Animations
- **Sun Animation**: 16 rotating and pulsing rays with glowing effect
- **Rain Animation**: 32 raindrops with wind streaks for realistic rainfall
- **Cloud Animation**: 6 clouds drifting across the sky at varied heights and speeds
- **Star Animation**: 10 twinkling stars with shooting star effects for night sky
- **Lightning Effect**: Dramatic flashes during stormy weather
- **Aurora Effect**: Gradient color shifts in clear night sky
- **Floating Particles**: Ambient particles floating throughout the background
- **Gradient Waves**: Animated waves at the bottom of the screen
- **Card Animations**: Smooth transitions and hover effects on all weather cards
- **Icon Hover Effects**: Interactive animations when hovering over weather icons
- **Temperature Glow**: Pulsing glow effect on temperature display
- **Shimmer Effects**: Subtle shine effects across various UI elements

### Design Features
- **Samsung Weather-Inspired UI**: Modern, clean interface following Samsung Weather design principles
- **Glassmorphism**: Frosted glass effect with backdrop blur on cards
- **Rounded Corners**: Smooth 25-30px border radius on all UI elements
- **Responsive Design**: Fully responsive layout optimized for:
  - Desktop (800px+ width)
  - Tablet (768px)
  - Mobile (480px and 360px)
- **Custom Scrollbar**: Styled scrollbar matching the app's aesthetic
- **Loading Overlay**: Animated spinner with multiple rotating rings
- **Empty State**: Welcoming initial state prompting user to search

## 🛠️ Technologies Used

- **HTML5**: Semantic markup structure
- **CSS3**: Advanced styling with:
  - CSS Grid and Flexbox layouts
  - CSS Variables for theming
  - Keyframe animations
  - Transform and transition effects
  - Backdrop filters for glassmorphism
  - Media queries for responsiveness
- **JavaScript (Vanilla)**: 
  - Fetch API for weather data
  - DOM manipulation
  - Event handling
  - Promise handling
  - Dynamic content updates
- **Font Awesome 6.4.0**: Icon library for weather and UI icons
- **OpenWeatherMap API**: Weather data provider

## 📋 Prerequisites

- Modern web browser (Chrome, Firefox, Safari, Edge)
- Internet connection for API calls
- OpenWeatherMap API key (free tier available)

## 🚀 Getting Started

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Sunetra1570/Weather-App.git
   cd Weather-App/Weather-app
   ```

2. **API Key Setup**
   - Sign up for a free API key at [OpenWeatherMap](https://openweathermap.org/api)
   - Open `script.js` file
   - Replace the API key on line 2:
     ```javascript
     const apiKey = 'YOUR_API_KEY_HERE';
     ```

3. **Launch the Application**
   - Open `index.html` in your web browser
   - Or use a local server (recommended):
     ```bash
     # Using Python 3
     python -m http.server 8000
     
     # Using Node.js (http-server)
     npx http-server
     ```
   - Navigate to `http://localhost:8000` in your browser

## 💻 Usage

1. **Search for a City**
   - Click on the search box at the top
   - Type the name of any city (e.g., "London", "Tokyo", "New York")
   - Click the "Search" button or press Enter

2. **View Weather Information**
   - Current temperature and conditions
   - High and low temperatures for the day
   - Humidity, wind speed, visibility
   - Feels like temperature, pressure, UV index
   - Sunrise and sunset times
   - 24-hour forecast with hourly predictions

3. **Enjoy the Animations**
   - Watch the background change based on weather conditions
   - Observe animated rain, clouds, sun, and stars
   - Hover over cards for interactive effects

## 📁 Project Structure

```
Weather-App/
├── Weather-app/
│   ├── index.html          # Main HTML structure
│   ├── style.css           # Complete styling and animations (1300+ lines)
│   ├── script.js           # JavaScript functionality and API integration
│   ├── netlify.toml        # Netlify deployment configuration
│   └── country-weather/    # Additional country-specific features
│       ├── index.html
│       └── package.json
├── README.md               # Project documentation
└── .gitignore             # Git ignore file
```

## 🎨 Customization

### Changing Colors
Edit CSS variables in `style.css`:
```css
:root {
    --primary-color: #your-color;
    --background-opacity: 0.2;
    /* Add more custom variables */
}
```

### Adding More Weather Conditions
1. Update `updateWeatherBackground()` function in `script.js`
2. Add corresponding CSS classes in `style.css`
3. Create new animation keyframes as needed

### Modifying Animations
- Animation durations and delays can be adjusted in the `@keyframes` rules
- Toggle animation effects by modifying the `.active` class triggers
- Add or remove animation elements in the HTML structure

## 🌐 API Information

**OpenWeatherMap API Endpoints Used:**
- Current Weather: `https://api.openweathermap.org/data/2.5/weather`
- 5-Day Forecast: `https://api.openweathermap.org/data/2.5/forecast`

**Data Format:** Metric units (Celsius, km/h)

**Rate Limits:** Free tier allows 60 calls/minute, 1,000,000 calls/month

## 🐛 Known Issues

- API key needs to be manually configured
- Geolocation feature is commented out (can be enabled)
- Very long city names may overflow on small screens (handled with ellipsis)

## 🔮 Future Enhancements

- [ ] Multi-language support
- [ ] User location detection and auto-search
- [ ] Weather alerts and notifications
- [ ] 7-day extended forecast
- [ ] Weather radar and maps
- [ ] Favorite cities list
- [ ] Temperature unit toggle (Celsius/Fahrenheit)
- [ ] Dark/Light theme toggle
- [ ] Offline mode with cached data
- [ ] Progressive Web App (PWA) support

## 📱 Responsive Breakpoints

- **Desktop**: 800px+ (full-width container)
- **Tablet**: 768px (adjusted card layouts)
- **Mobile**: 480px (stacked layout)
- **Small Mobile**: 360px (compact design)

## 🤝 Contributing

Contributions are welcome! To contribute:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 👤 Author

**Sunetra**
- GitHub: [@Sunetra1570](https://github.com/Sunetra1570)

## 🙏 Acknowledgments

- Design inspiration from Samsung Weather app
- Weather data provided by [OpenWeatherMap](https://openweathermap.org/)
- Icons from [Font Awesome](https://fontawesome.com/)
- Animation techniques from various CSS animation resources

## 📞 Support

If you encounter any issues or have questions:
- Open an issue on GitHub
- Check the OpenWeatherMap API documentation
- Ensure your API key is valid and has not exceeded rate limits

---

**⭐ If you like this project, please give it a star on GitHub!**
