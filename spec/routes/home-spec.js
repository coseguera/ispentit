var routes = require('../../routes/home');

describe('home', function () {
	var app, res;

	beforeEach(function () {
		res = {
			render: function () { }
		};
		app = {
			get: function (route, callback) { 
				callback(null, res); 
				return this;
			}
		};
	});

	it('returns true', function () {
		// arrange
		spyOn(res, 'render');
		spyOn(app, 'get').andCallThrough();
		
		// act
		var result = routes.setup(app);

		// assert
		expect(app.get).toHaveBeenCalledWith('/', jasmine.any(Function));
		expect(res.render).toHaveBeenCalledWith('index', { 
			title: jasmine.any(String), 
			message: jasmine.any(String), 
			page: { home: true } });
		expect(app.get).toHaveBeenCalledWith('/about', jasmine.any(Function));
		expect(res.render).toHaveBeenCalledWith('index', {
			title: jasmine.any(String),
			message: jasmine.any(String),
			page: { about: true } });
	});
});
