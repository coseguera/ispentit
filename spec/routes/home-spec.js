var routes = require('../../routes/home');
var expressApp = require('../mocks/app4route');

describe('home', function () {
	var x; 

	beforeEach(function () {
		x = expressApp.app();
	});

	it('configures index and about', function () {
		// arrange
		spyOn(x.res, 'render');
		spyOn(x.app, 'get').andCallThrough();
		
		// act
		var result = routes.setup(x.app);

		// assert
		expect(x.app.get).toHaveBeenCalledWith('/', jasmine.any(Function));
		expect(x.res.render).toHaveBeenCalledWith('index', { 
			title: jasmine.any(String), 
			message: jasmine.any(String), 
			page: { home: true } });
		expect(x.app.get).toHaveBeenCalledWith('/about', jasmine.any(Function));
		expect(x.res.render).toHaveBeenCalledWith('index', {
			title: jasmine.any(String),
			message: jasmine.any(String),
			page: { about: true } });
	});
});
