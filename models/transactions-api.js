exports.setup = function (db) {
	return {
		get: function (id) {
			var transactions = db.transactions;

			if (id) {
				for (var i = 0, len = transactions.length; i < len; i++) {
					if(transactions[i].id === id) {
						return transactions[i];
					}
				};
				
				return null;
			}
		
			return transactions;
		}
	};
};
