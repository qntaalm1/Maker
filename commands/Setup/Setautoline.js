const Discord = require ('discord.js')
const { MessageEmbed } = require("discord.js");
const { Database } = require("st.db")
const db = new Database("/database.json")


module.exports = {
  name: "set-autoline",
  aliases: ["",""],
  description: "", 
  usage: [""], 
  botPermission: [""], 
  authorPermission: ["ADMINISTRATOR"], 
  cooldowns: [], 
  ownerOnly: false,
  run: async (client, message, args, config) => {
    let channel = message.content.split(' ').slice(1)[0]

    const embed1 = new Discord.MessageEmbed()
    .setColor(`#ff0000`)
    .setDescription(`❌ __**Please Mention/ID Channel**__`)
    const embed2 = new Discord.MessageEmbed()
    .setColor(`#ff0000`)
    .setDescription(`❌ __**The channel must be Text Channel**__`)
    const embed3 = new Discord.MessageEmbed()
    .setColor(`YELLOW`)
    .setDescription(`❗ __**This is Auto line Channel Already!**__`)
    
    if (!channel) return message.reply({embeds: [embed1]});
    
    channel = message.mentions.channels.first() || message.guild.channels.cache.get(channel)
    
      
    
    if (channel.type !== 'GUILD_TEXT') return message.reply({embeds: [embed2]});
    
    const data = db.get(`autoline_${message.guild.id}`) || []
    
    if (data.filter(c => c === channel.id).map(c => c).length > 0) return message.reply({embeds: [embed3]});
    
        
    
    console.log(data.filter(c => c === channel.id).map(c=>c).length)
    
    data.push(channel.id)
    
    db.set(`autoline_${message.guild.id}`,data)
    
    message.reply(`Done ✅\nNew Autoline Channel: ${channel}`)
  } }
