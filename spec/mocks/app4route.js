'use strict';

exports.app = function () {
	var res = { render: function () { } };
	var app = {
		get: function (route, callback) {
			callback(null, res);
			return this;
		}
	};

	return { res: res, app: app };
};


