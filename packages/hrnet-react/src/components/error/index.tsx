import { FunctionComponent, useMemo } from 'react';
import { NavLink } from 'react-router-dom';

import "./index.css"

interface IProps {
 code?: number,
 msg?: string
}

const defaultCode = 404
const defaultMsg = "Oups! La page que vous demandez n'existe pas."

const ErrorComponent: FunctionComponent<IProps> = (props: IProps) => {
 const code = useMemo(() => props?.code ?? defaultCode, [props.code])
 const msg = useMemo(() => (code === defaultCode) ? defaultMsg : props.msg, [code, props.msg])

 return <div className={`error-container`}>
  <h3> ERROR {code} </h3>
  <p className={`error-msg`}> {msg} </p>
  <NavLink className={`error-back`} to={'/'}> Retourner sur la page d’accueil </NavLink>
 </div>
}

export { ErrorComponent }
