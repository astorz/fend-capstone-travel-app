# Travel App
This repo holds the code for a simple "Travel App" that was developed as the Capstone project of [Udacity's Frontend Developer Program](https://www.udacity.com/course/front-end-web-developer-nanodegree--nd0011). 

## Features
The project is a simple single-page app that provides weather details for a specific location based on a user's entry for a specific travel destination (i.e. country and city) and travel date. If the travel date is within one week, the app displays current weather conditions. If the travel date is more than one week in the future, it provides a predicted weather forecast for the specific travel period (up to 2 weeks ahead).
The app also shows an image for the specific destination.

## Implementation
The app uses common web technologies, i.e. HMTL/CSS/JavaScript. In addition, it is built using Webpack and uses an Express server. Webpack also enables the use of SASS (as a CSS pre-processor). 

In terms of data sources, the app uses 3 external APIs. The (1) Geonames API retrieves the specific coordinates (latitude/longitude) for the travel destination needed to retrieve weather details for the specific location from the (2) Weatherbit API. Lastly, an image for the travel destination is retrieved via the (3) Pixabay API.

### "Extend your Project/Ways to Stand Out"
The Capstone project asks students to implement *at least one* of a list of optional features to extend the project and its functionality. This project implements 3 of the suggested additional features:

- Pull in an image for the country from Pixabay API when the entered location brings up no results (good for obscure localities).
- Incorporate icons into forecast [the project shows weather icons that illustrate weather conditions].
- Instead of just pulling a single day forecast, pull the forecast for multiple days. [This is implemented in cases where the travel date is more than 1 week away.]

## Using the repo
Developers can rebuild and use the code by cloning this repo. Webpack and all dependencies (cf. "package.json" file) need to be installed. Running "npm run build" creates a "dist" folder with the code for the production environment.
### Dependencies
Usage requires registering for each of the 3 WebAPIs. Each API requires having an API key (associated with an account).

Please refer to the documentation for further details: 
- Geonames API: http://www.geonames.org/export/web-services.html
- Weatherbit API: https://www.weatherbit.io/api
- Pixabay API: https://pixabay.com/api/docs/
