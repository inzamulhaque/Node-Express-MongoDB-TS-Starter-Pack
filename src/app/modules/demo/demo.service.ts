import Demo from "./demo.model";

export const getAllDemoFromDB = async () => {
  const result = await Demo.find();
  return result;
};
