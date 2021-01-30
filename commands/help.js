const pagination = require('discord.js-pagination');
const Discord = require('discord.js');
const prefix = "!";
module.exports = {
    name: "도움말",
    description: "The help command, what do you expect?",
    usage: "",
    aliases: ["help", "도움말", "명령어"],

    async run (client, message, args){

        const page1 = new Discord.MessageEmbed()
        .setTitle('PAGE 1')
        .addField(`${prefix}도움말`, '도움말을 표시합니다')
        .addField(`${prefix}젠도움말 `, '젠도움말을 표시합니다')
        .addField(`${prefix}청소`, '메시지를 삭제합니다')
        .addField(`${prefix}ping`, '현재 핑을 표시합니다')
        .setTimestamp()

        const page2 = new Discord.MessageEmbed()
        .setTitle('PAGE 2')
        .addField(`${prefix}코로나`, '코로나 현황을 표시합니다')
        .addField(`${prefix}투표`, '투표를 합니다')
        .addField(`${prefix}서버상태 `, '현재 서버상태가 표시됩니다')
        .addField(`${prefix}유튜브`, '관리자 유튜브로 가집니다')
        .setTimestamp()

        const page3 = new Discord.MessageEmbed()
        .setTitle('PAGE 3')
        .addField(`${prefix}전체공지`, 'DM으로 전체공지를 보냅니다')
        .addField(`${prefix}전체공지2`, 'DM으로 전체공지를 embed 형식으로 보냅니다')
        .addField(`${prefix}초대코드`, '해당 채널의 초대 코드를 표시합니다')
        .addField(`${prefix}초대코드2`, '봇이 들어가있는 모든 서버에 초대 코드를 표시합니다')
        .setTimestamp()

        const pages = [
                page1,
                page2,
                page3
        ]

        const emojiList = ["⏪", "⏩"];

        const timeout = '240000';

        pagination(message, pages, emojiList, timeout)
    }
}