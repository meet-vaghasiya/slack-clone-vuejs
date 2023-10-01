import { helpers } from "@vuelidate/validators";
import axios from "@/api/axios";
import { isEmailExist } from "@/api/auth";
import { debounce } from "./index";

const isEmailTaken = async (email) => {
  const { data } = await isEmailExist({ email });
  return !data.exist;
};

export const isUniqueEmail = helpers.withAsync(isEmailTaken);
