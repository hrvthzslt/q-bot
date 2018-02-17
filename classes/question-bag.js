const fs = require('fs');

class QuestionBag {
    constructor() {
        let rawdata = fs.readFileSync('./config/questions.json');
        this.questions = JSON.parse(rawdata);
    }

    get() {
        return this.questions;
    }
}

module.exports = QuestionBag;