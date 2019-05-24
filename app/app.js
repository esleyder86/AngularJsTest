var app = angular.module('myApp', ['ngRoute',"LocalStorageModule"]);

app.factory('UserInfoService',function(localStorageService){
  var userInfo = {};
  userInfo.key = "user";
  if(localStorageService.get(userInfo.key)){
    userInfo.users = localStorageService.get(userInfo.key)
  }else{
    userInfo.users = [];
  }

  userInfo.add = function(newUser){
    userInfo.users.push(newUser);
    userInfo.updateLocalStorage();
  }
  userInfo.updateLocalStorage = function(newUser){
    localStorageService.set(userInfo.key, userInfo.users);
  }

  userInfo.clean = function(){
    userInfo.users = [];
    userInfo.updateLocalStorage();
  }
  userInfo.getAll = function(){
    return userInfo.users;
  }

  userInfo.removeUser = function(item){
    userInfo.users = userInfo.users.filter(function(user){
      return user !== item;
    })
  }


  return userInfo;
})

app.config(function ($routeProvider) {
  $routeProvider.when("/formulario", {
    templateUrl: "form/form.html",
    controller: 'FormController'
  })
  .otherwise({
    redirectTo: "/",
    
  });
})

app.controller('AppController', function ($scope) {
  $scope.user = "Bienvenido"

});

app.controller('FormController', function ($scope,UserInfoService,$http) {
  $scope.likes =  [{ name: "El espacio sideral", id: 1 }, { name: "Ir a Misa", id: 2 }, { name: "Montar bicicleta", id: 3 }, { name: "Atrapar pokemons", id: 4 }];
  $scope.user = {};
  $scope.users = {};
  $scope.gustoEspacio = {};




  $scope.users = UserInfoService.getAll();

  $scope.addUserInfo = function(){
    UserInfoService.add($scope.user);
    $scope.user = {};
  }

  $scope.changeLikes = function() {
    if($scope.item.id == 1){
      $http({
        method: 'GET',
        url: 'http://www.asterank.com/api/mpc?&limit=2'
      }).then(function successCallback(response) {
        $scope.gustoEspacio = response.data
        console.log($scope.gustoEspacio)
        }, function errorCallback(response) {

        });
    }
    else if($scope.item.id == 2){
      $http({
        method: 'GET',
        url: 'https://pokeapi.co/api/v2/pokemon/ditto/'
      }).then(function successCallback(response) {
        $scope.gustoEspacio = response.habilities
        console.log($scope.gustoEspacio)
        }, function errorCallback(response) {

        });
    }
    else if($scope.item.id == 3){
      $http({
        method: 'GET',
        url: 'http://api.citybik.es/v2/networks'
      }).then(function successCallback(response) {
        $scope.gustoEspacio = response.data
        console.log($scope.gustoEspacio)
        }, function errorCallback(response) {

        });
    }
    else if($scope.item.id == 4){
      $http({
        method: 'GET',
        url: 'http://calapi.inadiutorium.cz/api/v0/en/calendars/default/today?&limit=5'
      }).then(function successCallback(response) {
        $scope.gustoEspacio = response.data
        console.log($scope.gustoEspacio)
        }, function errorCallback(response) {

        });
    }
  }
/* 

  $scope.checkSelectedPhones = function() {
    var modelNames = [];
    var aletrMsg= '';
    angular.forEach($scope.phones, function(phone) {
        if (phone.selected) {
        modelNames.push(phone);
        aletrMsg += 'Brand : '+ phone.brandname + 'Phone Name: '+ phone.modelname + ' : Price: '+ phone.price +', ';
      }
    });
    alert(modelNames.length ? aletrMsg : 'No phones selected!');
  } */
});

