import { createContext } from "react";
import User from "../model/User";

export const UserContext = createContext(new User());
