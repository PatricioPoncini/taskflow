import { Request, Response } from "express";
import { CreateTicketReq, TICKET_STATUS } from "../entities/types/Ticket";
import {
  changeTicketStatusService,
  createTicketService,
  deleteMyTicketService,
  filterTicketsByStatusService,
  getMyTicketByIdService,
  getMyTicketsByProjectService,
  getMyTicketsService,
} from "../services/ticket.service";
import { CustomError } from "../middlewares/common/customError";
import {
  changeTicketStatusSchema,
  createTicketSchema,
  deleteMyTicketSchema,
  getMyTicketsByProjectSchema,
  getMyTicketsByStatusSchema,
  getTicketByIdSchema,
} from "../validators/ticket.validator";

export const createTicket = async (req: Request, res: Response) => {
  const { title, description, status, projectId } = req.body as CreateTicketReq;
  await createTicketSchema.validateAsync(req.body);
  const userId = req.userId;

  const ticket = await createTicketService(
    title,
    description,
    status,
    userId,
    projectId
  );

  return res.status(201).json(ticket);
};

export const getMyTickets = async (req: Request, res: Response) => {
  const userId = req.userId;

  const tickets = await getMyTicketsService(userId);

  return res.status(200).json(tickets);
};

export const getMyTicketById = async (req: Request, res: Response) => {
  const { ticketId } = req.query as {
    ticketId: string;
  };
  await getTicketByIdSchema.validateAsync(req.body);
  const userId = req.userId;

  const ticket = await getMyTicketByIdService(userId, ticketId);

  return res.status(200).json(ticket);
};

export const getMyTicketsByProject = async (req: Request, res: Response) => {
  const { projectId } = req.query as {
    projectId: string;
  };
  await getMyTicketsByProjectSchema.validateAsync(req.body);
  const userId = req.userId;

  const tickets = await getMyTicketsByProjectService(userId, projectId);

  return res.status(200).json(tickets);
};

export const getMyTicketsByStatus = async (req: Request, res: Response) => {
  const { projectId, status } = req.body as {
    projectId: string;
    status: string;
  };
  await getMyTicketsByStatusSchema.validateAsync(req.body);
  const userId = req.userId;

  const tickets = await filterTicketsByStatusService(userId, projectId, status);

  return res.status(200).json(tickets);
};

export const changeTicketStatus = async (req: Request, res: Response) => {
  const { ticketId, status } = req.body as {
    ticketId: string;
    status: string;
  };
  await changeTicketStatusSchema.validateAsync(req.body);
  const userId = req.userId;

  if (!(status in TICKET_STATUS)) {
    throw new CustomError(400, "Invalid status");
  }

  const ticket = await changeTicketStatusService(userId, ticketId, status);

  return res.status(200).json(ticket);
};

export const deleteMyTicket = async (req: Request, res: Response) => {
  const { ticketId } = req.query as {
    ticketId: string;
  };
  await deleteMyTicketSchema.validateAsync(req.body);
  const userId = req.userId;

  const ticket = await deleteMyTicketService(userId, ticketId);

  return res.status(200).json({ message: `Ticket '${ticket.title}' deleted` });
};
