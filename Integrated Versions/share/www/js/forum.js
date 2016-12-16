var db=null;
var example=angular.module('forum', ['ionic','ngCordova'])
example.run(function($ionicPlatform,$cordovaSQLite) {
  $ionicPlatform.ready(function() {
      //var db = window.sqlitePlugin.openDatabase({name: "my.db", location: 2, createFromLocation: 1});
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
db=window.openDatabase("sqlite","1.0","sqlitedemo",2000);
   $cordovaSQLite.execute(db, 'CREATE TABLE sql (id integer primary key,name text, message text)');  
  });
})

example.controller('forumctrl', function($scope, $http, $cordovaSQLite) {
    //var db = $cordovaSQLite.openDB({ name: "my.db", bgType: 1 });
   // $cordovaSQLite.exexute(db, 'CREATE TABLE IF NOT EXISTS commons (name text, message text');
    $scope.add=function(){
        
        //var query="DROP TABLE sql";
        // $cordovaSQLite.execute(db,query);
        var query="INSERT INTO sql(name,message) VALUES (?,?)";
        $cordovaSQLite.execute(db,query,[$scope.group_name,$scope.message]);
        $scope.load();
    }
     $scope.delete=function(){
        
        var query="DELETE FROM sql where id="+$scope.delete_id;
         $cordovaSQLite.execute(db,query);
        $scope.load();
    }
    
    $scope.load=function(){
        $scope.alldata=[];
        $cordovaSQLite.execute(db,"SELECT * FROM sql").then(function(result){
            if(result.rows.length){
                for(var i=0;i<result.rows.length;i++){
                    $scope.alldata.push(result.rows.item(i));
                }
            }
            else
                {
                    console.log("no data found");
                }
                                                         
 })
    },function(error){
        console.log("error"+err);
    }
    
});