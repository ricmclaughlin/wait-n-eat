(function () {
  'use strict';

  angular
    .module('app.auth')
    .controller('AuthController', AuthController);

  AuthController.$inject = ['$location', 'authService'];

  function AuthController($location, authService) {
    var vm = this;

    vm.register = register;
    vm.login = login;
    vm.logout = logout;
    vm.isLoggedIn = authService.isLoggedIn;

    vm.user = {
      email: '',
      password: ''
    };

    function register(user) {
      return authService.register(user)
        .then(function () {
          vm.login(user);
        })
        .catch(function (error) {
          console.log(error);
        });
    }

    function login(user) {
      return authService.login(user)
        .then(function (loggedInUser) {
          console.log(loggedInUser);
          $location.path('/waitlist');
        })
        .catch(function (error) {
          console.log(error);
        });

    }

    function logout() {
      authService.logout();
      $location.path('/');
    }
  }
})();
