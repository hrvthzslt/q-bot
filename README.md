# QBot

A very simple questionnaire slackbot

## Getting Started

### Prerequisites

You will need slack account, and you will need to add a custom bot to your team (https://api.slack.com/custom-integrations/bot-users).
You'll also need npm and nodejs to run the server.

### Installing

Provide a .env file with a key TOKEN which stands for you custom bot token (https://get.slack.help/hc/en-us/articles/215770388-Create-and-regenerate-API-tokens), for simplicity sake, there is a .env.example file in the project you can rename and fill it.

```
TOKEN=xoxb-*************************************
```

You find the questions in config/questions.json, there are examples for providing a look at the format. "trigger" stands for the text you have to write to the bot in private message to trigger the assigned questions. The bot will say the "endMessage" tho the answering user when there are no more questions and say the answers in the configured channel. "outputChannel"  is the channel where the questions and the users answers with their display name will be shown, but you must invite your custom bot to the channel, if you want to see this output!

```json
[
  {
    "trigger": "existential crisis",
    "outputChannel": "#general",
    "questions": [
      "What is the meaning of life?",
      "But, really?"
    ],
    "messageEnd": "Thank you for your answers!"
  },
  {
    "trigger": "hello",
    "outputChannel": "#general",
    "questions": [
      "How are you?"
    ],
    "messageEnd": "Well... ok."
  }
]

```

Now you only need to install the dependencies and run the server, the example will show the most straightforward way, it can be done otherwise depending on the environment

```
npm install
node app.js
```

## Built With

* [Botkit](https://github.com/howdyai/botkit/blob/master/docs/readme.md)
