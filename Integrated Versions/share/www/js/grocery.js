// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var test=angular.module('start', ['ionic'] )
var exampleApp=angular.module('starter', ['ionic'])

  .run(function($ionicPlatform) {
    $ionicPlatform.ready(function() {
      if(window.cordova && window.cordova.plugins.Keyboard) {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

        // Don't remove this line unless you know what you are doing. It stops the viewport
        // from snapping when text inputs are focused. Ionic handles this internally for
        // a much nicer keyboard experience.
        cordova.plugins.Keyboard.disableScroll(true);
      }
      if(window.StatusBar) {
        StatusBar.styleDefault();
      }
    });
  })
document.addEventListener("deviceready", init, false);
function init() {
  document.querySelector("#startScan").addEventListener("touchend", startScan, false);
  resultDiv = document.querySelector("#results");
}

function startScan() {

  cordova.plugins.barcodeScanner.scan(
    function (result) {
      upc=result.text;
      var s = "<b><font color=blue>Result:</font></b>" + result.text + "<br/>" +
        "<b><font color=blue>Format:</font></b>" + result.format + "<br/>";
      resultDiv.innerHTML = s;
    },
    function (error) {
      alert("Scanning failed: " + error);
    }
  );

}
exampleApp.controller('ExampleController', function($scope, $http, $ionicPopup, $timeout) {


  $scope.inputs = [{
    value: null
  }];

  $scope.pric=[] ;
  $scope.nam=[];
  $scope.getData = function() {
    $http.get("http://api.walmartlabs.com/v1/items?apiKey=9gnk426wzsb972r7xmumfaxr&upc="+upc+"&format=json")
        .success(function(data) {

          $scope.name = data.items[0].name;
          $scope.price = data.items[0].itemId;
          id=data.items[0].itemId;

        })
        .error(function(data) {
          //alert("ERROR");
        });
    $http.get("http://api.walmartlabs.com/v1/reviews/"+id+"?apiKey=9gnk426wzsb972r7xmumfaxr&format=json")
        .success(function(data) {
          $scope.review=data.reviews[0].reviewText;
          review=data.reviews[0].reviewText

        })
        .error(function(data) {
          // alert("ERROR");
        });
  }
  $scope.analysis = function() {
    $http.get("https://api.uclassify.com/v1/uclassify/sentiment/Classify?readkey=Zg3MvbzfpWBc&text="+review)
        .success(function(data) {

          $scope.positive = (data.positive*100).toFixed(2);
          $scope.negative = (data.negative*100).toFixed(2);


        })
        .error(function(data) {
          alert("ERROR");
        });
  }
  $scope.field=function () {
    $scope.inputs.push({
      value: null
    })
  }
  $scope.addInput = function () {
    $scope.prices = [];
    $scope.names=[];

    for (var i = 0; i < $scope.inputs.length; i++) {

      //console.log($scope.inputs[i]);
      $http.get("http://api.walmartlabs.com/v1/search?apiKey=9gnk426wzsb972r7xmumfaxr&query=" + $scope.inputs[i].value + "&numItems=1")
        .success(function (data) {

          //$scope.prices[i]= data.items[0].salePrice;
          //console.log(data.items[0].salePrice);
          //str.search(/todd/i);
          //$scope.inputs[i].search(data.items[0].name)

          //if ($scope.inputs[i].contains(data.items[0].name)){

          //console.log($scope.inputs[0],data.items[0].name)

          $scope.prices.push(data.items[0].salePrice);
          console.log($scope.prices)

          $scope.names.push(data.items[0].name);

          //}
          //$scope.price[i]=$scope.prices[i];
          //console.log($scope.price)
          $scope.pric=$scope.prices;
          $scope.nam=$scope.names;
          //console.log($scope.pric)
        })
        .error(function (data) {
          //alert("ERROR");
        });


    }
    //console.log($scope.names)
      setTimeout(function(){
          $scope.grocstore();
      },1000)

  }
  $scope.grocstore=function () {
    $scope.group=window.localStorage.getItem("groupname");
      $http({
          method: 'POST' ,
          url: 'https://api.mlab.com/api/1/databases/sample/collections/Groceries?apiKey=LAVIWeMcGlHcsBnaydvJPdeSL0ebwKQC',
          data: JSON.stringify( {
              "Product_Name": $scope.nam,"Group_Name":$scope.group
          }),
          contentType: "application/json"

      })

  }
    $scope.result=[];
    $scope.forum=function () {
        var user=$scope.user_name;
      $scope.group=window.localStorage.getItem("groupname");
        $http.get("https://api.mlab.com/api/1/databases/sample/collections/Groceries?q={\"Group_Name\":\""+$scope.group+"\"}&apiKey=LAVIWeMcGlHcsBnaydvJPdeSL0ebwKQC")
            .success(function(data) {
                console.log(data)
                for (var i = 0; i < data.length; i++) {
                    for (var j = 0; j < data[i].Product_Name.length; j++) {
                        $scope.result.push({"name": data[i].Product_Name[j]});
                    }
                }
            });

    }
    $scope.forum();
  $scope.popUp = function(){
    $scope.addInput();
    $scope.popUp = $ionicPopup.alert({
      animation: $scope.animationsEnabled,
      templateUrl: 'popup.html',
      cssClass: 'popupcss',
      scope: $scope
    });
  };

  $scope.removeInput = function (index) {
    $scope.inputs.splice(index, 1);
  }
  $scope.getData = function() {

  }
  $scope.displ=function () {
    console.log($scope.pric)
  }

});
/**
 * Created by nikky on 11/17/2016.
 */
