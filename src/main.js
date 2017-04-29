import * as config from "./config"
import * as slack from "./slack"

global.test = () => {
  doPost({
    parameter: {
      token: config.webhook_token,
      text: "math: e^{i \\pi}=-1",
      channel_id: "C44HLB883",
      user_name: "tosuke"
    }
  });
}

/**
 * webhook entry point
 * @param {*} e - parameters
 * @return {void}
 */
global.doPost = (e) => {
  const params = e.parameter;
  if(!isValidToken(params.token)) {
    Logger.log("invalid token");
  }

  if(!isValidMessage(params.text)) return;

  slack.replyMessage(params, params.text);
}


/**
 * validate webhook token
 * @param {string} token
 * @return {boolean}
 */
function isValidToken(token) {
  return token === config.webhook_token;
}

/**
 * validate message
 * @param {string} message
 * @return {boolean} 
 */
function isValidMessage(message) {
  return config.keywords
          .map(a => message.trim().startsWith(a))
          .reduce((a, b) => a || b, false);
}