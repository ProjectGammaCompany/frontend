import { useRouteError } from "react-router";
import ErrorContent from "../ErrorContent/ErrorContent";
import "./ErrorPage.scss";
const ErrorPage = () => {
  const error = useRouteError();
  return (
    <main className="error-page__main">
      <ErrorContent error={error} />
    </main>
  );
};

export default ErrorPage;
