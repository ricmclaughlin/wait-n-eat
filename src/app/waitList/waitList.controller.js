(function () {
  'use strict';

  angular
    .module('app.waitList')
    .controller('WaitListController', WaitListController);

  WaitListController.$inject = ['FIREBASE_URL', 'partyService', 'textMessageService'];

  function WaitListController(FIREBASE_URL, partyService, textMessageService) {
    var vm = this;

    var fireParties = new Firebase(FIREBASE_URL + 'parties');
    var fireTextMessages = new Firebase(FIREBASE_URL + 'textMessages');

    vm.newParty = new partyService.Party();
    vm.parties = partyService.parties;
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
