import "dotenv/config";
import * as Joi from "joi";



interface EnviromentsVariable {
  SERVER_PORT: number;
}


export const validateEnviromentVariables = Joi.object<EnviromentsVariable>({

  SERVER_PORT: Joi.number().required(),



}).unknown(true);

const { error, value } = validateEnviromentVariables.validate(process.env);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

const envVar: EnviromentsVariable = value;

export const envs = {
  server_port: envVar.SERVER_PORT
}
