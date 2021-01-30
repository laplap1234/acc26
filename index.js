const Discord = require("discord.js");
const Client = new Discord.Client();
const fs = require("fs");
const request = require("request");
const Prefix = "!";
const Token = process.env.token;



Client.on("ready", function() {
  console.log("bot is Ready!\nBot Start: " + new Date().toLocaleString());
  setInterval(function() {
      var MemberCount = 0;
      Client.guilds.cache.forEach(function(guild) {
          MemberCount += guild.memberCount;
      });
      Client.user.setActivity(Client.guilds.cache.size + "서버운영, " + MemberCount + " 사람 [" + Prefix + "help]", { type: "WATCHING" });
  }, 10000);
});



Client.on('message', (message) => {
  let blacklisted = ["시발", "^ㅣ발" , "^^ㅣ발", " tlqkf", "tl발", "개세끼", "개새", "개섹", "시발롬", "ㅄ", "병신", "븅신", "애미", "ㄴㄱㅁ", "느금마", "니엄마", "니애미", "섹스", "보지", "자지", "ㅅㅅ", "섹수", "응니애미"]

  let foundInText = false;
  for (var i in blacklisted) { 
    if (message.content.toLowerCase().includes(blacklisted[i].toLowerCase())) foundInText = true
  }

  if (foundInText) {
      const user = message.author.id;
      const embed = new Discord.MessageEmbed()
      .setColor('#FF0000')
      .setDescription(`<@${user}> 욕하지 마라`);
      message.channel.send(embed)
}
}
);
 Client.on('message', (message) => {
  if(message.content == `주사위`) {
    const number = [
    "🎲1",
    "🎲2",
    "🎲3",
    "🎲4",
    "🎲5",
    "🎲6",
  ];

const Response = Math.floor(Math.random() * number.length);

message.channel.send(`${number[Response]}`)
}
  if(message.content.startsWith("투표")) {
      let args = message.content.split(" ") 
      let list = args[1].split("/") 
      let emojis = ["1️⃣", "2️⃣", "3️⃣", "4️⃣", "5️⃣"]
      let tempString = ""
      let temp = 0
      if(!args) message.reply("`!투표 [항목1/항목2/항목3] 시간(1초 이상)` 이 올바른 명령어 입니다.")
      if(!args[2] || args[2] < 1) message.reply("`!투표 [항목1/항목2/항목3] 시간(1초 이상)` 이 올바른 명령어 입니다.")
      if(list > 5) message.reply("항목은 최대 5개까지 가능합니다.")
      let embed = new Discord.MessageEmbed()
      embed.setTitle(`${message.member.displayName}님의 투표`)
          for(let i=0; i<list.length; i++) {
              temp += 1
              tempString += `**${temp}. ${list[i]}**\n`
          }
      embed.setDescription(tempString)
      embed.setFooter(`투표시간: ${args[2]}초`)
      console.log('전송')
      message.channel.send({ embed: embed }).then(msg => {
          for(let i=0; i<list.length; i++) {
              msg.react(emojis[i])
          }
          setTimeout(function() {
              msg.edit(`<@!${message.author.id}> 투표가 종료되었습니다.`, { embed: embed })
              console.log('종료')
          }, parseInt(args[2])*1000)
      })
  }
  if (message.content === '코로나') {
      let url = "https://apiv2.corona-live.com/stats.json"
      request(url, (error, response, body) => {
          let overview = JSON.parse(response.body).overview;
          overview = {
              total_confirmed_person: overview.confirmed[0],
              yesterday_confirmed_person: overview.confirmed[1], 
      
              current_confirmed_person: overview.current[0], 
              current_confirmed_person_diff: overview.current[1], 
          }
      
          let embed = new Discord.MessageEmbed()
          embed.setTitle('코로나 라이브 홈페이지')
          embed.setURL('https://corona-live.com')
          embed.setColor('#FF8000')
          embed.setDescription('코로나 정보입니다')
          embed.addField(`대한민국 총 확진자 수`, `${overview.total_confirmed_person}명`, true)
          embed.addField(`어제 확진자 수`, overview.yesterday_confirmed_person + `명`, true)
          embed.addField(`오늘 확진자 수`, overview.current_confirmed_person + `명`, true)
          message.channel.send(embed)
      
        })
      }
  if (message.content == "초대코드") {
    if (message.channel.type == "dm") {
      return message.reply("dm에서 사용할 수 없는 명령어 입니다.")
    }
    message.guild.channels.cache
      .get(message.channel.id)
      .createInvite({ maxAge: 0 }) 
      .then((invite) => {
        message.channel.send(invite.url)
      })
      .catch((err) => {
        if (err.code == 50013) {
          message.channel.send(`**${message.guild.channels.cache.get(message.channel.id).guild.name}** 채널 권한이 없어 초대코드 발행 실패`)
        }
        
        
        const commandFile = readdirSync(join(__dirname, "commands")).filter(file => file.endsWith("js"));

        for (const file of commandFile) {
          const command = require(join(__dirname, "commands", `${file}`));
          Client.commands.set(command.name, command);
        }


    


      
        })}})

           

Client.login(Token);