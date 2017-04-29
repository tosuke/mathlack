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

  const message = latexToMessage(trimMessage(params.text));
  slack.replyMessageByThread(params, message);
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
  if(message.length > 100) return;
  message = message.trim();
  return config.keywords
          .map(a => message.startsWith(a))
          .reduce((a, b) => a || b, false);
}

/**
 * convert latex to message
 * @param {string} latex
 * @return {string}
 */
function latexToMessage(latex) {
  return `https://chart.apis.google.com/chart?cht=tx&chs=${config.size}&chl=${encodeURIComponent(latex)}`;
}

/**
 * triming message
 * @param {string} message
 * @return {string} 
 */
function trimMessage(message) {
  message = message.trim();
  const prefix = config.keywords.filter(a => message.startsWith(a))[0];
  return message
          .replace(prefix, "")
          .replace(/&amp;/g, "&")
          .replace(/&lt;/g, "<")
          .replace(/&gt;/g, ">")
          .trim();
}