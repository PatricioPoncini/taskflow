import { Router } from "express";
import {
  createTicket,
  getMyTickets,
  getMyTicketsByProject,
} from "../controllers/ticket.controller";

const router = Router();

router.post("/create", createTicket);

router.get("/myTickets", getMyTickets);

router.get("/myTicketsByProject", getMyTicketsByProject);

export default router;
