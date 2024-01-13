import { Trigger } from "deno-slack-sdk/types.ts";
import {
  TriggerContextData,
  TriggerEventTypes,
  TriggerTypes,
} from "deno-slack-api/mod.ts";
import Workflow from "../workflows/workflow.ts";

const trigger: Trigger<typeof Workflow.definition> = {
  type: TriggerTypes.Event,
  name: "trigger",
  description: "trigger",
  workflow: `#/workflows/${Workflow.definition.callback_id}`,
  event: {
    event_type: TriggerEventTypes.MessagePosted,
    filter: {
      version: 1.0,
      root: {
        operator: "AND",
        inputs: [
          {
            operator: "NOT",
            inputs: [
              {
                statement: "{{data.user_id}} == null",
              }
            ]
          },
          {
            operator: "NOT",
            inputs: [
              {
                statement: "{{data.user_id}} == USLACKBOT",
              }
            ]
          },
        ],
      },
    },
    channel_ids: ["CXXXX", "CAAAA"],
  },
  inputs: {
    channel_id: {
      value: TriggerContextData.Event.MessagePosted.channel_id,
    },
    user_id: {
      value: TriggerContextData.Event.MessagePosted.user_id,
    },
    message_text: {
      value: TriggerContextData.Event.MessagePosted.text,
    },
    message_ts: {
      value: TriggerContextData.Event.MessagePosted.message_ts,
    },

  },
};

export default trigger;
