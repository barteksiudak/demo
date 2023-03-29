const path = require('path');
const webpackMockServer = require('webpack-mock-server');
const nodePath = require('path');

export default webpackMockServer.add((app) => {
  app.get('/api/survey', (_req, res) => {
    res.sendFile(nodePath.join(__dirname, "./src/__mocks__/questions.json"));
  });
  app.post('/api/result', (_req, res) => {
    res.sendFile(nodePath.join(__dirname, "./src/__mocks__/analyse.json"));
  });
});
