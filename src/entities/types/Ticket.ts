import { Schema } from "mongoose";

export const TICKET_STATUS = {
  TO_DO: "TO_DO",
  IN_PROCESS: "IN_PROCESS",
  COMPLETED: "COMPLETED",
} as const;

export type TicketStatus = keyof typeof TICKET_STATUS;

export interface Ticket {
  title: string;
  description: string;
  status: TicketStatus;
  assignee: Schema.Types.ObjectId;
  project: Schema.Types.ObjectId;
}

export interface CreateTicketReq {
  title: string;
  description: string;
  status: string;
  userId: string;
  projectId: string;
}
