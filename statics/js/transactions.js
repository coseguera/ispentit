var $form = $('#query'),
    url = '/api/transactions';

ko.bindingHandlers.jqCalendar = {
init: function(element) {
          $(element).datepicker();
      }
};

function Transaction(item, vm) { 
    var self = this;
    self.concept = ko.observable(item.concept);
    self.date = ko.observable(item.date);
    self.amount = ko.observable(item.amount);
    self.account = ko.observable(item.account);
    self.person = ko.observable(item.person);
    self.splitId = ko.observable(item.splitId);

    self.personName = ko.computed(function() { return vm.getPersonName(item.person) });
    self.accountName = ko.computed(function() { return vm.getAccountName(item.account) });
    self.isSplit = ko.computed(function() { return item.splitId ? 'x' : '' });

    self.formattedAmount = ko.computed(function() {
        var amount = self.amount();
        return amount ? amount.toFixed(2) : "None";
    });
    self.formattedDate = ko.computed(function() {
        var date = new Date(self.date());
        return date ? (date.getMonth() + 1) + "/" + date.getDate() + "/" + date.getFullYear() : "None";
    });
};

function AppViewModel() {
    // Data
    var self = this;
    self.transactions = ko.observableArray();
    self.people = [
        { id: 'L', name: 'Liz' },
        { id: 'C', name: 'Carlos' },
        { id: 'M', name: 'Muebles' }
    ];
    self.accounts = [{ id: 'FTC', name: 'FT Checking' }];

    self.processData = function(data) {
        self.transactions($.map(data, function(item) { 
            var personName = self.getPersonName(item.person);            
            return new Transaction(item, self);
        }));
    };
    self.queryData = function() {
        var query = $form.serialize();
        $.getJSON(url, query, self.processData);
    };
    self.queryData();

    self.getPersonName = function(id) {
        return getName(id, self.people);
    };
    self.getAccountName = function(id) {
        return getName(id, self.accounts);
    };

    function getName(id, array) {
        for(var i = 0, len = array.length; i < len; i++) {
            if(array[i].id === id) return array[i].name;
        }
        return undefined;
    }
}

var vm = new AppViewModel();
ko.applyBindings(vm);
