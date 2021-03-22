const PubNub = require('pubnub');

const credentials ={
    publishKey: "pub-c-0f61e70c-9bde-4f0e-90c5-4ab611bb73b5",
    subscribeKey: "sub-c-62e1c98a-886f-11eb-8ea8-a61585f8230a",
    secretKey: "sec-c-NzRjNDBhM2YtOTVjYy00NjdmLWE3ZjAtNmQyNjVkNjkwYTc4"
};

const CHANNELS = {
    TEST: 'TEST',
    BLOCKCHAIN: 'BLOCKCHAIN'
};   

class PubSub{
    constructor({ blockchain}){
        this.blockchain = blockchain;
        this.pubnub = new PubNub(credentials);

        this.pubnub.subscribe({ channels: Object.values(CHANNELS)});

        this.pubnub.addListener(this.listener( ));
    }

    broadcastChain() {
        this.publish({
          channel: CHANNELS.BLOCKCHAIN,
          message: JSON.stringify(this.blockchain.chain)
        });
      }

    subscribeToChannels() {
        this.pubnub.subscribe({
          channels: [Object.values(CHANNELS)]
        });
      }

    listener(){
        return{
                message: messageObject => {
                    const { channel, message} = messageObject;

                    console.log(`Message received. Channel: ${channel}. Message: ${message}`);
                    const parsedMessage = JSON.parse(message);

                    if(channel == CHANNELS.BLOCKCHAIN){
                        this.blockchain.replaceChain(parsedMessage);
                    }
                }
            };

        }

    publish({channel, message}){
        this.pubnub.publish({channel, message});
        //this.subscriber.Unsubscribe(channel, () => {
         //   , () => {
          //      this.subscriber.subscribe(channel);
         //   });
            //});
    }
}



module.exports = PubSub;