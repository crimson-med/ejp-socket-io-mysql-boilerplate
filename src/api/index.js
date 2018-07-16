const auth = require( './auth');
//import { version } from '../../package.json';
import { Router } from 'express';
//import facets from './facets';
//import auth from './auth'
export default ({ config, db }) => {
	let api = Router();

	api.use('/auth', auth)
	// perhaps expose some API metadata at the root
	api.get('/info', (req, res) => {
		// res.json({ version });
		res.sendFile(__dirname + '/index.html');
	});

	return api;
}
