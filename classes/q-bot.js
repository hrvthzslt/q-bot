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
        for ( let i in this.questions ) {
            this.slackController.hears(this.questions[i].trigger, ['direct_message'], function(bot, message) {
                bot.createConversation(message, function (err, convo) {

                    for ( let q in this.questions[i].questions ) {
                        convo.addQuestion(this.questions[i].questions[q],function(response,convo) {
                            convo.next();
                        },{},'default');
                    }

                    convo.on('end', function(convo) {
                        if ( convo.status === 'completed' ) {
                            bot.say({
                                text: this.questions[i].messageEnd,
                                channel: message.user
                            });
                            this.reply(message, bot, convo, this.questions[i].outputChannel);
                        }
                    }.bind(this));

                    convo.activate();
                }.bind(this));
            }.bind(this));
        }
    }

    reply(message, bot, convo, outputChannel) {
        console.log(outputChannel);
        bot.api.users.info({user:message.user},function(err,response) {
            let displayName = response.user.profile.display_name;

            bot.say(
                {
                    text: this.getResponseText(convo, displayName),
                    channel: outputChannel
                }
            );
        }.bind(this));
    }

    getResponseText(convo, displayName) {
        let response = convo.extractResponses();

        let responseText = displayName + '\n';

        responseText += '>>>';

        for ( let question in response ) {
            responseText += '*' + question + '*\n';
            responseText += response[question] + '\n';
        }

        return responseText;
    }
}

module.exports = QBot;