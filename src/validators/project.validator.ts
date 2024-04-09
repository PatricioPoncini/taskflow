import Joi from "joi";

export const createProjectSchema = Joi.object<{
  title: string;
  description: string;
}>({
  title: Joi.string().min(5).max(30).required(),
  description: Joi.string().min(5).required(),
});
