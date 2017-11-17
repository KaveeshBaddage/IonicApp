// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic'])

console.log('in run')
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


    $timeout(function() {
      $state.go('app.home');
    }, 5000);
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
            templateUrl: "/app/home/home.html",
            controller: "HomeController"
          }
        }
      })
      .state('app.about', {
        url: "/about",
        views: {
          'appContent': {
            templateUrl: "about.html",
            controller: "AboutController"
          }
        }
      })
      .state('app.toilet', {
        url: "/toilet",
        views: {
          'appContent': {
            templateUrl: "toilet.html",
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

    $scope.time = "10.35 a.m";

    $scope.male = status.occupied;

    $scope.female = status.vacant;


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



