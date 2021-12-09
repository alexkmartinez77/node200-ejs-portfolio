const Nightmare = require('nightmare')
const assert = require('assert')

describe('Load a Page', function() {
  // Recommended: 5s locally, 10s to remote server, 30s from airplane ¯\_(ツ)_/¯
  this.timeout('30s');

  let nightmare = null
  beforeEach(() => {
    nightmare = new Nightmare()
  });

  describe('/profile', () => {

    it('should load without error', done => {
      // your actual testing urls will likely be `http://localhost:port/path`
      nightmare.goto('http://localhost:8080/profile')
        .end()
        .then(function (result) { done() })
        .catch(done)
    })
    
    let projects = {
      astroWeightCalculator: {
        site: "https://sdcs-web102-astro-calculator.herokuapp.com/",
        gitHub: "https://github.com/alexkmartinez77/web102-astro-weight-calculator"
      },
      changeCalculator: {
        site: "https://sdcs-web102-change-calculator.herokuapp.com/",
        gitHub: "https://github.com/alexkmartinez77/web102-change-calculator"
      },
      sanDiegoTopSpots: {
        site: "https://sdcs-web102-astro-https://sdcs-web102-sd-hot-spots.herokuapp.com/",
        gitHub: "https://github.com/https://github.com/alexkmartinez77/web102-san-diego-top-spots"
      },
      mortgageCalculator: {
        site: "https://sdcs-web102-https://sdcs-react100-mortgage-calc.herokuapp.com/",
        gitHub: "https://github.com/alexkmartinez77/react100-mortgage-calculator"
      },
      ticTacToe: {
        site: "https://hidden-chamber-83211.herokuapp.com/",
        gitHub: "https://github.com/alexkmartinez77/react100-tic-tac-toe"
      },
      toDo: {
        site: "https://sdcs-react100-vstda.herokuapp.com/",
        gitHub: "https://github.com/alexkmartinez77/react100-vstda"
      },
      calorieManager: {
        site: "https://sdcs-f3.herokuapp.com/",
        gitHub: "https://github.com/alexkmartinez77/react100-hackathon"
      },
      changeCalculator: {
        site: "https://sdcs-web102-change-calculator.herokuapp.com/",
        gitHub: "https://github.com/alexkmartinez77/react100-change-calculator"
      },
      sanDiegoTopSpots: {
        site: "https://sdcs-react100-sd-top-spots.herokuapp.com/",
        gitHub: "https://github.com/alexkmartinez77/react100-san-diego-top-spots"
      },
      budgetTracker: {
        site: "https://sdcs-react200-budget-tracker.herokuapp.com/",
        gitHub: "https://github.com/alexkmartinez77/react200-budget-tracker"
      },
      cityWeather: {
        site: "https://sdcs-react200-weather-app.herokuapp.com/",
        gitHub: "https://github.com/alexkmartinez77/react200-weather-app"
      },
      movieFinder: {
        site: "https://sdcs-react200-movie-finder.herokuapp.com/#/",
        gitHub: "https://github.com/alexkmartinez77/react200-movie-finder"
      }
    }
  })
})