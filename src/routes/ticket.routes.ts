import { Router } from "express";
import {
  changeTicketStatus,
  createTicket,
  deleteMyTicket,
  getMyTicketById,
  getMyTickets,
  getMyTicketsByProject,
  getMyTicketsByStatus,
} from "../controllers/ticket.controller";

const router = Router();

router.post("/create", createTicket);

router.post("/myTicketsByStatus", getMyTicketsByStatus);

router.get("/myTicketById", getMyTicketById);

router.get("/myTickets", getMyTickets);

router.get("/myTicketsByProject", getMyTicketsByProject);

router.put("/changeStatus", changeTicketStatus);

router.delete("/deleteTicket", deleteMyTicket);

export default router;
