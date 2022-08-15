import { Box, Flex, Stack } from '@chakra-ui/react';
import React from 'react';

import Brand from '@/components/sidebar/components/Brand';
import Links, { route } from '@/components/sidebar/components/Links';

function SidebarContent(props: { routes: Array<object> }) {
  const { routes } = props;
  return (
    <Flex direction='column' height='100%' pt='25px' borderRadius='30px'>
      <Brand />
      <Stack direction='column' mb='auto' mt='8px'>
        <Box ps='20px' pe={{ md: '16px', '2xl': '1px' }}>
          <Links routes={routes as Array<route>} />
        </Box>
      </Stack>
    </Flex>
  );
}

export default SidebarContent;
