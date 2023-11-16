import * as joi from "joi";

const paslonSchemaUtil = joi.object({
  idOrder: joi.string().max(5).required(),
  namaPaslon: joi.string().min(3).max(50).required(),
  visiMisi: joi.string().min(5).max(50).required(),
  image: joi.string().required(),
});

export default paslonSchemaUtil;
