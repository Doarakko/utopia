import { DefineWorkflow, Schema } from "deno-slack-sdk/mod.ts";
import { FunctionDefinition } from "../functions/function.ts";

const Workflow = DefineWorkflow({
  callback_id: "workflow",
  title: "workflow",
  description: "workflow",
  input_parameters: {
    properties: {
      channel_id: {
        type: Schema.slack.types.channel_id,
      },
      message_ts: {
        type: Schema.types.string,
      },
      user_id: {
        type: Schema.slack.types.user_id,
      },
      message_text: {
        type: Schema.types.string,
      },
    },
    required: ["channel_id", "message_text", "message_ts", "user_id"],
  },
});

Workflow.addStep(FunctionDefinition, {
  channel_id: Workflow.inputs.channel_id,
  message_ts: Workflow.inputs.message_ts,
  user_id: Workflow.inputs.user_id,
  message_text: Workflow.inputs.message_text,
});

export default Workflow;
