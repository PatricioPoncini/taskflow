import { Request, Response } from "express";
import { CreateTicketReq } from "../entities/types/Ticket";
import {
  createTicketService,
  getMyTicketsByProjectService,
  getMyTicketsService,
} from "../services/ticket.service";

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

export const getMyTicketsByProject = async (req: Request, res: Response) => {
  const { userId, projectId } = req.query as {
    userId: string;
    projectId: string;
  };

  const tickets = await getMyTicketsByProjectService(userId, projectId);

  return res.status(200).json(tickets);
};
