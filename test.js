'use strict';
require('chai').should();

let webdriver = require('selenium-webdriver');
let By = webdriver.By;

let d = new webdriver.Builder()
  .forBrowser('firefox')
  .build();

after(function(done){
  d.quit().then(done);
});

describe('Social Tables Help Page', function(){

  // increase timeout from 2000ms to account for webdriver load
  this.timeout(15000);

  beforeEach(function(done){
    d.get('http://help.socialtables.com')
    // wait for page to load
    .then(d.wait(d.findElement(By.tagName('title'))))
    .then(done)
  });

  // Test 0
  it('has the correct title', function(done) {
    d.getTitle()
      .then(title => title.should.equal('Social Tables Help - Home'))
      .then(() => done())
      .catch(error => done(error));
  });

  // Test 1
  // note - change xdescribe to describe to get this code to run
  xdescribe('Logo', function(){
    it('should link to https://www.socialtables.com/', function(done){

      // Insert Your Code Here

    });
  });

  // Test 2
  xdescribe('Searching for \'Bobby Fisher\'', function(){
    it('should return 0 results', function(done){

      // Insert Your Code Here

    });
  });

  // Test 3
  xdescribe('Searching for \'event\'', function(){
    it('should return 10 results', function(done){

      // Insert Your Code Here

    })
  });

  // Test 4
  xdescribe('Searching for a word under three character', function(){
    it('should trigger an alert box with the text \'Search string must be at least 3 characters long\'', function(done){

      // Insert Your Code Here

    });
  });


});
