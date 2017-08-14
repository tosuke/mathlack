import config from './config'

/**
 * post message to channel
 * @param {string} channel_id 
 * @param {string} message
 * @param {object} opt = {}
 * @return {void} 
 */
export function postMessage(channel_id, message, opt = {}) {
  const slackApp = SlackApp.create(config.slack_token)
  const conf = Object.assign(opt, config.user_persona)
  slackApp.chatPostMessage(channel_id, message, conf)
}


/**
 * reply message to replyee
 * @param {object} replyee 
 * @param {string} message 
 * @param {object} opt = {}
 * @return {void} 
 */
export function replyMessage(replyee, message, opt = {}) {
  message = `<@${replyee.user_name}> ${message}`
  postMessage(replyee.channel_id, message, opt)
}


/**
 * reply message by thread to replyee
 * @param {object} replyee 
 * @param {string} message
 * @param {boolean} broadcast
 * @param {object} opt = {}
 * @return {void}
 */
export function replyMessageByThread(replyee, message, broadcast = true, opt = {}) {
  opt = Object.assign(opt, {
    reply_broadcast: broadcast,
    thread_ts: replyee.timestamp
  })
  replyMessage(replyee, message, opt)
}