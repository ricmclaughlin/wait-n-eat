(function () {
  'use strict';

  angular
    .module('app.auth')
    .controller('AuthController', AuthController);

  AuthController.$inject = ['$location', '$firebaseAuth', 'FIREBASE_URL'];

  function AuthController($location, $firebaseAuth, FIREBASE_URL) {
    var vm = this;
    var firebaseReference = new Firebase(FIREBASE_URL);
    var firebaseAuthObject = $firebaseAuth(firebaseReference);

    vm.register = register;
    vm.login = login;
    vm.logout = logout;

    vm.user = {
      email: '',
      password: ''
    };

    function register(user) {
      return firebaseAuthObject.$createUser(user)
        .then(function () {
          vm.login(user);
        })
        .catch(function (error) {
          console.log(error);
        });
    }

    function login(user) {
      return firebaseAuthObject.$authWithPassword(user)
        .then(function (loggedInUser) {
          console.log(loggedInUser);
          $location.path('/waitlist');
        })
        .catch(function (error) {
          console.log(error);
        });

    }

    function logout() {
      firebaseAuthObject.$unauth();
      $location.path('/');
    }

  }
})();
