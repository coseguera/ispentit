exports.accounts = [
	{ id: 1, name: "Bank 1" },
	{ id: 2, name: "Bank 2" }
];

exports.people = [
	{ id: 1, name: "User 1" },
	{ id: 2, name: "User 2" }
];

exports.categories = [
	{ id: 1, name: "Category 1" },
	{ id: 2, name: "Category 2" }
];

exports.transactionsToSplits = [
	{ id: 1, amount: 100.00, date: new Date(2014, 1, 1) },
	{ id: 2, amount: 200.00, date: new Date(2014, 2, 20) }
];

exports.transactions = [
	{ id: 1, concept: "transaction 1", accountId: 1, personId: 1, categoryId: 1, transactionToSplitId: 1, amount: 48.00, date: new Date(2014, 1, 1) },
	{ id: 2, concept: "transaction 2", accountId: 1, personId: 1, categoryId: 1, transactionToSplitId: 1, amount: 52.00, date: new Date(2014, 1, 1) },
	{ id: 3, concept: "transaction 3", accountId: 1, personId: 1, categoryId: 1, transactionToSplitId: 2, amount: 120.00, date: new Date(2014, 1, 17) },
	{ id: 4, concept: "transaction 4", accountId: 1, personId: 1, categoryId: 1, transactionToSplitId: 2, amount: 80.00, date: new Date(2014, 1, 17) },
	{ id: 5, concept: "transaction 5", accountId: 1, personId: 1, categoryId: 1, transactionToSplitId: null, amount: 12.57, date: new Date(2014, 1, 18) },
];
