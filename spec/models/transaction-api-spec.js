var trans = require('../../models/transactions-api');

describe('get', function () {
	it('should get all transactions', function () {
		// act
		var result = trans.get();
		
		// assert
		expect(result.length).toBe(5);
	});
	it('should get a transaction', function () {
		// act
		var result = trans.get(2);

		// assert
		expect(result.id).toBe(2);
	});
});
