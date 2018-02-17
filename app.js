const QuestionBag = require('./classes/question-bag.js');
const QBot = require('./classes/q-bot');

let questionBag = new QuestionBag();
let qBot = new QBot(questionBag);

qBot.listen();
