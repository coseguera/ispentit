var transactions =[];

transactions.push({ id: 1, concept: 'transaction 1' });
transactions.push({ id: 2, concept: 'transaction 2' });
transactions.push({ id: 3, concept: 'transaction 3' });
transactions.push({ id: 4, concept: 'transaction 4' });
transactions.push({ id: 5, concept: 'transaction 5' });

exports.get = function  (id) {
	if (id) {
		for (var i = 0, len = transactions.length; i < len; i++) {
			if(transactions[i].id === id) {
				return transactions[i];
			}
		};
		
		return null;
	}

	return transactions;
};
