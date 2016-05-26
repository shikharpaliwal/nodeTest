const xmpp = require('node-xmpp-client');
const config = require('./config.js').settings;

function command_interpreter(stanza) {
    if('error' === stanza.attrs.type) {
        console.log('[error] ' + stanza.toString());
        return false;
    }
    else if(stanza.is('message')) {
        console.log('[message] RECV: ' + stanza.toString());
        return split_request(stanza);
    }
}

function split_request(stanza) {
    var message_body = stanza.getChildText('body');
    if(null !== message_body) {
        message_body = message_body.split(config.command_argument_separator);
        var command = message_body[0].trim().toLowerCase();
        return { "command" : command,
                 "argument": message_body[1] && message_body[1].trim(),
                 "stanza"  : stanza };
    }
    return false;
}

module.exports = command_interpreter;
