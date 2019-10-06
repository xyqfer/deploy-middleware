const https = require('https');

const deploy = (params) => {
    const { method, path, body, } = params.request;

    if (method.toUpperCase() === 'POST' && path === params.path) {
        const { ref, commits, } = body;
        const isBot = !!commits.find(({ author }) => {
            return author.name.includes('[bot]');
        });

        if (ref === `refs/heads/${params.branch}` && !isBot) {
            const deployUrl = params.deployUrl || process.env.DEPLOY_URL;
            https.request(deployUrl, {
                method: 'POST',
            }, () => {});

            return true;
        } else {
            return false;
        }
    } else {
        return false;
    }
};

module.exports = deploy;