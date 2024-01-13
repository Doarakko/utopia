import { DefineFunction, Schema, SlackFunction } from "deno-slack-sdk/mod.ts";

export const FunctionDefinition = DefineFunction({
  callback_id: "function",
  title: "function",
  description: "function",
  source_file: "functions/function.ts",
  input_parameters: {
    properties: {
      channel_id: { type: Schema.types.string },
      user_id: { type: Schema.types.string },
      message_text: { type: Schema.types.string },
      message_ts: { type: Schema.types.string },
    },
    required: ["channel_id", "message_ts", "user_id", "message_text"],
  },
});

export default SlackFunction(
  FunctionDefinition,
  async ({ inputs, client }) => {
    const message_text = getMessageText(inputs.message_text);
    if (message_text.length == 0) {
      return { outputs: {} };
    }

    const permalinkRes = await client.chat.getPermalink({
      channel: inputs.channel_id,
      message_ts: inputs.message_ts,
    });
    const permalink = permalinkRes.permalink;

    const usersRes = await client.users.profile.get({ user: inputs.user_id });
    const iconImageUrl = usersRes.profile?.image_original || '';
    const displayName = usersRes.profile?.display_name || '';

    await client.chat.postMessage({
      channel: getPostChannelId(inputs.channel_id),
      text: `<${permalink}|${message_text}>`,
      icon_url: iconImageUrl,
      username: displayName,
      unfurl_links: false,
      unfurl_media: false,
    });

    return { outputs: {} };
  },
);

function getPostChannelId(channel_id: string): string {
  switch (channel_id) {
    case "CXXXX":
      return "CYYYY";
    case "CAAAA":
      return "CBBBB";
    default:
      throw new Error(`Unknown channel_id: ${channel_id}`);
  }
}

function getMessageText(message_text: string): string {
  return message_text
  .replace(/<@.+>/g, '')
  .replace(/<!here>/g, '@here')
  .replace(/<!channel>/g, '@channel')
  .replace(/<https?:\/\/[-_.!~*'()a-zA-Z0-9;/?:@&=+$,%#]+>/g, '')
  .replace(/\n/g, ' ');
}
