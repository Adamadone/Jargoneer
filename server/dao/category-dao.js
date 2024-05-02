const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

const categoryFolderPath = path.join(__dirname, "storage", "categoryList");

// Method to read a category from a file
function get(categoryId) {
  try {
    const categoryList = list();
    const category = categoryList.find(
      (a) => a.categoryId === categoryId && a.definitionId === definitionId
    );
    return category;
  } catch (error) {
    throw { code: "failedToReadCategory", message: error.message };
  }
}

// Method to write a definition to a file
function create(definition) {
  try {
    category.id = crypto.randomBytes(16).toString("hex");
    const filePath = path.join(definitionFolderPath, `${definition.id}.json`);
    const fileData = JSON.stringify(definition);
    fs.writeFileSync(filePath, fileData, "utf8");
    return definition;
  } catch (error) {
    throw { code: "failedToCreateDefinition", message: error.message };
  }
}


// Method to update category in a file
function update(category) {
  try {
    const currentCategory = get(category.userId, category.definitionId) || {};
    if (currentCategory.file) {
      const filePath = path.join(categoryFolderPath, currentCategory.file);
      fs.unlinkSync(filePath);
    }
    const newCategory = { ...currentCategory, ...category };

    const filePath = path.join(
      categoryFolderPath,
      `${newCategory.userId}_${newCategory.definitionId}_${newCategory.category}_${newCategory.guests}.txt`
    );
    fs.writeFileSync(filePath, "", "utf8");
    return newCategory;
  } catch (error) {
    throw { code: "failedToUpdateCategory", message: error.message };
  }
}

// Method to remove an category from a file
function remove(userId, definitionId) {
  try {
    const category = get(userId, definitionId);
    if (category) {
      const filePath = path.join(categoryFolderPath, category.file);
      fs.unlinkSync(filePath);
    }
    return {};
  } catch (error) {
    if (error.code === "ENOENT") {
      return {};
    }
    throw { code: "failedToRemoveCategory", message: error.message };
  }
}

// Method to list categorys in a folder
function list() {
  try {
    const files = fs.readdirSync(categoryFolderPath);
    const categoryList = files.map((file) => {
      const categoryData = file.replace(".txt", "").split("_");
      return {
        userId: categoryData[0],
        definitionId: categoryData[1],
        category: categoryData[2],
        guests: Number(categoryData[3]),
        file,
      };
    });
    return categoryList;
  } catch (error) {
    throw { code: "failedToListCategorys", message: error.message };
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

function userMap() {
  const categoryList = list();
  const categoryMap = {};
  categoryList.forEach((category) => {
    if (!categoryMap[category.userId])
      categoryMap[category.userId] = {};
    if (!categoryMap[category.userId][category.definitionId])
      categoryMap[category.userId][category.definitionId] = {};
    categoryMap[category.userId][category.definitionId] = {
      category: category.category,
      guests: category.guests,
    };
  });
  return categoryMap;
}

module.exports = {
  create,
  get,
  update,
  remove,
  list,
  definitionMap,
  userMap,
};
