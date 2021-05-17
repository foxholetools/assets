const NetlifyAPI = require('netlify');

const { zipFunctions } = require('@netlify/zip-it-and-ship-it');
const zipNetlifyFunctions = async function () {
    const archives = await zipFunctions('functions', 'functions-dist');
    return archives;
}

async function getLogin()
{
    const client = new NetlifyAPI();
    const ticket = await client.createTicket({
        clientId: 'ysrHKF1zonrh2AKlTV5XmzFh0f1dBUazb0JNcjEJUNU',
    });

    // Open browser for authentication
    const open = require('open'); // installed with 'npm i open'
    await open(`https://app.netlify.com/authorize?response_type=ticket&ticket=${ticket.id}`);
    const accessToken = await client.getAccessToken(ticket);

    // API is also set up to use the returned access token as a side effect
    return accessToken; // Save this for later so you can quickly set up an authenticated client
}

async function run()
{
    const accessToken = await getLogin();

    console.log('Access OK')
    const client = new NetlifyAPI(accessToken);

    const opts = {
        draft: false, // draft deploy or production deploy
        message: "with a timeout",
        deployTimeout: 3.6e6, // 20 mins (1.2e6)
        concurrentHash: 100, // number of parallel hashing calls
        concurrentUpload: 5, // number of files to upload in parallel
        maxRetry: 5, // number of times to try on failed file uploads
        statusCb: function (statusObj)
        {
            console.log(statusObj);
        },
    };

    await client.deploy('c5af1cb0-d7d7-4bee-ab04-99efa0eb60bb', 'dist', opts);

}

run();