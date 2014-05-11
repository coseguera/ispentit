var trans = require('../../models/transactions-api');
var db = require('../mocks/dataMock');

describe('setup', function () {
	it('should return the object', function () {
		// act
		var result = trans.setup();

		// assert
		expect(result).not.toBe(null);
		expect(typeof result.get).toBe("function");
	});
});

describe('get', function () {
	it('should return all transactions', function () {
		// arrange
		var api = trans.setup(db);

		// act
		var result = api.get();

		// assert
		expect(result).toBe(db.transactions);	
	});

	it('should return a transaction', function () {
		// arrange
		var api = trans.setup(db);
		var expected = db.transactions[2];

		// act
		var result = api.get(expected.id);

		// assert
		expect(result).toBe(expected);
	});
});
