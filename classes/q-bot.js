const Botkit = require('botkit');
require('dotenv').config();

class QBot {
    constructor(questionBag) {
        this.slackController = Botkit.slackbot({debug: false});
        this.slackController.spawn({
            token: process.env.TOKEN
        }).startRTM();

        this.questions = questionBag.get()
    }

    listen() {
        this.slackController.hears(this.questions.trigger, ['direct_message'], function(bot, message) {
            bot.createConversation(message, function (err, convo) {

                for ( let i in this.questions.questions ) {
                    convo.addQuestion(this.questions.questions[i],function(response,convo) {
                        convo.next();
                    },{},'default');
                }

                convo.on('end', function(convo) {
                    if ( convo.status === 'completed' ) {
                        this.reply(message, bot, convo);
                    }
                }.bind(this));

                convo.activate();
            }.bind(this));
        }.bind(this));
    }

    reply(message, bot, convo) {
        bot.api.users.info({user:message.user},function(err,response) {
            let displayName = response.user.profile.display_name;

            bot.say(
                {
                    text: this.getResponseText(convo, displayName),
                    channel: '#general'
                }
            );
        }.bind(this));
    }

    getResponseText(convo, displayName) {
        let response = convo.extractResponses();

        let responseText = displayName + '\n';

        for ( let question in response ) {
            responseText += '*' + question + '*\n';
            responseText += response[question] + '\n';
        }

        return responseText;
    }
}

module.exports = QBot;