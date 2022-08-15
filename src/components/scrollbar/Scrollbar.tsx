import { Box, ChakraProps, OmitCommonProps } from '@chakra-ui/react';
import React from 'react';

export const renderTrack = (
  props: JSX.IntrinsicAttributes &
    React.ClassAttributes<HTMLDivElement> &
    React.HTMLAttributes<HTMLDivElement>
) => {
  return <div {...props} />;
};
export const renderThumb = (
  props: JSX.IntrinsicAttributes &
    React.ClassAttributes<HTMLDivElement> &
    React.HTMLAttributes<HTMLDivElement>
) => {
  return <div {...props} />;
};
export const renderView = (
  props: JSX.IntrinsicAttributes &
    OmitCommonProps<
      React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLDivElement>,
        HTMLDivElement
      >,
      keyof ChakraProps
    > &
    ChakraProps & { as?: 'div' | undefined }
) => {
  return (
    <Box me={{ base: '0px !important', lg: '-16px !important' }} {...props} />
  );
};
