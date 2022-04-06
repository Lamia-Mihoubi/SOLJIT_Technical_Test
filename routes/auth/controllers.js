const fetch = require('node-fetch');
const { logger } = require('../../utils/logger');
const jsforce = require('jsforce');

const client_id = process.env.CUSTOMER_ID;
const client_secret = process.env.CUSTOMER_SECRET;
const username = process.env.USERNAME;
const password = process.env.PASSWORD;
/* Attempt n=1: 
const oauth = new jsforce.OAuth2({
  loginUrl: 'https://test.salesforce.com',
  clientId: client_id,
  clientSecret: client_secret,
  redirectUri: `http://localhost:${process.env.PORT}/oauth2/callback`,
});
const login = (req, res) => {
  res.redirect(
    oauth.getAuthorizationUrl({ scope: 'api id web refresh_token' }),
  );
};*/

/* Attempt n=2
const login = async (req, res) => {
  const response = await fetch(
    `https://login.salesforce.com/services/oauth2/token`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: {
        grant_type: 'authorization_code',
        client_id: client_id,
        client_secret: client_secret,
        username: username,
        password: password,
      },
    },
  );
  const access_data = await response.json();
  req.session.access_data = access_data;
  res.send(req.session.access_data);
};*/

const conn = new jsforce.Connection({
  loginUrl: 'https://test.salesforce.com',
  clientId: client_id,
  clientSecret: client_secret,
});

const login = (req, res) => {
  conn.login(username, password, function (err, userInfo) {
    if (err) {
      return console.error(err);
    }
    // Now you can get the access token and instance URL information.
    // Save them to establish connection next time.
    req.session.accessToken = conn.accessToken;
    req.session.instanceUrl = conn.instanceUrl;
    // logged in user property
    console.log('User ID: ' + userInfo.id);
    console.log('Org ID: ' + userInfo.organizationId);
  });
};

const logout = (req, res) => {
  conn.logout((err) => {
    if (err) {
      return console.error(err);
    }
  });
  // destroy the express session
  req.session.destroy(() => {
    res.redirect('/api/auth/login');
  });
};
module.exports = { login, logout };
