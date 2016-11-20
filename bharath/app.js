// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var exampleApp=angular.module('starter', ['ionic'])
var test=angular.module('start', ['ionic'])
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
       exampleApp.controller('ExampleController', function($scope, $http) {
 
    $scope.getData = function() {
        $http.get("http://api.walmartlabs.com/v1/items?ids=16821022,44436664,33282383,44981963,10295586,33282297&apiKey=9gnk426wzsb972r7xmumfaxr&format=json")
            .success(function(data) {
            
              
            $scope.price0= data.items[0].salePrice;
            
            $scope.price1= data.items[1].salePrice;
            $scope.price2= data.items[2].salePrice;
            $scope.price3= data.items[3].salePrice;
            $scope.price4= data.items[4].salePrice;
            $scope.price5= data.items[5].salePrice;
            
            
            
            })
            .error(function(data) {
                //alert("ERROR");
            });
       
    }
   
 
});

    
