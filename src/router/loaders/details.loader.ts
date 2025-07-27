import { apiController } from '@controllers';
import { data, type LoaderFunctionArgs } from 'react-router';

export function detailsLoader({ params }: LoaderFunctionArgs) {
  const { detailsId } = params;

  if (detailsId) {
    try {
      return apiController.getDetails(detailsId);
    } catch (error) {
      if (error instanceof Error) {
        throw data(error.message, { status: 404 });
      }
    }
  }
}
