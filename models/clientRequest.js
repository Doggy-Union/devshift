var keystone = require('keystone');
var Types = keystone.Field.Types;

var ClientRequest = new keystone.List('ClientRequest', {
});

ClientRequest.add({
    name: { type: String, required: true, initial: true },
	email: { type: String, required: true, initial: true },
	checked: { type: Types.Boolean }
});

ClientRequest.register();