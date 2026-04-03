import { NotFoundFallback } from '@components';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Hot Recipes | Not Found',
};

export default function NotFound() {
  return <NotFoundFallback />;
}
