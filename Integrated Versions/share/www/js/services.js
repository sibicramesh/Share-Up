angular.module('starter.services', [])
  .service('LoginService', function($q, $http) {
    return {
      loginUser: function(name, pw) {
        var deferred = $q.defer();
        var promise = deferred.promise;
        $http({
          method: 'GET',
          url: 'https://api.mongolab.com/api/1/databases/harry/collections/users?q={\"username\":\"'+name+'\",\"password\":\"'+pw+'\"}&apiKey=0xCX7-4KL6dGWvAOR5PLzPaC-DtA0KZ4',
          contentType:"application/json"

        }).success(function(data){

          if (name == data[0].username&&pw==data[0].password ){

            deferred.resolve('Welcome ' + data[0].username + '!');
          } else {

            deferred.reject('Wrong credentials.');
          }

        })
        promise.success = function(fn) {
          promise.then(fn);
          return promise;
        }
        promise.error = function(fn) {
          promise.then(null, fn);
          return promise;
        }
        return promise;
      }

    }})
  .service('GroupService', function($q, $http) {
    return {
      groupUser: function(ggname) {
        var deferred = $q.defer();
        var promise = deferred.promise;
        $http({
          method: 'GET',
          url: 'https://api.mongolab.com/api/1/databases/harry/collections/users?q={\"gname\":\"'+ggname+'\"}&apiKey=0xCX7-4KL6dGWvAOR5PLzPaC-DtA0KZ4',
          contentType:"application/json"

        }).success(function(data){
          users = [];
          for(var i=0;i<data.length;i++)
          {
            users[i]=data[i].username
          }
          //console.log(users);
            return users;
        })
        promise.success = function(fn) {
          promise.then(fn);
          return promise;
        }
        promise.error = function(fn) {
          promise.then(null, fn);
          return promise;
        }
        return promise;
      }

    }})
  .service('DeleteService', function($q, $http) {
    return {

      deleteUser:function(name) {
        var deferred = $q.defer();
        var promise = deferred.promise;

        $http({
          method: 'GET',
          url: 'https://api.mongolab.com/api/1/databases/harry/collections/users?q={username:\''+name+'\'}&apiKey=0xCX7-4KL6dGWvAOR5PLzPaC-DtA0KZ4',
          contentType:"application/json"

        }).success(function(data){
          alert(data[0]._id.$oid);
          if (name == data[0].username && pw == data[0].password) {

            $http({
              method: 'DELETE' ,
              url: 'https://api.mongolab.com/api/1/databases/harry/collections/users/'+data[0]._id.$oid+'?apiKey=0xCX7-4KL6dGWvAOR5PLzPaC-DtA0KZ4',

            }).success(function (data) {
              alert(1);
            })
            deferred.resolve('Welcome ' + data[0].username + '!');
          } else {
            deferred.reject('Wrong credentials.');
          }

        })
        promise.success = function(fn) {
          promise.then(fn);
          return promise;
        }
        promise.error = function(fn) {
          promise.then(null, fn);
          return promise;
        }
        return promise;

      }

    }
  })


  .service('UpdateService', function($q, $http) {
    return {

      updateUser:function(username) {
        var deferred = $q.defer();
        var promise = deferred.promise;

        $http({
          method: 'GET',
          url: 'https://api.mongolab.com/api/1/databases/harry/collections/users?q={username:\''+username+'\'}&apiKey=0xCX7-4KL6dGWvAOR5PLzPaC-DtA0KZ4',
          contentType:"application/json"

        }).success(function(data){
          //alert(data[0]._id.$oid);
          if (name == data[0].username ) {

            $http({
              method: 'PUT' ,
              url: 'https://api.mongolab.com/api/1/databases/harry/collections/users/'+data[0]._id.$oid+'?apiKey=0xCX7-4KL6dGWvAOR5PLzPaC-DtA0KZ4',
              data: JSON.stringify( { "$set" : { "password" : password } } ),

              contentType: "application/json"
            }).success(function (data) {
              alert(1);
            })
            deferred.resolve('Welcome ' + data[0].username + '!');
          } else {
            deferred.reject('Wrong credentials.');
          }

        })
        promise.success = function(fn) {
          promise.then(fn);
          return promise;
        }
        promise.error = function(fn) {
          promise.then(null, fn);
          return promise;
        }
        return promise;

      }

    }
  })

  .service('RegisterService', function($q, $http) {
    return {
      RegisterUser: function( username, password,pass,mob,nic,gn) {
        var deferred = $q.defer();
        var promise = deferred.promise;
        $http({
          method: 'POST',
          url: 'https://api.mongolab.com/api/1/databases/harry/collections//users?apiKey=0xCX7-4KL6dGWvAOR5PLzPaC-DtA0KZ4',
          data: JSON.stringify({

            username: username,
            password: password,
            cpassword:pass,
            mobile:mob,
            email:nic,
            gname:gn,
          }),
          contentType:"application/json"

        }).success(function(data){

          deferred.resolve('Welcome!');
          /* if ( data[0].username != null && data[0].password != null && data[0].lastname != null && data[0].firstname != null &&data[0].email != null ) {
           deferred.resolve('Welcome ' + data[0].username + '!');
           } else {
           deferred.reject('please fill all the fields');
           }
           */

        })
        promise.success = function(fn) {
          promise.then(fn);
          return promise;
        }
        promise.error = function(fn) {
          promise.then(null, fn);
          return promise;
        }
        return promise;

      }
    }
  })

  .factory('$localstorage', ['$window', function($window) {
    return {

      // save a single string to local storage
      set: function(key, value) {
        $window.localStorage[key] = value;
      },

      // loading a single string from local storage
      get: function(key, defaultValue) {
        return $window.localStorage[key] || defaultValue;
      },

      // saving an object to local storage
      setObject: function(key, value) {
        $window.localStorage[key] = JSON.stringify(value);
      },

      // loading an object from local storage
      getObject: function(key) {
        return JSON.parse($window.localStorage[key] || null);
      }
    }
  }])


.factory('Chats', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var chats = [{
    id: 0,
    name: 'Ben Sparrow',
    lastText: 'You on your way?',
    face: 'img/ben.png'
  }, {
    id: 1,
    name: 'Max Lynx',
    lastText: 'Hey, it\'s me',
    face: 'img/max.png'
  }, {
    id: 2,
    name: 'Adam Bradleyson',
    lastText: 'I should buy a boat',
    face: 'img/adam.jpg'
  }, {
    id: 3,
    name: 'Perry Governor',
    lastText: 'Look at my mukluks!',
    face: 'img/perry.png'
  }, {
    id: 4,
    name: 'Mike Harrington',
    lastText: 'This is wicked good ice cream.',
    face: 'img/mike.png'
  }];

  return {
    all: function() {
      return chats;
    },
    remove: function(chat) {
      chats.splice(chats.indexOf(chat), 1);
    },
    get: function(chatId) {
      for (var i = 0; i < chats.length; i++) {
        if (chats[i].id === parseInt(chatId)) {
          return chats[i];
        }
      }
      return null;
    }
  };
});
