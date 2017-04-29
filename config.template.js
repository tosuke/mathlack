module.exports = {
  // slack access token
  slack_token: "",
  // outgoing webhook token
  webhook_token: "",
  // prefix of message you need(you must set same to webhook settings)
  keywords: [
    "math:"
  ],
  // size of image
  size: 60,
  // max message length
  max_length: 100,
  // bot user settings(see https://api.slack.com/methods/chat.postMessage)
  user_persona: {
    username: "mathlack bot"
  }
}