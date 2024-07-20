const db = require('../config/db');

const createLead = async (lead) => {
  return await db('leads').insert(lead);
};

module.exports = {
  create: createLead
};
