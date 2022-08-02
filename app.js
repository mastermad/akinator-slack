const { App } = require("@slack/bolt");
const config = require("dotenv").config();
const Akinator = require('./Akinator.js');
var game = null;

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
                            "value": "button_click",
                            "action_id": "button_click"
                        }
                    ]
                }
            ]
        });

    } catch (error) {
      console.error(error);
    }
});

app.action('button_click', async ({ body, client, ack, say }) => {
        // Acknowledge the action
        await ack();

        game = new Akinator('en')

        await game.start()
        
        await  say(game.component)
});

app.action('click_me_0', async ({ body, client, ack, say }) => {
    // Acknowledge the action
    await ack();

    await game.guess(0);
    
    if(!game.ended){
        await  say(game.component)
    } else {
        await game.stop()
        await  say(game.embed)
    }
});

app.action('click_me_1', async ({ body, client, ack, say }) => {
    // Acknowledge the action
    await ack();

    await game.guess(1);
    
    if(!game.ended){
        await  say(game.component)
    } else {
        await game.stop()
        await  say(game.embed)
    }
});

app.action('click_me_2', async ({ body, client, ack, say }) => {
    // Acknowledge the action
    await ack();

    await game.guess(2);
    
    if(!game.ended){
        await  say(game.component)
    } else {
        await game.stop()
        await  say(game.embed)
    }
});

app.action('click_me_3', async ({ body, client, ack, say }) => {
    // Acknowledge the action
    await ack();

    await game.guess(3);
    
    if(!game.ended){
        await  say(game.component)
    } else {
        await game.stop()
        await  say(game.embed)
    }
});

app.action('click_me_4', async ({ body, client, ack, say }) => {
    // Acknowledge the action
    await ack();

    await game.guess(4);

    if(!game.ended){
        await  say(game.component)
    } else {
        await game.stop()
        await  say(game.embed)
    }
    
});

(async () => {
  const port = 3000
  await app.start(process.env.PORT || port);
  console.log(`⚡️ Akinator Slack app is running on port ${port}!`);
})();