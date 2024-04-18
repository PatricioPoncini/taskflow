import Joi from "joi";
import { TICKET_STATUS, TicketStatus } from "../entities/types/Ticket";

export const createTicketSchema = Joi.object<{
  title: string;
  description: string;
  status: TicketStatus;
  projectId: string;
}>({
  title: Joi.string().min(5).required(),
  description: Joi.string().min(5).required(),
  status: Joi.string()
    .required()
    .valid(...Object.keys(TICKET_STATUS)) as Joi.Schema<TicketStatus>,
  projectId: Joi.string().required(),
});

export const getTicketByIdSchema = Joi.object<{ ticketId: string }>({
  ticketId: Joi.string().required(),
});

export const getMyTicketsByProjectSchema = Joi.object<{ projectId: string }>({
  projectId: Joi.string().required(),
});

export const getMyTicketsByStatusSchema = Joi.object<{
  projectId: string;
  status: TicketStatus;
}>({
  projectId: Joi.string().required(),
  status: Joi.string()
    .required()
    .valid(...Object.keys(TICKET_STATUS)) as Joi.Schema<TicketStatus>,
});

export const changeTicketStatusSchema = Joi.object<{
  ticketId: string;
  status: TicketStatus;
}>({
  ticketId: Joi.string().required(),
  status: Joi.string()
    .required()
    .valid(...Object.keys(TICKET_STATUS)) as Joi.Schema<TicketStatus>,
});

export const deleteMyTicketSchema = Joi.object<{ ticketId: string }>({
  ticketId: Joi.string().required(),
});
