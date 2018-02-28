'use strict'

module.exports = {
	header: {
		method: 'POST',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json',
		}
	},

	api: {
		base: 'http://rap2api.taobao.org/app/mock/6146',
		creations: '/GET//api/creations',
		up: '/POST/up',
	}

}