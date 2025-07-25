import { ErrorFallback } from '@components';
import { isRouteErrorResponse, useNavigate, useRouteError } from 'react-router';

export const ErrorPage = () => {
  const error = useRouteError();
  const navigate = useNavigate();

  let status = '404';
  let message = 'Page Not Found';

  if (isRouteErrorResponse(error)) {
    status = error.status.toString();
    message = error.data as string;
  } else if (error instanceof Error) {
    status = 'Error';
    message = `Something went wrong: ${error.message}`;
  }

  return (
    <ErrorFallback
      error={new Error(message)}
      title={status}
      resetFunction={() => void navigate(-1)}
      btnChildren="Go Back"
      testId="error-page"
    />
  );
};
