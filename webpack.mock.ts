const path = require('path');
const webpackMockServer = require('webpack-mock-server');
const nodePath = require('path');
const fs = require('fs');

function shuffle(array) {
  let currentIndex = array.length,  randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex != 0) {

    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }

  return array;
}

const QUESTIONS = JSON.parse(fs.readFileSync(nodePath.join(__dirname, "./src/__mocks__/questions.json"), 'utf8'));
const SCORING_MAP = QUESTIONS.reduce((acc, question) => {
  const currentScoring = question.answers.reduce((questionAcc, { id, score }) => ({ ...questionAcc, [id]: score }), {});
  return {
    ...acc,
    ...currentScoring,
  };
}, {});
const NO_SCORING_QUESTIONS = QUESTIONS.map((question) => ({
  ...question,
  answers: question.answers.map(({ id, label }) => ({ id, label })),
}));

export default webpackMockServer.add((app) => {
  app.get('/api/survey', (_, res) => {
    const mixedQuestions = shuffle([ ...NO_SCORING_QUESTIONS ]).map((question) => ({
      ...question,
      answers: shuffle(question.answers)
    }));
    const length = Math.random() * (5 - 3 + 1) + 3;
    
    res.send(mixedQuestions.slice(-length));
  });
  app.post('/api/result', (req, res) => {
    const { body: answers } = req;
    const score = req.body.reduce((acc, answerId) => acc + SCORING_MAP[answerId], 0);
    const result = Math.ceil(score / answers.length / 25);

    res.sendFile(nodePath.join(__dirname, `./src/__mocks__/result_${result}.json`));
  });
});
