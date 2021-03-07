const
  Discord = require("discord.js"),
  client = new Discord.Client()
//Komutlar Buranın Altına
var config ={
    prefix="o!",
    token="TOKEN_GİR"
}

client.on("message", async (message) => {
  try {
    var prefix = config.prefix
    if (message.author.bot) return;
    if (!message.content.startsWith(prefix)) return;
    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();
    var { JSON } = require("odies.database");
    var odiesDB = new JSON("odies");
    var yetkiliRol = await odiesDB.get(`${message.guild.id}.yetkiliRol`);
    var erkekRol = await odiesDB.get(`${message.guild.id}.erkekrol`);
    var kızRol = await odiesDB.get(`${message.guild.id}.kızrol`);
    var artıroller = await odiesDB.get(`${message.guild.id}.artıroller`);
    if (!artıroller) artıroller = [];
    if (command === "isim") {
      if (yetkiliRol === null || erkekRol === null || kızRol === null)
        return message.reply(
          "Kayıt sistemi düzgün ayarlanmamış. Ayarlamak için o?kayıt-yardım."
        );
      if (message.member.roles.cache.has(yetkiliRol)) {
        var user = message.mentions.members.first();
        if (user) {
          var isim = args.slice(1).join(" ");
          if (isim) {
            if (message.author.id === user.id)
              return message.channel.send(
                new Discord.MessageEmbed()
                  .setColor("RANDOM")
                  .setDescription(
                    `> ${message.author}, ${user} ismini ${isim} olarak ayarladı. Ama !? nasıl ....`
                  )
              );
            user
              .setNickname(isim)
              .then((e) => {
                return message.channel.send(
                  new Discord.MessageEmbed()
                    .setColor("RANDOM")
                    .setDescription(
                      `> ${message.author}, ${user} ismini ${isim} olarak ayarlandı`
                    )
                );
              })
              .catch((e) => {
                return message.channel.send(
                  new Discord.MessageEmbed()
                    .setColor("RANDOM")
                    .setDescription(`Gerekli yetkim bulunmuyor`)
                );
              });
          } else
            return message
              .reply("Bir isim belirtmelisin !")
              .then((x) => x.delete({ timeout: 5000 }));
        } else
          return message
            .reply("Bir kullanıcı belirtmelisin !")
            .then((x) => x.delete({ timeout: 5000 }));
      } else
        return message
          .reply("Gerekli yetkin bulunmuyor !")
          .then((x) => x.delete({ timeout: 5000 }));
    } else if (command === "e") {
      if (yetkiliRol === null || erkekRol === null || kızRol === null)
        return message.reply(
          "Kayıt sistemi düzgün ayarlanmamış. Ayarlamak için o?kayıt-yardım."
        );
      if (message.member.roles.cache.has(yetkiliRol)) {
        var user =
          message.mentions.members.first() ||
          message.guild.members.cache.get(args[0]);
        if (user) {
          if (message.author.id === user.id)
            return message.channel.send(
              new Discord.MessageEmbed()
                .setColor("RANDOM")
                .setDescription(
                  `> ${message.author}, ${user}'i başarıyla kayıt etti !. Ama !? nasıl ....`
                )
            );
          artıroller.push(erkekRol);
          user.roles
            .set(artıroller)
            .then((e) => {
              return message.channel.send(
                new Discord.MessageEmbed()
                  .setColor("RANDOM")
                  .setDescription(
                    `> ${message.author}, ${user}'i başarıyla kayıt etti !`
                  )
              );
            })
            .catch((e) => {
              return message.channel.send(
                new Discord.MessageEmbed()
                  .setColor("RANDOM")
                  .setDescription(`Gerekli yetkim bulunmuyor`)
              );
            });
        } else
          return message
            .reply("Bir kullanıcı belirtmelisin !")
            .then((x) => x.delete({ timeout: 5000 }));
      } else
        return message
          .reply("Gerekli yetkin bulunmuyor !")
          .then((x) => x.delete({ timeout: 5000 }));
    } else if (command === "k") {
      if (yetkiliRol === null || erkekRol === null || kızRol === null)
        return message.reply(
          "Kayıt sistemi düzgün ayarlanmamış. Ayarlamak için o?kayıt-yardım."
        );
      if (message.member.roles.cache.has(yetkiliRol)) {
        var user =
          message.mentions.members.first() ||
          message.guild.members.cache.get(args[0]);
        if (user) {
          if (message.author.id === user.id)
            return message.channel.send(
              new Discord.MessageEmbed()
                .setColor("RANDOM")
                .setDescription(
                  `> ${message.author}, ${user}'i başarıyla kayıt etti !. Ama !? nasıl ....`
                )
            );
          artıroller.push(kızRol);
          user.roles
            .set(artıroller)
            .then((e) => {
              return message.channel.send(
                new Discord.MessageEmbed()
                  .setColor("RANDOM")
                  .setDescription(
                    `> ${message.author}, ${user}'i başarıyla kayıt etti !`
                  )
              );
            })
            .catch((e) => {
              return message.channel.send(
                new Discord.MessageEmbed()
                  .setColor("RANDOM")
                  .setDescription(`Gerekli yetkim bulunmuyor`)
              );
            });
        } else
          return message
            .reply("Bir kullanıcı belirtmelisin !")
            .then((x) => x.delete({ timeout: 5000 }));
      } else
        return message
          .reply("Gerekli yetkin bulunmuyor !")
          .then((x) => x.delete({ timeout: 5000 }));
    } else if (command === "yetkili-rol") {
      if (!message.member.hasPermission("ADMINISTRATOR"))
        return message.reply("Yeterli yetkiniz bulunmamakta !");
      var role =
        message.mentions.roles.first() ||
        message.guild.roles.cache.get(args[0]);
      if (!role) return message.reply("Bir rol belirtmelisin !");
      odiesDB.set(`${message.guild.id}.yetkiliRol`, role.id);

      message.channel.send(
        new Discord.MessageEmbed()
          .setColor("RANDOM")
          .setDescription(`> Yetkili rolü başarıyla ${role} olarak ayarlandı !`)
      );
    } else if (command === "erkek-rol") {
      if (!message.member.hasPermission("ADMINISTRATOR"))
        return message.reply("Yeterli yetkiniz bulunmamakta !");
      var role =
        message.mentions.roles.first() ||
        message.guild.roles.cache.get(args[0]);
      if (!role) return message.reply("Bir rol belirtmelisin !");
      odiesDB.set(`${message.guild.id}.erkekrol`, role.id);

      message.channel.send(
        new Discord.MessageEmbed()
          .setColor("RANDOM")
          .setDescription(`> Erkek rolü başarıyla ${role} olarak ayarlandı !`)
      );
    } else if (command === "kız-rol") {
      if (!message.member.hasPermission("ADMINISTRATOR"))
        return message.reply("Yeterli yetkiniz bulunmamakta !");
      var role =
        message.mentions.roles.first() ||
        message.guild.roles.cache.get(args[0]);
      if (!role) return message.reply("Bir rol belirtmelisin !");
      odiesDB.set(`${message.guild.id}.kızrol`, role.id);
      message.channel.send(
        new Discord.MessageEmbed()
          .setColor("RANDOM")
          .setDescription(`> Kız rolü başarıyla ${role} olarak ayarlandı !`)
      );
    } else if (command === "artıroller") {
      if (args[0] === "ekle") {
        if (!message.member.hasPermission("ADMINISTRATOR"))
          return message.reply("Yeterli yetkiniz bulunmamakta !");
        var role =
          message.mentions.roles.first() ||
          message.guild.roles.cache.get(args[1]);
        if (!role) return message.reply("Bir rol belirtmelisin !");
        odiesDB.push(`${message.guild.id}.artıroller`, role.id);

        message.channel.send(
          new Discord.MessageEmbed()
            .setColor("RANDOM")
            .setDescription(`> ${role} artı rollere başarıyla eklendi !`)
        );
      } else if (args[0] === "sil") {
        if (!message.member.hasPermission("ADMINISTRATOR"))
          return message.reply("Yeterli yetkiniz bulunmamakta !");
        var role =
          message.mentions.roles.first() ||
          message.guild.roles.cache.get(args[1]);
        if (!role) return message.reply("Bir rol belirtmelisin !");
        odiesDB.unpush(`${message.guild.id}.artıroller`, role.id);

        message.channel.send(
          new Discord.MessageEmbed()
            .setColor("RANDOM")
            .setDescription(`> ${role} artı rollerden başarıyla silindi !`)
        );
      }
    } else if (command === "sıfırla") {
      if (!message.member.hasPermission("ADMINISTRATOR"))
        return message.reply("Yeterli yetkiniz bulunmamakta !");
      odiesDB.delete(`${message.guild.id}`);

      message.channel.send(
        new Discord.MessageEmbed()
          .setColor("RANDOM")
          .setDescription(`> Sunucu ayarları sıfırlandı !`)
      );
    }
  } catch (error) {
    message.reply("Bir iç hata oluştu : " + error);
    console.log(error);
  }
});

client.login(config.token);
