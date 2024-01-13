import { Manifest } from "deno-slack-sdk/mod.ts";
import Workflow from "./workflows/workflow.ts";

export default Manifest({
  name: "utopia",
  description: "Post only human messages to another channel",
  icon: "assets/icon.png",
  functions: [],
  workflows: [Workflow],
  outgoingDomains: [],
  botScopes: [
    "groups:history",
    "channels:history",
    "chat:write",
    "chat:write.public",
    'chat:write.customize',
    "users.profile:read",
  ],
});
