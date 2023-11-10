import { createContext } from "react";
import { AlertContextType } from "@/components/TypeInterfaces/ContextInterfaces";

export const AlertContext = createContext<AlertContextType | boolean>(false);