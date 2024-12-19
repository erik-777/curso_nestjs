import "dotenv/config";
import * as Joi from "joi";



interface EnviromentsVariable {

  POSTGRES_HOST: string;
  POSTGRES_PORT: number;
  POSTGRES_USER: string;
  POSTGRES_PASSWORD: string;
  POSTGRES_DB: string
  SERVER_PORT: number;
  SERVER_API: string
  JWT_SECRET: string
}


export const validateEnviromentVariables = Joi.object<EnviromentsVariable>({


  POSTGRES_HOST: Joi.string().required(),
  POSTGRES_PORT: Joi.number().required(),
  POSTGRES_USER: Joi.string().required(),
  POSTGRES_PASSWORD: Joi.string().required(),
  POSTGRES_DB: Joi.string().required(),
  SERVER_PORT: Joi.number().required(),
  SERVER_API: Joi.string().required(),
  JWT_SECRET: Joi.string().required()



}).unknown(true);

const { error, value } = validateEnviromentVariables.validate(process.env);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

const envVar: EnviromentsVariable = value;

export const envs = {
  server:{
    port: envVar.SERVER_PORT,
    api: envVar.SERVER_API
  },
  database: {
    user: envVar.POSTGRES_USER,
    password: envVar.POSTGRES_PASSWORD,
    database: envVar.POSTGRES_DB,
    host: envVar.POSTGRES_HOST,
    port: envVar.POSTGRES_PORT
  },
  jwt: {
    secret: envVar.JWT_SECRET
  }
}
