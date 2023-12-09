import { DefineWorkflow, Schema } from "deno-slack-sdk/mod.ts";
import { createReminderDefinition } from "../functions/create_reminder.ts";

export const reminderWorkflow = DefineWorkflow({
  callback_id: "reminder_workflow",
  title: "Create a Reminder",
  input_parameters: {
    required: [
      "interactivity",
      "reminderMessage",
      "reminderTime",
    ],
    properties: {
      interactivity: {
        type: Schema.slack.types.interactivity,
      },
      reminderMessage: {
        type: Schema.types.string,
        description: "Message for the Reminder",
      },
      reminderTime: {
        type: Schema.types.string,
        description: "When the reminder will occur",
      },
    },
  },
});

/**
 * For collecting input from users, we recommend the
 * built-in OpenForm function as a first step.
 * https://api.slack.com/automation/functions#open-a-form
 */
const inputForm = reminderWorkflow.addStep(
  Schema.slack.functions.OpenForm,
  {
    title: "Create a Reminder",
    interactivity: reminderWorkflow.inputs.interactivity,
    submit_label: "Create a Reminder",
    fields: {
      elements: [{
        name: "time",
        title: "When do you want to be reminded?",
        type: Schema.types.string,
      }],
      required: ["time"],
    },
  },
);

const reminderFunctionStep = reminderWorkflow.addStep(
  createReminderDefinition,
  {
    time: inputForm.outputs.fields.time,
  },
);

export default reminderWorkflow;
