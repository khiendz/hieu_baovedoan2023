import { expressjwt } from 'express-jwt';
import getConfig from 'next/config';


export { jwtMiddleware };

function jwtMiddleware(req: any, res: any) {
    const util = require('util');
    const { serverRuntimeConfig } = getConfig();
    const middleware = expressjwt({ secret: serverRuntimeConfig.secret, algorithms: ['HS256'] }).unless({
        path: [
            // public routes that don't require authentication
            '/api/users/authenticate'
        ]
    });

    return util.promisify(middleware)(req, res);
}