import { BoxWrapper, Button, Heading } from '@components';
import { UrlPath } from '@ts-enums';

export const NotFoundFallback: React.FC = () => {
  return (
    <BoxWrapper className="max-w-2xl border-2 border-red-600">
      <Heading className="text-red-600">Page not found</Heading>
      <p className="text-xl">The page you are looking for does not exist</p>
      <Button linkTo={UrlPath.RECIPES}>To Recipes Page</Button>
    </BoxWrapper>
  );
};
