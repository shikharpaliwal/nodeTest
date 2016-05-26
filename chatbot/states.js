var orderStates = {
    'NEW': {
        login: function () {
            message = "Please enter the OTP sent to provided number (otp: <received_otp>)";
            return [this.LOGIN, message];
        }
    },
    'LOGIN': {
        verify: function () {
            message = "Hi Rahul, Welcome to TinyOwl foodchat.\n\n";
            message += "We have the following items in menu today:\n";
            message += "I1: Dal Makhani with Paratha\n";
            message += "I2: Neer Dosa with Tomato Chutney\n";
            message += "I3: Watermelon juice\n\n";
            message += "What would you like to have ? (order: 2 I1, 1 I3)";
            return [this.VERIFIED, message];
        },
        restart: function() {
            return this.NEW;
        }
    },
    'VERIFIED': {
        order: function () {
            message = "Where would you like to have your order delivered ?\n\n";
            message += "1. A-102 TinyOwl Office, Supreme Business Park, Hiranandani\n\n";
            message += "2. I-1304 Raheja Vistas, Raheja Vihar, Chandivali\n\n";
            message += "(address: 2)"
            return [this.ORDERED, message];
        },
        restart: function(){

        }
    },
    'ORDERED': {
        selectAddress: function(){
          message = "Type \"confirm\" to place order or \"restart\" to start again";
          return [this.ADDRESS_SELECTED, message];
        },
        restart: function () {
            return this.VERIFIED;
        }
    },
    'ADDRESS_SELECTED': {
        confirm: function () {
          message = "Thank you for placing order with TinyOwl!";
          return [this.NEW, message];
        },
        restart: function () {
            return this.VERIFIED;
        }
    }
};

orderStates.onenterNEW = function (event, oldState, newState) {
  console.log('working1....');
  message = "Please enter your number (number: <your number>)";
}

exports.orderStates = orderStates;
