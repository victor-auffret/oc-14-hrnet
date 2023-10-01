import { createContext } from "react"
interface IEmploye {

}

interface IEmployeContext {
 employes: IEmploye[],
 addEmploye: (v: IEmploye) => void
}

const EmployeContext = createContext<IEmployeContext>({
 employes: [],
 addEmploye: (v: IEmploye) => { }
})

export { EmployeContext }
export type { IEmploye }