const definitionDao = require("../../dao/definition-dao.js");

async function ListAbl(req, res) {
  try {
    const definitionList = definitionDao.list();

    const categoryMap = definitionDao.definitionMap();

    definitionList.forEach((definition) => {
      definition.userMap = categoryMap[definition.id] || {};
    });

    res.json(definitionList);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}

module.exports = ListAbl;