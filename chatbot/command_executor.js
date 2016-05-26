const xmpp = require('node-xmpp-client');
var command_interpreter = require('./command_interpreter.js');
var Stately = require('stately.js');
var redis = require('redis');
var redisClient = redis.createClient();
var orderStates = require('./states.js').orderStates;

var conn;

function command_executor(stanza){
  var request = command_interpreter(stanza);
  conn = this;
  var order;
  if (request){
    redisClient.hgetall(request.stanza.attrs.from, function(err, userData){
      if (null === userData){
        redisClient.hset(request.stanza.attrs.from, 'state', 'NEW')
        order = new Stately(orderStates, 'NEW');
      }
      else{
        order = new Stately(orderStates, userData.state);
      }
      var message = execute_command(request, order);
      redisClient.hset(request.stanza.attrs.from, 'state', order.getMachineState());
      send_message(request, message);
    });
  }
}

/*
  This block stores all the commands and their mapping functions
 */

function execute_command(request, order) {
    var commands = {
        "?": send_help_information,
        "man": send_help_information,
        "number": order.login,
        "otp": order.verify,
        "order": order.order,
        "address": order.selectAddress,
        "confirm": order.confirm,
        "restart": order.restart,
        "status": order.getMachineState()
    };
    val = commands[request.command];
    console.log(val);
    if(typeof val === "function") {
        return val(request);
    }
    else if(typeof val === "string") {
      return val;
    }
    return send_unknown_command_message(request);
}

function send_unknown_command_message(request) {
    message_body = 'Unknown command: "' + request.command + '". Type "man" for more information.';
    send_message(request, message_body);
}

function send_help_information(request) {
    var message_body = "Help text";
    send_message(request, message_body);
}

function send_message(request, message_body) {
    var elem = new xmpp.Element('message', { to: request.stanza.attrs.from, type: 'chat' })
                 .c('body').t(message_body);
    conn.send(elem);
    console.log('[message] SENT: ' + elem.up().toString());
}

module.exports = command_executor;
