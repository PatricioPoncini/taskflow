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
import { CustomError } from "../middlewares/common/httpException";

export const createTicket = async (req: Request, res: Response) => {
  const { title, description, status, userId, projectId } =
    req.body as CreateTicketReq;

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
  const { userId } = req.query as { userId: string };

  const tickets = await getMyTicketsService(userId);

  return res.status(200).json(tickets);
};

export const getMyTicketById = async (req: Request, res: Response) => {
  const { userId, ticketId } = req.query as {
    userId: string;
    ticketId: string;
  };

  const ticket = await getMyTicketByIdService(userId, ticketId);

  return res.status(200).json(ticket);
};

export const getMyTicketsByProject = async (req: Request, res: Response) => {
  const { userId, projectId } = req.query as {
    userId: string;
    projectId: string;
  };

  const tickets = await getMyTicketsByProjectService(userId, projectId);

  return res.status(200).json(tickets);
};

export const getMyTicketsByStatus = async (req: Request, res: Response) => {
  const { userId, projectId, status } = req.body as {
    userId: string;
    projectId: string;
    status: string;
  };

  const tickets = await filterTicketsByStatusService(userId, projectId, status);

  return res.status(200).json(tickets);
};

export const changeTicketStatus = async (req: Request, res: Response) => {
  const { userId, ticketId, status } = req.body as {
    userId: string;
    ticketId: string;
    status: string;
  };

  if (!(status in TICKET_STATUS)) {
    throw new CustomError(400, "Invalid status");
  }

  const ticket = await changeTicketStatusService(userId, ticketId, status);

  return res.status(200).json(ticket);
};

export const deleteMyTicket = async (req: Request, res: Response) => {
  const { userId, ticketId } = req.query as {
    userId: string;
    ticketId: string;
  };

  const ticket = await deleteMyTicketService(userId, ticketId);

  return res.status(200).json({ message: `Ticket '${ticket.title}' deleted` });
};
