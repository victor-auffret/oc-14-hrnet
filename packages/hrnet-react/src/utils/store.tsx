import { useCallback, useEffect, useState } from "react";

interface IEmploye {

}

const STORE_ID_EMPLOYEES = "employees"

const useEmployes = () => {

 const [employes, setEmployes] = useState<IEmploye[]>([])

 const addEmploye = (employe: IEmploye) => {
  setEmployes([...employes, employe])
 }

 useEffect(() => {
  const json_employees = globalThis.localStorage.getItem(STORE_ID_EMPLOYEES)
  if (json_employees) {
   setEmployes(JSON.parse(json_employees))
  }
 }, [])

 return { employes, addEmploye }
}

export { useEmployes }
