import axios from "axios";

const API_URL = "http://eb66b027972f.ngrok.io/api"; //Remote development
// const API_URL = "http://192.168.100.4:3333/api"; //Local development

const API_KEY = "52b6d8bd1150ab990c2e7ce4d5a568fff6da58a0202745a079a00c9401e999eb";

function query(endpoint, method, data, type="json") {
	let headerOptions = {};
	if (type == "json") {
		data = JSON.stringify(data);
		headerOptions = {'Content-Type': "application/json"}
	} else if (type == "file") {
		headerOptions = {'Content-Type': "multipart/form-data"};
	} else if (type == "form-urlencoded") {
		headerOptions = {'Content-Type': "application/x-www-form-urlencoded; charset=UTF-8"}
	}
	return axios({
		baseURL: API_URL + endpoint,
		method: method,
		data: data,
		headers: {
			'Authorization': `Bearer ${API_KEY}`,
			...headerOptions
		}
	})
}
/*
Define our API Endpoints
*/
let api = {
	// campaigns contains the endpoints for /campaigns
	campaigns: {
		// get() - Queries the API for GET /campaigns
		get: function () {
			return query("/campaigns/", "GET", {})
		},
		// post() - Posts a campaign to POST /campaigns
		post: function (data) {
			return query("/campaigns/", "POST", data)
		},
		// summary() - Queries the API for GET /campaigns/summary
		summary: function () {
			return query("/campaigns/summary", "GET", {})
		}
	},
	// campaignId contains the endpoints for /campaigns/:id
	campaignId: {
		// get() - Queries the API for GET /campaigns/:id
		get: function (id) {
			return query("/campaigns/" + id, "GET", {})
		},
		// delete() - Deletes a campaign at DELETE /campaigns/:id
		delete: function (id) {
			return query("/campaigns/" + id, "DELETE", {})
		},
		// results() - Queries the API for GET /campaigns/:id/results
		results: function (id) {
			return query("/campaigns/" + id + "/results", "GET", {})
		},
		// complete() - Completes a campaign at POST /campaigns/:id/complete
		complete: function (id) {
			return query("/campaigns/" + id + "/complete", "GET", {})
		},
		// summary() - Queries the API for GET /campaigns/summary
		summary: function (id) {
			return query("/campaigns/" + id + "/summary", "GET", {})
		}
	},
	// groups contains the endpoints for /groups
	groups: {
		// get() - Queries the API for GET /groups
		get: function () {
			return query("/groups/", "GET", {})
		},
		// post() - Posts a group to POST /groups
		post: function (group) {
			return query("/groups/", "POST", group)
		},
		// summary() - Queries the API for GET /groups/summary
		summary: function () {
			return query("/groups/summary", "GET", {})
		}
	},
	// groupId contains the endpoints for /groups/:id
	groupId: {
		// get() - Queries the API for GET /groups/:id
		get: function (id) {
			return query("/groups/" + id, "GET", {})
		},
		// put() - Puts a group to PUT /groups/:id
		put: function (group) {
			return query("/groups/" + group.id, "PUT", group)
		},
		// delete() - Deletes a group at DELETE /groups/:id
		delete: function (id) {
			return query("/groups/" + id, "DELETE", {})
		}
	},
	// templates contains the endpoints for /templates
	templates: {
		// get() - Queries the API for GET /templates
		get: function () {
			return query("/templates/", "GET", {})
		},
		// post() - Posts a template to POST /templates
		post: function (template) {
			return query("/templates/", "POST", template)
		}
	},
	// templateId contains the endpoints for /templates/:id
	templateId: {
		// get() - Queries the API for GET /templates/:id
		get: function (id) {
			return query("/templates/" + id, "GET", {})
		},
		// put() - Puts a template to PUT /templates/:id
		put: function (template) {
			return query("/templates/" + template.id, "PUT", template)
		},
		// delete() - Deletes a template at DELETE /templates/:id
		delete: function (id) {
			return query("/templates/" + id, "DELETE", {})
		}
	},
	// pages contains the endpoints for /pages
	pages: {
		// get() - Queries the API for GET /pages
		get: function () {
			return query("/pages/", "GET", {})
		},
		// post() - Posts a page to POST /pages
		post: function (page) {
			return query("/pages/", "POST", page)
		}
	},
	// pageId contains the endpoints for /pages/:id
	pageId: {
		// get() - Queries the API for GET /pages/:id
		get: function (id) {
			return query("/pages/" + id, "GET", {})
		},
		// put() - Puts a page to PUT /pages/:id
		put: function (page) {
			return query("/pages/" + page.id, "PUT", page)
		},
		// delete() - Deletes a page at DELETE /pages/:id
		delete: function (id) {
			return query("/pages/" + id, "DELETE", {})
		}
	},
	// SMTP contains the endpoints for /smtp
	SMTP: {
		// get() - Queries the API for GET /smtp
		get: function () {
			return query("/smtp/", "GET", {})
		},
		// post() - Posts a SMTP to POST /smtp
		post: function (smtp) {
			return query("/smtp/", "POST", smtp)
		}
	},
	// SMTPId contains the endpoints for /smtp/:id
	SMTPId: {
		// get() - Queries the API for GET /smtp/:id
		get: function (id) {
			return query("/smtp/" + id, "GET", {})
		},
		// put() - Puts a SMTP to PUT /smtp/:id
		put: function (smtp) {
			return query("/smtp/" + smtp.id, "PUT", smtp)
		},
		// delete() - Deletes a SMTP at DELETE /smtp/:id
		delete: function (id) {
			return query("/smtp/" + id, "DELETE", {})
		}
	},
	// IMAP containts the endpoints for /imap/
	IMAP: {
		get: function() {
			return query("/imap/", "GET", {}, !1)
		},
		post: function(e) {
			return query("/imap/", "POST", e, !1)
		},
		validate: function(e) {
			return query("/imap/validate", "POST", e)
		}
	},
	// users contains the endpoints for /users
	users: {
		// get() - Queries the API for GET /users
		get: function () {
			return query("/users/", "GET", {})
		},
		// post() - Posts a user to POST /users
		post: function (user) {
			return query("/users/", "POST", user)
		}
	},
	// userId contains the endpoints for /users/:id
	userId: {
		// get() - Queries the API for GET /users/:id
		get: function (id) {
			return query("/users/" + id, "GET", {})
		},
		// put() - Puts a user to PUT /users/:id
		put: function (user) {
			return query("/users/" + user.id, "PUT", user)
		},
		// delete() - Deletes a user at DELETE /users/:id
		delete: function (id) {
			return query("/users/" + id, "DELETE", {})
		}
	},
	webhooks: {
		get: function() {
			return query("/webhooks/", "GET", {})
		},
		post: function(webhook) {
			return query("/webhooks/", "POST", webhook)
		},
	},
	webhookId: {
		get: function(id) {
			return query("/webhooks/" + id, "GET", {})
		},
		put: function(webhook) {
			return query("/webhooks/" + webhook.id, "PUT", webhook)
		},
		delete: function(id) {
			return query("/webhooks/" + id, "DELETE", {})
		},
		ping: function(id) {
			return query("/webhooks/" + id + "/validate", "POST", {})
		},
	},
	// import handles all of the "import" functions in the api
	import_email: function (req) {
		return query("/import/email", "POST", req)
	},
	// clone_site handles importing a site by url
	clone_site: function (req) {
		return query("/import/site", "POST", req)
	},
	import_group: function (req) {
		return query("/import/group", "POST", req, "file")
		// return axios.post(API_URL + "/import/group", req, {});
	},
	// send_test_email sends an email to the specified email address
	send_test_email: function (req) {
		return query("/util/send_test_email", "POST", req)
	},
	reset: function () {
		return query("/reset", "POST", {})
	},
	settings: function (req) {
		return query("/settings", "POST", req, "form-urlencoded")
	}
}

export default api;
