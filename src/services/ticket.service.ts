import { ProjectModel } from "../entities/Project";
import { TicketModel } from "../entities/Ticket";
import { UserModel } from "../entities/User";
import { CustomError } from "../middlewares/common/httpException";

export const createTicketService = async (
  title: string,
  description: string,
  status: string,
  userId: string,
  projectId: string
) => {
  const assignee = await UserModel.findById(userId);
  const project = await ProjectModel.findById(projectId);

  if (!assignee) {
    throw new CustomError(404, "User not found");
  }

  if (!project) {
    throw new CustomError(404, "Project not found");
  }

  const newTicket = await TicketModel.create(
    [
      {
        title,
        description,
        status,
        assignee,
        project,
      },
    ],
    { new: true }
  );

  return newTicket[0];
};

export const getMyTicketsService = async (userId: string) => {
  const tickets = await TicketModel.find({ assignee: userId })
    .select("-assignee")
    .populate({ path: "project", select: "title" });

  if (tickets.length === 0) {
    throw new CustomError(404, "Tickets not found");
  }

  return tickets;
};

export const getMyTicketByIdService = async (
  userId: string,
  ticketId: string
) => {
  const ticket = await TicketModel.findOne({ _id: ticketId, assignee: userId });

  if (!ticket) {
    throw new CustomError(404, "Ticket not found");
  }

  return ticket;
};

export const getMyTicketsByProjectService = async (
  userId: string,
  projectId: string
) => {
  const tickets = await TicketModel.find({
    assignee: userId,
    project: projectId,
  }).select("-assignee");

  if (tickets.length === 0) {
    throw new CustomError(404, "Tickets not found");
  }

  return tickets;
};

export const filterTicketsByStatusService = async (
  userId: string,
  projectId: string,
  status: string
) => {
  const tickets = await TicketModel.find({
    assignee: userId,
    project: projectId,
    status,
  });

  if (tickets.length === 0) {
    throw new CustomError(404, `Tickets with the status ${status} not found`);
  }

  return tickets;
};

export const changeTicketStatusService = async (
  userId: string,
  ticketId: string,
  status: string
) => {
  const ticket = await TicketModel.findOneAndUpdate(
    {
      assignee: userId,
      _id: ticketId,
    },
    { status },
    { new: true }
  );

  if (!ticket) {
    throw new CustomError(404, "Ticket not found");
  }

  return ticket;
};

export const deleteMyTicketService = async (
  userId: string,
  ticketId: string
) => {
  const ticket = await TicketModel.findOneAndDelete({
    _id: ticketId,
    assignee: userId,
  });

  if (!ticket) {
    throw new CustomError(404, "Ticket not found or already deleted");
  }

  return ticket;
};
