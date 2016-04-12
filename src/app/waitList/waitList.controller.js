(function () {
  'use strict';

  angular
    .module('app.waitList')
    .controller('WaitListController', WaitListController);

  WaitListController.$inject = ['partyService', 'textMessageService', 'user'];

  function WaitListController(partyService, textMessageService, user) {
    var vm = this;

    console.log(user);

    vm.newParty = new partyService.Party();
    vm.parties = partyService.getPartiesByUser(user.uid);
    vm.sendTextMessage = sendTextMessage;
    vm.addParty = addParty;
    vm.removeParty = removeParty;
    vm.toggleDone = toggleDone;

    function removeParty(party) {
      vm.parties.$remove(party);
    }

    function addParty() {
      vm.parties.$add(vm.newParty);
      vm.newParty = new partyService.Party();
    }

    function sendTextMessage(party) {
      textMessageService.sendTextMessage(party, vm.parties);
      party.notified = true;
      vm.parties.$save(party);
    }

    function toggleDone(party) {
      vm.parties.$save(party);
    }
  }
})();
