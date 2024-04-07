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
import { validateToken } from "../middlewares/auth";

const router = Router();

router.post("/create", validateToken, createTicket);

router.post("/myTicketsByStatus", validateToken, getMyTicketsByStatus);

router.get("/myTicketById", validateToken, getMyTicketById);

router.get("/myTickets", validateToken, getMyTickets);

router.get("/myTicketsByProject", validateToken, getMyTicketsByProject);

router.put("/changeStatus", validateToken, changeTicketStatus);

router.delete("/deleteTicket", validateToken, deleteMyTicket);

export default router;
