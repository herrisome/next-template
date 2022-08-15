import { StyleFunctionProps } from '@chakra-ui/styled-system';
import { mode } from '@chakra-ui/theme-tools';
import { Dict } from '@chakra-ui/utils';

export const sliderStyles = {
  components: {
    RangeSlider: {
      variants: {
        main: (props: StyleFunctionProps | Dict) => ({
          thumb: {
            bg: mode('brand.500', 'brand.400')(props),
          },
        }),
      },
    },
  },
};
