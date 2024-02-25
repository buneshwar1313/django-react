import layout from "./layoutReducer";
import auth from "@/components/partials/auth/store";
import moviesstore from "./moviesstore";
const rootReducer = {
  layout,
  auth,
  moviesstore,
};
export default rootReducer;
