var expect = require('expect')

var {generateMessage, generateLocationMessage} =  require('./message')
describe('generateMessage',()=>{
    it('should generate correct message object',()=>{
        var from = 'bryan'
        var text = 'some message'
        var message = generateMessage(from, text)

        expect(message.createdAt).toBeA('number')
        expect(message).toInclude({
            from,
            text
        })
    })
})

describe('generateLocationMessage',()=>{
    it('should generate correct location object',()=>{
        var from = 'bryan'
        var url = 'https://www.google.com/maps?q=27.4321603,-99.53796949999999'
        var message = generateLocationMessage(from, 27.4321603, -99.53796949999999)

        expect(message.createdAt).toBeA('number')
        expect(message).toInclude({
            from,
            url
        })
        expect(message.url).toEqual(url)
    })
})