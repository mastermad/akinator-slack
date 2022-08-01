const { Aki } = require('aki-api')

module.exports = class Akinator {
    constructor(region = 'en') {
        this.api = new Aki({ region })
    }

    get answers() {
        return this.api.answers
    }

    get question() {
        return this.api.question
    }

    get score() {
        return this.api.currentStep
    }

    get ended() {
        return this.api.progress >= 80 || this.api.currentStep >= 88
    }

    async start() {
        await this.api.start()
    }

    async stop() {
        await this.api.win()
    }

    async guess(answer) {
        await this.api.step(answer)
    }

    get embed() {
        if (this.ended) {
            const someone = this.answers[0]

            let result = { blocks: [
                {
                    "type": "header",
                    "text": {
                        "type": "plain_text",
                        "text": `${someone.name} \n${someone.description}`
                    }
                },
                {
                    "type": "divider"
                },
                {
                    "type": "image",
                    "image_url": someone.absolute_picture_path,
                    "alt_text": someone.name
                },
                {
                    "type": "divider"
                },
                {
                    "type": "actions",
                    "elements": [
                        {
                            "type": "button",
                            "text": {
                                "type": "plain_text",
                                "text": "Re-Start the game?",
                                "emoji": true
                            },
                            "value": "button_click",
                            "action_id": "button_click"
                        }
                    ]
                }
            ] };

            return result;
        }

         return { blocks: [
                {
                    "type": "section",
                    "text": {
                        "type": "mrkdwn",
                        "text": `${this.score + 1}. ${this.question}`
                    }
                },
                {
                    "type": "divider"
                },
                {
                    "type": "section",
                    "text": {
                        "type": "mrkdwn",
                        "text": "You have 30 seconds to answer."
                    }
                }] };
    
    }

    get component() {

        let row = {
          "blocks": [
              {
                  "type": "header",
                  "text": {
                      "type": "plain_text",
                      "text": this.api.question,
                      "emoji": true
                  }
              },
              {
                  "type": "actions",
                  "elements": []
              }
          ]
      }

      const buttons = this.answers.map((answer, index) => {
            row.blocks[1].elements.push({
                "type": "button",
                "text": {
                    "type": "plain_text",
                    "emoji": true,
                    "text": answer
                },
                "style": "primary",
                "value": "click_me_" + index,
                "action_id": "click_me_" + index,
            });
        })
        return row
    }
}
