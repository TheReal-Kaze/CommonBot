const express = require("express")
const app = express()
app.get("/", (req, res) => {
  res.send("hello")
})
app.listen(3000);

const { ifError } = require('assert')

const Discord = require('discord.js'),
  client = new Discord.Client({
    partials: ['MESSAGE', 'REACTION'],
    fetchAllMembers: true
  }),
  config = require('./config.json'),
  fs = require('fs')

client.login('Token here')
client.commands = new Discord.Collection()

fs.readdir('./commands', (err, files) => {
  if (err) throw err
  files.forEach(file => {
    if (!file.endsWith('.js')) return
    const command = require(`./commands/${file}`)
    client.commands.set(command.name, command)
  })
})

client.on('message', message => {
  if (message.type !== 'DEFAULT' || message.author.bot) return

  const args = message.content.trim().split(/ +/g)
  const commandName = args.shift().toLowerCase()
  if (!commandName.startsWith(config.prefix)) return
  const command = client.commands.get(commandName.slice(config.prefix.length))
  if (!command) return
  if (command.guildOnly && !message.guild || !message.guild) return message.channel.send("Tu es entrain de me Mp BANANE!")

  command.run(message, args, client)
})

//pong
client.on('message', message => {
  // If the message is "ping"
  if (message.content === 'ping') {
    // Send "pong" to the same channel
    message.channel.send('pongo');
  }
})




//monBail
client.on('message', message => {
  if (message.author.id === '352529919252889600' && message.content === "modding") { message.react('💎'); }


  if (message.channel.type === 'dm' && !message.author.bot) return message.channel.send("No nudes!")

})



  if (message.channel.id === '302623063898324992') {
    message.react('👍🏻');
    message.react('👎🏻');
    message.react('❤');
  }
})



client.on('ready', () => {

  const statuses = [
  
    `Dev : Kaze#1157`,
    `Modding ;)`

  ]

  let i = 0
  setInterval(() => {
    client.user.setActivity(statuses[i], { type: 'PLAYING' })
    i = ++i % statuses.length
  }, 1e4)

}),






  //VVVVVVVVVVVVVVVVVV
  client.on('messageReactionAdd', (reaction, user) => {
    if (!reaction.message.guild || user.bot) return
    const reactionRoleElem = config.reactionRole[reaction.message.id]
    if (!reactionRoleElem) return
    const prop = reaction.emoji.id ? 'id' : 'name'
    const emoji = reactionRoleElem.emojis.find(emoji => emoji[prop] === reaction.emoji[prop])
    if (emoji) reaction.message.guild.member(user).roles.add(emoji.roles)
    else reaction.users.remove(user)
  })

client.on('messageReactionRemove', (reaction, user) => {

  if (!reaction.message.guild || user.bot) return
  const reactionRoleElem = config.reactionRole[reaction.message.id]
  if (!reactionRoleElem || !reactionRoleElem.removable) return
  const prop = reaction.emoji.id ? 'id' : 'name'
  const emoji = reactionRoleElem.emojis.find(emoji => emoji[prop] === reaction.emoji[prop])
  if (emoji) reaction.message.guild.member(user).roles.remove(emoji.roles)
})





client.on('message', async message => {
  // Voice only works in guilds, if the message does not come from a guild,
  // we ignore it
  if (!message.guild) return;

  if (message.content === '!join') {
    // Only try to join the sender's voice channel if they are in one themselves
    if (message.member.voice.channel) {
      const connection = await message.member.voice.channel.join();
    } else {
      message.reply('You need to join a voice channel first!');
    }
  }
});
