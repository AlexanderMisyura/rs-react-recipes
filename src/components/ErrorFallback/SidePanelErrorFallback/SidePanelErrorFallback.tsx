'use client';

import { CloseLink, ErrorFallback } from '@components';
import type { SerializedError } from '@reduxjs/toolkit';
import type { FetchBaseQueryError } from '@reduxjs/toolkit/query';
interface ErrorFallbackProps {
  error: Error | FetchBaseQueryError | SerializedError;
}

export const SidePanelErrorFallback: React.FC<ErrorFallbackProps> = ({ error }) => {
  return (
    <ErrorFallback
      title={'status' in error ? (error.status as string) : error.message}
      error={
        new Error(
          'data' in error
            ? String((error.data as { message: string }).message)
            : 'Something went wrong with the data'
        )
      }
    >
      <CloseLink />
    </ErrorFallback>
  );
};
