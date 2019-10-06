const deploy = require('./libs/deploy');

module.exports = ({ framwork = 'express', path = '/deploy',  branch = 'master', deployUrl, }) => {
    const params = {
        path,
        branch,
        deployUrl,
    };

    return (...args) => {
        const isExpress = framwork === 'express'; 
        params.request = isExpress ? args[0] : args[0].request;
        const result = deploy(params);

        if (!result) {
            (isExpress ? args[2] : args[1])();
        }
    };
};