'use strict';

var auth = require('../../models/auth');

describe('validate', function () {
	it('should return true if usr and pwd are right', function () {
		// act
		var result = auth.validate('abc', 'def');

		// assert
		expect(result).toBe(true);
	});
	
	it('should return false if usr and pwd are wrong', function () {
		// act
		var result = auth.validate('wrongUsr', 'wrongPwd');

		// assert
		expect(result).toBe(false);
	});
});
