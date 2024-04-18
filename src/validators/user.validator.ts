import Joi from "joi";

interface Hola {}

export const createUserSchema = Joi.object<{
  firstname: string;
  lastname: string;
  password: string;
  email: string;
}>({
  firstname: Joi.string().min(5).max(30).required(),
  lastname: Joi.string().min(5).max(30).required(),
  password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")).required(),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net"] },
    })
    .required(),
});

export const loginUserSchema = Joi.object<{
  username: string;
  password: string;
}>({
  username: Joi.string().required(),
  password: Joi.string().required(),
});

export const handleUserToProjectSchema = Joi.object<{
  userId: string;
  ownerProjectId: string;
  projectId: string;
}>({
  userId: Joi.string().required(),
  ownerProjectId: Joi.string().required(),
  projectId: Joi.string().required(),
});
