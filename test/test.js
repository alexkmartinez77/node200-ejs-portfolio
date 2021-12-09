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
      
    }
  })
})