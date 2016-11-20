angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope) {})

.controller('ChatsCtrl', function($scope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})


  .controller('homeCtrlr', function($scope, $stateParams, Chats) {
  })



  .controller('groupCtrlr', function($scope,$http) {
    $scope.data1={};
    $scope.gnamename=[];
    $scope.getusers=function () {
      var gname=$scope.data1.group;
      //console.log($scope.data1.group)
      var name1=$http.get("https://api.mongolab.com/api/1/databases/harry/collections/users?q={\"gname\":\""+gname+"\"}&apiKey=0xCX7-4KL6dGWvAOR5PLzPaC-DtA0KZ4")
      name1.success(function(data){
console.log(data.length)
        for(var i=0;i<data.length;i++) {
          $scope.gnamename[i] = {"name": data[0].username};
        }
        console.log($scope.gnamename)
      });
    }



  })




  .controller('loginCtrl', function($scope, LoginService, DeleteService, UpdateService, $ionicPopup, $state) {
      $scope.data = {};



      $scope.login = function(username) {
        LoginService.loginUser($scope.data.username, $scope.data.password).success(function(data) {
          alert("success");
          $state.go('register');
        }).error(function(data) {
          var alertPopup = $ionicPopup.alert({
            title: 'Login failed!',
            template: 'Please check your credentials!'
          });
        });

      }
    $scope.redirectToRegistration=function()
    {
      $state.go('register');
    };


      $scope.goToHome =function()
      {


        $state.go('register');
      }



    }
  )





  .controller('registrationCtrlr', function($scope, RegisterService, DeleteService, UpdateService, $ionicLoading,$ionicPopup, $state) {
      $scope.data = {};

      $scope.delete =function(username)
      {


        DeleteService.deleteUser($scope.data.username).success(function(data) {
          var alertPopup = $ionicPopup.alert({
            title: 'Deleted!',
            template: 'Your account is deleted succesfully!'
          });
        }).error(function(data) {
          var alertPopup = $ionicPopup.alert({
            title: 'Login failed!',
            template: 'Please check your credentials!'
          });
        });
      }
      $scope.update =function(username)
      {
        UpdateService.updateUser($scope.data.username).success(function(data) {
          var alertPopup = $ionicPopup.alert({
            title: 'Updated!',
            template: 'Your account is updated succesfully!'
          });
        }).error(function(data) {
          var alertPopup = $ionicPopup.alert({
            title: 'Update failed!',
            template: 'Please check your credentials!'
          });
        });
      }

      $scope.completeRegistration = function(email){

        RegisterService.RegisterUser( $scope.data.username, $scope.data.password,$scope.data.cpassword, $scope.data.mobile,$scope.data.nick,$scope.data.gname).success(function(data) {
          alert("Welcome " +$scope.data.nick  );
          $state.go('login');
        }).error(function(data) {
          var alertPopup = $ionicPopup.alert({
            title: 'Registration failed!',
            template: 'Please check your credentials!'
          });
        });
      }

})

  .controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
