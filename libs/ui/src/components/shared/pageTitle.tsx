import { Heading } from '@chakra-ui/react';
import { FC } from 'react';

interface PageTitleProps {
  children: string;
}

export const PageTitle: FC<PageTitleProps> = ({ children }) => {
  return (
    <Heading as="h1" textAlign="center" fontWeight={900} fontSize="4xl" my={8}>
      {children}
    </Heading>
  );
};
