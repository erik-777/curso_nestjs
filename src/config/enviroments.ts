import "dotenv/config";
import * as Joi from "joi";



interface EnviromentsVariable {
  SERVER_PORT: number;
  POSTGRES_HOST: string;
  POSTGRES_PORT: number;
  POSTGRES_USER: string;
  POSTGRES_PASSWORD: string;
  POSTGRES_DB: string
}


export const validateEnviromentVariables = Joi.object<EnviromentsVariable>({

  SERVER_PORT: Joi.number().required(),
  POSTGRES_HOST: Joi.string().required(),
  POSTGRES_PORT: Joi.number().required(),
  POSTGRES_USER: Joi.string().required(),
  POSTGRES_PASSWORD: Joi.string().required(),
  POSTGRES_DB: Joi.string().required(),



}).unknown(true);

const { error, value } = validateEnviromentVariables.validate(process.env);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

const envVar: EnviromentsVariable = value;

export const envs = {
  server_port: envVar.SERVER_PORT,
  database: {
    user: envVar.POSTGRES_USER,
    password: envVar.POSTGRES_PASSWORD,
    database: envVar.POSTGRES_DB,
    host: envVar.POSTGRES_HOST,
    port: envVar.POSTGRES_PORT
  }
}
