import { Schema, Types, model } from "mongoose";
import { TICKET_STATUS, Ticket } from "./types/Ticket";

const schema = new Schema<Ticket>({
  title: { type: String, required: true },
  description: { type: String, required: false, default: "" },
  status: {
    type: String,
    enum: Object.values(TICKET_STATUS),
    required: true,
    default: TICKET_STATUS.TO_DO,
  },
  assignee: { type: Types.ObjectId, ref: "user", required: true },
  project: { type: Types.ObjectId, ref: "project", required: true },
});

export const TicketModel = model<Ticket>("ticket", schema);
