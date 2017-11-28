// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic'])


  .run(function ($ionicPlatform, $timeout) {
    console.log('in run');
    $ionicPlatform.ready(function () {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)


      console.log('Ionic ready');
      // if (navigator.splashscreen) {
      //   console.log('Hiding splash screen');
      //   // We're done initializing, remove the splash screen
      //   //navigator.splashscreen.hide();
      // }

    });
    //overriding the default “return to the previous view” state
    $ionicPlatform.registerBackButtonAction(function(event) {
      if (true) { // your check here
        $ionicPopup.confirm({
          title: 'System warning',
          template: 'are you sure you want to exit?'
        }).then(function(res) {
          if (res) {
            ionic.Platform.exitApp();
          }
        })
      }
    }, 100);


  })
  .config(function ($stateProvider, $urlRouterProvider) {

    $stateProvider
      .state('app', {
        url: "/app",
        abstract: true,
        templateUrl: "app.html",

      })
      .state('app.home', {
        url: "/home",
        views: {
          'appContent': {
            templateUrl: "app/home/home.html",
            controller: "HomeController"
          }
        }
      })
      .state('app.about', {
        url: "/about",
        views: {
          'appContent': {
            templateUrl: "app/about/about.html",
            controller: "AboutController"
          }
        }
      })
      .state('app.toilet', {
        url: "/toilet",
        views: {
          'appContent': {
            templateUrl: "app/toilets/toilet.html",
            controller: "ToiletController"
          }
        }
      });

    $urlRouterProvider.otherwise("/app/home");
  })

  .controller('AppController', function ($scope, $ionicSideMenuDelegate) {
    $scope.toggleLeft = function () {
      $ionicSideMenuDelegate.toggleLeft();
    };

  })

  .controller("HomeController", function ($scope) {
    $scope.text = "Welcome to the Mi Toilet";
  })

  .controller("AboutController", function ($scope) {

    $scope.text = "Version 1.0.0";

  })
  .controller("ToiletController", function ($scope, $timeout) {


    var fetchData = function () {


      var url = "https://api.thingspeak.com/channels/368421/feeds.json?api_key=925RM8MPD08MRCI2 &results=1";
      var xmlHttp = new XMLHttpRequest();
      xmlHttp.open("GET", url, false); // false for synchronous request
      xmlHttp.send(null);
      var response = xmlHttp.responseText;
      response = JSON.parse(response);
      console.log(response);

      var lastUpdat = response.channel && response.channel.updated_at;
      var lastUpdate = new Date(lastUpdat);

      var feed = response.feeds && response.feeds.length > 0 && response.feeds[response.feeds.length - 1];

      console.log(feed.field1);

      var status = {
        occupied: {
          val: 'Occupied',
          style: 'assertive'
        },
        vacant: {
          val: 'Vacant',
          style: 'balanced'
        }
      };


      var mens = feed.field1 === "0" ? status.vacant : status.occupied;

      var women = feed.field1 === "0" ? status.vacant : status.occupied;

      $scope.time = lastUpdate;

      $scope.male = mens;

      $scope.female = women;
      $timeout(fetchData, 60000);
    };

    fetchData();

    //
    // var client = new Messaging.Client("broker.hivemq.com",8000 , "myclientid_" + parseInt(Math.random() * 100, 10));
    //
    // //Gets  called if the websocket/mqtt connection gets disconnected for any reason
    // client.onConnectionLost = function (responseObject) {
    //   //Depending on your scenario you could implement a reconnect logic here
    //   alert("connection lost: " + responseObject.errorMessage);
    // };
    //
    // //Gets called whenever you receive a message for your subscriptions
    // client.onMessageArrived = function (message) {
    //   //Do something with the push message you received
    //   //$('#messages').append('<span>Topic: ' + message.destinationName + '  | ' + message.payloadString + '</span><br/>');
    //   console.log('msg: ' + message.payloadString)
    // };
    //
    // //Connect Options
    // var options = {
    //   timeout: 3,
    //   //Gets Called if the connection has sucessfully been established
    //   onSuccess: function () {
    //     alert("Connected");
    //   },
    //   //Gets Called if the connection could not be established
    //   onFailure: function (message) {
    //     alert("Connection failed: " + message.errorMessage);
    //   }
    // };
    //
    // client.connect(options);
    //
    // $timeout(function(){
    //   client.subscribe('Test', {qos: 2}); alert('Subscribed');
    //
    // }, 2000);

  });



