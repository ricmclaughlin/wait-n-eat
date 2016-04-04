(function () {
  'use strict';

  angular
    .module('app.waitList')
    .controller('WaitListController', WaitListController);

  WaitListController.$inject = ['$firebaseArray'];

  function WaitListController($firebaseArray) {
    var vm = this;

    var fireParties = new Firebase('https://rm-wait-eat2.firebaseio.com/parties');

    function Party() {
      this.name = '';
      this.phone = '';
      this.size = '';
      this.done = false;
      this.notified = false;
    }

    vm.newParty = new Party();
    vm.parties = $firebaseArray(fireParties);

    function removeParty(party) {
      vm.parties.$remove(party);
    }

    function addParty() {
      vm.parties.$add(vm.newParty);
      vm.newParty = new Party();
    }

    vm.addParty = addParty;
    vm.removeParty = removeParty;
  }
})();
