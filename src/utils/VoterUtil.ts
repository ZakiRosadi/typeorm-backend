import * as joi from "joi";

const VoterUtil = joi.object({
    name: joi.string().max(50).required(),
    address: joi.string().min(5).max(50).required(),
    gender: joi.string().required(),
    electedPaslon: joi.string().min(5).max(50).required(),
});

export default VoterUtil;
