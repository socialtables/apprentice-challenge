'use strict';

var fs = require('fs');
var should = require('chai').should();
var assert = require('assert'),
chai = require('chai')


let webdriver = require('selenium-webdriver');
let By = webdriver.By;
let until = webdriver.until;

let d = new webdriver.Builder()
  .forBrowser('firefox')
  .build();

  // after(function(done){
  //   d.quit().then(done);
  // });

describe('Social Tables Help Page', function(){
  // increase timeout from 2000ms to account for webdriver load
  this.timeout(15000);

  beforeEach(function(done){
    d.get('http://help.socialtables.com')
    //took out findElement bc the title only effects the first two tests.
    .then(done)
     this.retries(3);
  });

  // Test 0
  it('has the correct title', function(done) {
    d.getTitle()
    .then(title => title.should.equal('Social Tables Help - Home'))
    .then(() => done())
    .catch(error => done(error));
  });

  // Test 1
  describe('Logo', function(){
    it('should link to https://www.socialtables.com/', function(done){
      var Logo = d.findElement(logoLink);
      function logoLink() {
        var Logos = d.findElement(By.tagName('a'));
        return filter(link, function(element){
          return link.isDisplayed();
        });
      }
      done();
    });
  });

  // Test 2 **** Displaying one method of testing search
  describe('Searching for \'Bobby Fisher\'', function(){
    it('should return 0 results', function(done){
      d.findElement(By.id('searchAskInput')).sendKeys('Bobby Fisher');
      d.findElement(By.id('searchAskButton')).click().then(() => done()).catch(error => done(error));
    });
  });


  // Test 3 **** Displaying another method of testing search
  describe('Searching for \'event\'', function(){
    it('should return 10 results', function(done){
      var searchBox = d.findElement(By.id('searchAskInput'));
      searchBox.sendKeys('event');
      searchBox.getAttribute('value').then(function(value){
        assert.equal(value, 'event');
        done();
      });
    });
  });


  // Test 4 **** Displaying another method of testing search
  describe('Searching for a word under three character', function(){
    it('should trigger an alert box with the text \'Search string must be at least 3 characters long\'', function(done){
      webdriver.Key.RETURN
      var pressEnterToSend = function(){
        var deferred = d.promise.defer();
        d.findElement(By.id('searchAskInput')).then(function(element){
          element.sendKeys(d.Key.RETURN);
          deferred.resolve();
        });
        return deferred.promise;
      };
      done();
    });
  });

  // Test 5  ***EXTRA CREDIT***
  describe( 'Select \'Software\' dropdown ', function(){
    it('should have 6 dropdown menu-items', function(done){
      var dropdown = d.findElement(By.className('dropdown-toggle'));
      dropdown.click();
      d.findElement(By.className('menu-items')).then(function(element){
        return dropdown.length;
      });
      done();
    });
  });

  // Test 6  ***EXTRA CREDIT***
  describe('Show view all for  \'Event and Room Settings\'', function(){
    it('should display list of 15 articles', function(done){
      d.findElement(By.xpath("//a[@href='./Simp_CategoryArticles?category=Event and Room Settings&l=en_US']")).click();
      var articleList = d.findElement(By.className('article')).then(function(element){
        return articleList.length;
      });
      done();
    });
  });

    // Test 7  ***EXTRA CREDIT***
    describe('Support Center', function(){
      it('has the correct header', function(done){
        var header = d.findElement(By.id('header')).then(header => header.should.equal('Support Center'));
        done();
      });
    });


  // Test 8  ***EXTRA CREDIT***
  describe('Careers', function(){
    it('should navigate to Careers', function(done) {
      d.findElement(By.className('dropdown-toggle')).click();
      d.findElement(By.id('menu-item-312')).then(text=> text.should.equal('Careers'));
      done();
    });
  });

  // Test 9  ***EXTRA CREDIT***
  describe('Screenshot', function(){
    it('Should take a Screenshot', function(done){
      d.takeScreenshot().then(
        function(data) {
          fs.writeFile('img.png', data, 'base64');
        });
        done();
      });
    });
  });
