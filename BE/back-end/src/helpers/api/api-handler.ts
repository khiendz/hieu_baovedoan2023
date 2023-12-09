import { errorHandler, jwtMiddleware } from '../../helpers/api';

export { apiHandler };

function apiHandler(handler: any, publicAction: any = []) {

    return async (req: any, res: any) => {
        if (req.method == "OPTIONS") {
            res.setHeader("Allow", "POST");
            return res.status(202).json({});
        }
        if (publicAction.length > 0 && publicAction.find((ob: any) => ob == req.method))
        {
            await handler(req, res);
            return;
        } 

        try {
            // global middleware
            await jwtMiddleware(req, res);

            // route handler
            await handler(req, res);
        } catch (err) {
            // global error handler
            errorHandler(err, res);
        }
    }
}