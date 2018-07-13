const colors = require('colors');

// Socket implementation as a class
// This lets us wrap socket IO on the express server
class IO {
  constructor(http) {
    this.io = require('socket.io')(http);
    this.socket;
    this.userNumber = 0;
  }
  init() {
    this.io.on('connection', (socket) => {
      // Initialize the class global variable as the socket.
      this.socket = socket;
      // Update total number of users
      this.userNumber += 1;
      // Get the IP and Port of connection
      var address = socket.request.connection.remoteAddress;
      var port = socket.request.connection.remotePort;
      // Log the information
      console.log(`-New connection from ${address} : ${port}`.green);
      console.log(`Total Users: ${this.userNumber}`.cyan);
      // --------------------------------
      // HANDLING SOCKET RECEIVED EVENTS
      // --------------------------------
      // Simple message example
      socket.on('message', function(msg){
        console.log('message: ' + msg);
      });
      // Socket disconnect
      socket.on('disconnect', () => {
        // Dont forget bring the total users down
        this.userNumber--;
        console.log(`-Lost connection`.green);
        console.log(`Total Users: ${this.userNumber}`.cyan);
      });
    });
  }
  // --------------------------------
  // HANDLING SOCKET SEND EVENTS
  // --------------------------------
  // Send message from server to clients
  // Example: myIO.sendMessage("Hello from server");
  sendMessage(myMessage){
    this.socket.emit('message', myMessage);
  }
}

module.exports = IO
