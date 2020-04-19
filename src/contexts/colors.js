import { createContext } from "react"

const { Provider, Consumer } = createContext("hsl(0, 60%, 80%)")

export const ColorProvider = Provider
export const ColorConsumer = Consumer
