/**
 * Created by sibi on 12/3/2016.
 */
var app=angular.module("mapsapp",['ionic','ngCordova']);

app.controller("mapsctrl",function ($scope,$http) {
var input = document.getElementById("location");
    var autocomplete = new google.maps.places.Autocomplete(input);
    
$scope.lat=[];
 $scope.lng=[];
  $scope.name=[];
  $scope.mapg=function () {
      var loc=document.getElementById("location").value
   //var loc=$scope.text1;

    var locs=$http.get("https://maps.googleapis.com/maps/api/geocode/json?key=AIzaSyBvG1scpDSBFT7Is9pS3w_JeWqcCHUgFT8&address="+loc)
    locs.success(function (data) {
      map= new google.maps.Map(document.getElementById('map'),{
        center:new google.maps.LatLng(data.results[0].geometry.location.lat,data.results[0].geometry.location.lng),
        mapTypeId:google.maps.MapTypeId.ROADMAP,
        zoom: 10
      });
    //console.log(data)

    var weather = $http.get("http://api.openweathermap.org/data/2.5/weather?apikey=4ad0b3a223d05fc3bace3d62ff16c710&lat=" + data.results[0].geometry.location.lat + "&lon=" + data.results[0].geometry.location.lng + "&appid=b1b15e88fa797225412429c1c50c122a1")
    weather.success(function (data) {
      $scope.main1 = data.weather[0].description;
      $scope.temp = data.main.temp;
      $scope.newtemp=(1.8*($scope.temp - 273)+ 32).toFixed(2);
      console.log($scope.main1, $scope.temp)
      var venues = $http.get("https://api.foursquare.com/v2/venues/search/?client_id=NTWXDKJP1JWD5GPDS3QQNDCUVHPSFRO555RUTJLBM5IA1FGL%20&client_secret=IMF0TTYFJLCE3EMZHXPW5FALFVY0HSPTKO5IUXYLIAGLPBSQ&v=20201111%20&m=foursquare&near=" +loc + "&categoryId=4bf58dd8d48988d118951735")
      venues.success(function (data) {
        $scope.disp1 = [];
        for (var i = 0; i < data.response.venues.length; i++) {
          $scope.disp = {
            "Name": data.response.venues[i].name,
            "Address": data.response.venues[i].name + "," + data.response.venues[i].location.address
            + "," + data.response.venues[i].location.city + "," + data.response.venues[i].location.state + ","
            + data.response.venues[i].location.cc
          }
          $scope.disp1.push($scope.disp);
          $scope.lat = data.response.venues[i].location.lat;
          $scope.lng = data.response.venues[i].location.lng;
          $scope.name = data.response.venues[i].name;
          $scope.address = "<b>"+data.response.venues[i].name + "<br>" + data.response.venues[i].location.address
              + "," + data.response.venues[i].location.city + "," + data.response.venues[i].location.state + ","
              + data.response.venues[i].location.cc+"<br>"+$scope.newtemp+"&nbsp;°F<br>"+$scope.main1+"<b>";
          console.log($scope.name)
          var location = new google.maps.LatLng($scope.lat, $scope.lng);
          addMarker(map, name, location);

        }
        function addMarker() {
          var marker = new google.maps.Marker({
            position: location,
            title: $scope.name,
            animation: google.maps.Animation.DROP,
            map: map
          })

          var infowindow = new google.maps.InfoWindow({
            content: $scope.address

          })
                    google.maps.event.addListener(marker, 'click', function () {
            infowindow.open(map, marker);
          })
        }
      })
    })
    })
  }

$scope.currmap=function () {
  //$scope.currloc=[];
//console.log('hi')
  navigator.geolocation.getCurrentPosition(function(location) {
    //console.log(location.coords.latitude);
    //console.log(location.coords.longitude);
    map = new google.maps.Map(document.getElementById('map'), {
      center: new google.maps.LatLng(location.coords.latitude, location.coords.longitude),
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      zoom: 10
    });
    var weather = $http.get("http://api.openweathermap.org/data/2.5/weather?apikey=4ad0b3a223d05fc3bace3d62ff16c710&lat=" + location.coords.latitude + "&lon=" + location.coords.longitude + "&appid=b1b15e88fa797225412429c1c50c122a1")
    weather.success(function (data) {
      $scope.main1 = data.weather[0].description;
      $scope.temp = data.main.temp;
      $scope.newtemp=(1.8*($scope.temp - 273)+ 32).toFixed(2);
      console.log($scope.main1, $scope.temp)

    var locs = $http.get("https://maps.googleapis.com/maps/api/geocode/json?key=AIzaSyBvG1scpDSBFT7Is9pS3w_JeWqcCHUgFT8&latlng=" + location.coords.latitude + "," + location.coords.longitude)
    locs.success(function (data) {
      $scope.disp1 = [];
      $scope.currloc = data.results[0].formatted_address;
      var value = $scope.currloc.split(",");
      count = value.length;
      city = value[count - 3];
      var venues = $http.get("https://api.foursquare.com/v2/venues/search/?client_id=NTWXDKJP1JWD5GPDS3QQNDCUVHPSFRO555RUTJLBM5IA1FGL%20&client_secret=IMF0TTYFJLCE3EMZHXPW5FALFVY0HSPTKO5IUXYLIAGLPBSQ&v=20201111%20&m=foursquare&near=" + city + "&categoryId=4bf58dd8d48988d118951735")
      venues.success(function (data) {
        for (var i = 0; i < data.response.venues.length; i++) {
          $scope.disp = {
            "Name": data.response.venues[i].name,
            "Address": data.response.venues[i].name + "," + data.response.venues[i].location.address
            + "," + data.response.venues[i].location.city + "," + data.response.venues[i].location.state + ","
            + data.response.venues[i].location.cc
          }
          $scope.disp1.push($scope.disp);
          $scope.lat = data.response.venues[i].location.lat;
          $scope.lng = data.response.venues[i].location.lng;
          $scope.name = data.response.venues[i].name;
          $scope.address = "<b>"+data.response.venues[i].name + "<br>" + data.response.venues[i].location.address
              + "," + data.response.venues[i].location.city + "," + data.response.venues[i].location.state + ","
              + data.response.venues[i].location.cc+"<br>"+$scope.newtemp+"&nbsp;°F<br>"+$scope.main1+"<b>";
          var location = new google.maps.LatLng($scope.lat, $scope.lng);
          addMarker(map, name, location);
        }
        console.log($scope.disp1)
        function addMarker() {
          var marker = new google.maps.Marker({
            position: location,
            title: $scope.name,
            animation: google.maps.Animation.DROP,
            map: map
          })

          var infowindow = new google.maps.InfoWindow({
            content: $scope.address

          })
          google.maps.event.addListener(marker, 'click', function () {
            infowindow.open(map, marker);
          })
        }
      })
    })
  })
  });   //console.log(data)
}
$scope.currmap();

})


