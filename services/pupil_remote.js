var os = require('os');
var fs = require('fs');
var EventEmitter = require('events');

module.exports = {
  init: function() {
    var events = new EventEmitter();

    setInterval(function(){
      fs.readFile(os.homedir() + '/pisca.txt', 'utf8', function read(err, data) {
          if (err) {
              throw err;
          }
          var dados = JSON.parse(data);

          if (dados['timestamp'] != this.last_timestamp) {
            if (this.last_timestamp !== undefined)
              events.emit('blink', dados);
            this.last_timestamp = dados['timestamp'];
          }
      });
    }, 100);

    return events;
  }
};
