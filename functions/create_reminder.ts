import { DefineFunction, Schema } from "deno-slack-sdk/mod.ts";

// Define a workflow that can pass the parameters for the Slack function

export const createReminder = DefineFunction({
  callback_id: "create_a_reminder",
  title: "Create a Reminder",
  source_file: "functions/mod.ts",
  input_parameters: {
    properties: {
      interactivity: {
        type: Schema.slack.types.interactivity,
      },
      message: {
        type: Schema.types.string,
        description: "The Reminder message",
      },
      time: {
        type: Schema.types.string,
        description: "Set Reminder time",
      },
    },
    required: [
      "interactivity",
      "message",
      "time",
    ],
  },
  output_parameters: {
    properties: {},
    required: [],
  },
});
