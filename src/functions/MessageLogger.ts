import { Client } from 'ecstar';
import {
  Message,
  TextChannel,
  WebhookMessageOptions,
  MessageEmbed,
} from 'discord.js';

type WebhookOptions = WebhookMessageOptions & { split?: false | undefined };

export class MessageLogger {
  constructor(public client: Client) {}
  async run(message: Message) {
    const webhookOptions: WebhookOptions = {
      username: message.author.tag,
      avatarURL: message.author.avatarURL() || '',
      disableMentions: 'all',
    };

    if (message.guild) {
      webhookOptions.embeds = [
        new MessageEmbed()
          .addField('User Tag', message.author.tag, true)
          .addField('User ID', message.author.id, true)
          .addField('Message URL', `[message URL](${message.url})`, true)
          .addField('Message ID', message.id, true)
          .addField('Channel name', message.channel, true)
          .setColor(message.member?.displayColor || 0x87909c)
          .setTimestamp(message.createdAt),
      ];
    } else if (message.channel.type === 'dm') {
      webhookOptions.embeds = [
        new MessageEmbed().setFooter('DM').setTimestamp(message.createdAt),
      ];
    }

    if (message.attachments) {
      webhookOptions.files = message.attachments.map(
        (attachment) => attachment.url
      );
    }

    const logChannel = this.client.channels.cache.get(
      this.client.config?.channel.messageLog
    ) as TextChannel;

    const webhook = (await logChannel.fetchWebhooks()).first();

    webhook?.send(message.content, webhookOptions);
  }
}
