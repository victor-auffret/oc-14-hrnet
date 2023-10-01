import { FunctionComponent, useCallback } from 'react';

import "./index.css"

interface IProps {
 children?: any,
 hidden: boolean,
 setHidden: React.Dispatch<React.SetStateAction<boolean>>
}


const ModaleComponent: FunctionComponent<IProps> = ({ children, hidden, setHidden }: IProps) => {

 const handleClick = useCallback(() => {
  setHidden(true)
 }, [])

 return <div className={hidden ? "hidden-modale" : "visible-modale"} onClick={handleClick}>
  <div className="modale">
   <header>
    <span className='close-modale' onClick={handleClick}>X</span>
   </header>
   {children}
  </div>
 </div>
}

export { ModaleComponent }
