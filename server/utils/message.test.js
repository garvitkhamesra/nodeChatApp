var expect = require('expect');
var {generateMessage} = require('./message');
describe('generateMessage',()=>{
    it('should generate correct message',()=>{
        var from = "Garvit";
        var text = 'Hi there';
        var message = generateMessage(from,text);

        expect(message.createdAt).toBeA('number');
        expect(message).toInclude({from,text});
    });
});