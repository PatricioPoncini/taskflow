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
