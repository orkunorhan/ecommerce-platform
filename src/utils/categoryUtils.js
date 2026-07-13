const TURKISH_CHARACTERS = {
  ç: "c",
  ğ: "g",
  ı: "i",
  ö: "o",
  ş: "s",
  ü: "u",
};

export const createSlug = (value = "") => {
  return value
    .trim()
    .toLocaleLowerCase("tr-TR")
    .replace(/[çğıöşü]/g, (character) => TURKISH_CHARACTERS[character])
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
};

export const getCategoryGender = (category) => {
  return category.gender === "k" ? "kadin" : "erkek";
};

export const getCategoryName = (category) => {
  const categoryCode = category.code?.split(":")[1];

  return createSlug(categoryCode || category.title);
};

export const getCategoryPath = (category) => {
  const gender = getCategoryGender(category);
  const categoryName = getCategoryName(category);

  return `/shop/${gender}/${categoryName}/${category.id}`;
};
