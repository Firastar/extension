const rand = function () {
  return Math.random().toString(36).substr(2); // remove `0.`
};

export const generateToken = function () {
  return rand() + rand(); // to make it longer
};
