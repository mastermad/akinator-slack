const { App } = require("@slack/bolt");
const config = require("dotenv").config();
const Akinator = require('./akinator.js');

// local variable for game
var game;

// Initializes your app with your bot token and signing secret
const app = new App({
    token: process.env.SLACK_BOT_TOKEN,
    signingSecret: process.env.SLACK_SIGNING_SECRET,
    socketMode:true, // enable the following to use socket mode
    appToken: process.env.APP_TOKEN
});

app.command("/start", async ({ command, ack, say }) => {
    try {
        // Acknowledge the action
        await ack();

        // send "start the game" button
        await say({
            "blocks": [
                {
                    "type": "actions",
                    "elements": [
                        {
                            "type": "button",
                            "text": {
                                "type": "plain_text",
                                "text": "Start the game",
                                "emoji": true
                            },
                            "value": "start_button",
                            "action_id": "start_button"
                        }
                    ]
                }
            ]
        });

    } catch (error) {
      console.error(error);
    }
});

app.command("/stop", async ({ command, ack, say }) => {
    try {
        // Acknowledge the action
        await ack();

        game ? say("Game was stopped") : say("Game is already stopped");

    } catch (error) {
      console.error(error);
    }
});

app.action('start_button', async ({ body, client, ack, say }) => {
        // Acknowledge the action
        await ack();

        game = new Akinator('en')

        await game.start()
        
        await  say(game.component)
});

app.action('click_me_0', async ({ body, client, ack, say }) => {
    handleInteraction(0, ack, say);
});

app.action('click_me_1', async ({ body, client, ack, say }) => {
    handleInteraction(1, ack, say);
});

app.action('click_me_2', async ({ body, client, ack, say }) => {
    handleInteraction(2, ack, say);
});

app.action('click_me_3', async ({ body, client, ack, say }) => {
    handleInteraction(3, ack, say);
});

app.action('click_me_4', async ({ body, client, ack, say }) => {
    handleInteraction(4, ack, say);
});

handleInteraction = async function (index, ack, say) {
    // Acknowledge the action
    await ack();

    await game.guess(index);

    if(!game.ended){
        await  say(game.component)
    } else {
        await game.stop()
        await  say(game.embed)
    }
};

(async () => {
  const port = 3000
  await app.start(process.env.PORT || port);
  console.log(`⚡️ Akinator Slack app is running on port ${port}!`);
})();