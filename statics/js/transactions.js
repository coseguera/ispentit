var $form = $('#query'),
    url = '/api/transactions',
    peopleUrl = '/api/people',
    accountsUrl = '/api/accounts';

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
        return formatAmount(self.amount());
    });
    self.formattedPersonSummary = ko.computed(function() {
        return formatAmount(item.personSummary);
    });
    self.formattedAccountSummary = ko.computed(function() {
        return formatAmount(item.accountSummary);
    });
    self.formattedDate = ko.computed(function() {
        var date = new Date(self.date());
        return date ? (date.getMonth() + 1) + "/" + date.getDate() + "/" + date.getFullYear() : "None";
    });
    
    function formatAmount(amount) { return amount ? (amount / 100).toFixed(2) : "None"; }
};

function AppViewModel() {
    // Data
    var self = this;
    self.transactions = ko.observableArray();
    self.people = ko.observableArray();
    self.accounts = ko.observableArray();

    self.peopleSummaries;
    self.accountSummaries;
    self.by;
    self.on;

    // transaction related
    self.processTransactions = function(data) {
        self.processPeopleSummaries(data.personSummaries);
        self.processAccountSummaries(data.accountSummaries);
        self.by = data.by ? data.by : null;
        self.on = data.on ? data.on : null;

        self.transactions($.map(data.items, function(item) { 
            self.addToPeopleSummaries(item.person, item.amount);
            item.personSummary = self.getPeopleSummaries(item.person);
            self.addToAccountSummaries(item.account, item.amount);
            item.accountSummary = self.getAccountSummaries(item.account);

            if((!self.by || self.by === item.person) && (!self.on || self.on === item.account)) {
                return new Transaction(item, self);
            }

            return
        }));
    };
    self.queryTransactions = function() {
        var query = $form.serialize();
        $.getJSON(url, query, self.processTransactions);
    };
    self.queryTransactions();

    // personRelated
    self.processPeopleSummaries = function(summaries) {
        self.peopleSummaries = {};
        for(var i = 0, len = summaries.length; i < len; i++) {
            var summary = summaries[i];
            self.peopleSummaries[summary._id] = summary.value;
        }
    };
    self.addToPeopleSummaries = function(person, value) {
        if(!self.peopleSummaries[person]) {
            self.peopleSummaries[person] = value;
        } else {
            self.peopleSummaries[person] += value;
        }
    };
    self.getPeopleSummaries = function(person) {
        return self.peopleSummaries[person] ? self.peopleSummaries[person] : 0;
    };
    self.queryPeople = function() {
        $.getJSON(peopleUrl, self.people);
    }; 
    self.getPersonName = function(id) {
        return getName(id, self.people());
    };
    self.queryPeople();

    // account related
    self.processAccountSummaries = function(summaries) {
        self.accountSummaries = {};
        for(var i = 0, len = summaries.length; i < len; i++) {
            var summary = summaries[i];
            self.accountSummaries[summary._id] = summary.value;
        }
    };
    self.addToAccountSummaries = function(account, value) {
        if(!self.accountSummaries[account]) {
            self.accountSummaries[account] = value;
        } else {
            self.accountSummaries[account] += value;
        }
    };
    self.getAccountSummaries = function(account) {
        return self.accountSummaries[account] ? self.accountSummaries[account] : 0;
    };
    self.queryAccounts = function() {
        $.getJSON(accountsUrl, self.accounts);
    };
    self.getAccountName = function(id) {
        return getName(id, self.accounts());
    };
    self.queryAccounts();

    // helpers
    function getName(id, array) {
        for(var i = 0, len = array.length; i < len; i++) {
            if(array[i].id === id) return array[i].name;
        }
        return undefined;
    }
}

var vm = new AppViewModel();
ko.applyBindings(vm);
