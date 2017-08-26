var keystone = require('keystone');

require('./models');

keystone.init({
  
  'name': 'My Project',
  
  'favicon': 'public/favicon.ico',
  'less': 'public',
  'static': ['public'],
  'port': process.env.OPENSHIFT_NODEJS_PORT,
  'host': process.env.OPENSHIFT_NODEJS_IP,
  //'port': 80,
  //'host': 'localhost',
  'env': 'production',
  
  'views': 'templates/views',
  'view engine': 'jade',
  
  'auto update': true,
  'mongo': `mongodb://admin:hzWYLkXCky76@${process.env.OPENSHIFT_MONGODB_DB_HOST}:${process.env.OPENSHIFT_MONGODB_DB_PORT}`,
   'mongo': 'localhost',
  
  'nav': {
	User: 'User',
  },

  'session': true,
  'ssl': true,
  'auth': true,
  'user model': 'User',
  'cookie secret': 'LongRandomStringIsHere'
  
});
 
keystone.set('routes', require('./routes'));
 
keystone.start();