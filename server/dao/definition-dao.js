const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

const definitionFolderPath = path.join(__dirname, "storage", "definitionList");

// Method to read a definition from a file
function get(definitionId) {
  try {
    const filePath = path.join(definitionFolderPath, `${definitionId}.json`);
    const fileData = fs.readFileSync(filePath, "utf8");
    return JSON.parse(fileData);
  } catch (error) {
    if (error.code === "ENOENT") return null;
    throw { code: "failedToReadDefinition", message: error.message };
  }
}

// Method to write a definition to a file
function create(definition) {
  try {
    definition.id = crypto.randomBytes(16).toString("hex");
    const filePath = path.join(definitionFolderPath, `${definition.id}.json`);
    const fileData = JSON.stringify(definition);
    fs.writeFileSync(filePath, fileData, "utf8");
    return definition;
  } catch (error) {
    throw { code: "failedToCreateDefinition", message: error.message };
  }
}

// Method to update definition in a file
function update(definition) {
  try {
    const currentDefinition = get(definition.id);
    if (!currentDefinition) return null;
    const newDefinition = { ...currentDefinition, ...definition };
    const filePath = path.join(definitionFolderPath, `${definition.id}.json`);
    const fileData = JSON.stringify(newDefinition);
    fs.writeFileSync(filePath, fileData, "utf8");
    return newDefinition;
  } catch (error) {
    throw { code: "failedToUpdateDefinition", message: error.message };
  }
}

function createComment(comment, definitionId) {
  comment.id = crypto.randomBytes(16).toString("hex");
  const currentDefinition = get(definitionId);
  if (!currentDefinition) return null;
  currentDefinition.comments.push(comment);
  const updatedDefinition = update(currentDefinition);
  return updatedDefinition;
}

function deleteComment(commentId, definitionId) {
  const currentDefinition = get(definitionId);
  if (!currentDefinition) return null;
  currentDefinition.comments = currentDefinition.comments.filter(function (comment){
    return comment.id != commentId
  });
  const updatedDefinition = update(currentDefinition);
  return updatedDefinition;
}

// Method to remove an definition from a file
function remove(definitionId) {
  try {
    const filePath = path.join(definitionFolderPath, `${definitionId}.json`);
    fs.unlinkSync(filePath);
    return {};
  } catch (error) {
    if (error.code === "ENOENT") return {};
    throw { code: "failedToRemoveDefinition", message: error.message };
  }
}

// Method to list definitions in a folder
function list() {
  try {
    const files = fs.readdirSync(definitionFolderPath);
    const definitionList = files.map((file) => {
      const fileData = fs.readFileSync(
        path.join(definitionFolderPath, file),
        "utf8"
      );
      return JSON.parse(fileData);
    });
    definitionList.sort((a, b) => new Date(a.date) - new Date(b.date));
    return definitionList;
  } catch (error) {
    throw { code: "failedToListDefinitions", message: error.message };
  }
}

function definitionMap() {
  const categoryList = list();
  const categoryMap = {};
  categoryList.forEach((category) => {
    if (!categoryMap[category.definitionId])
      categoryMap[category.definitionId] = {};
    if (!categoryMap[category.definitionId][category.userId])
      categoryMap[category.definitionId][category.userId] = {};
    categoryMap[category.definitionId][category.userId] = {
      category: category.category,
      guests: category.guests,
    };
  });
  return categoryMap;
}

module.exports = {
  get,
  create,
  update,
  remove,
  list,
  createComment,
  deleteComment,
  definitionMap,
};
