const deploy = require('./libs/deploy');

module.exports = ({ framwork = 'express', path = '/deploy',  branch = 'master', deployUrl, }) => {
    const params = {
        path,
        branch,
        deployUrl,
    };

    return async (...args) => {
        const isExpress = framwork === 'express'; 
        params.request = isExpress ? args[0] : args[0].request;
        const result = deploy(params);

        if (!result) {
            await (isExpress ? args[2] : args[1])();
        } else {
            if (isExpress) {
                args[1].status(200).end();
            } else {
                args[0].status = 200;
            }
        }
    };
};