(function () {
  'use strict';

  angular
    .module('app.waitList')
    .directive('gzPartyForm', gzPartyForm);

  function gzPartyForm() {
    return {
      templateUrl: 'app/waitlist/directives/partyform.html',
      restict: 'E',
      controller: PartyFormController,
      controllerAs: 'vm',
      bindToController: true,
      scope: {
        parties: '='
      }
    };
  }

  PartyFormController.$inject = ['partyService'];

  function PartyFormController(partyService) {
    var vm = this;

    vm.newParty = new partyService.Party();
    vm.addParty = addParty;

    function addParty() {
      vm.parties.$add(vm.newParty);
      vm.newParty = new partyService.Party();
    }
  }
})();
