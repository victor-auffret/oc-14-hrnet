import { FunctionComponent } from 'react';
import { useRouteError } from "react-router-dom";
import { ErrorComponent } from '../../components/error';

interface IError {
 error?: {
  statusText?: any;
  message?: any;
 };
 data?: any;
 status?: number;
}

const PageNotFound: FunctionComponent = () => {
 const error: IError = useRouteError() as IError;
 //console.log(error)
 return <div>
  <ErrorComponent code={Number(error?.status)} msg={error.error?.message} />
 </div>
}

export { PageNotFound }
