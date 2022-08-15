import { Flex, useColorModeValue } from '@chakra-ui/react';
import React from 'react';

import { AppleLogo } from '@/components/icons/icon';

export function SidebarBrand() {
  //!THEME 主题配置
  const logoColor = useColorModeValue('navy.700', 'white');

  return (
    <Flex align='center' direction='column'>
      <AppleLogo h='26px' w='175px' my='32px' color={logoColor} />
      <HSeparator />
    </Flex>
  );
}

const HSeparator = () => {
  return (
    <Flex
      mb='20px'
      h='1px'
      w='100%'
      bg='linear-gradient(90deg, rgba(224, 225, 226, 0) 0%, rgb(224, 225, 226) 47.22%, rgba(224, 225, 226, 0.157) 94.44%)'
    ></Flex>
  );
};

export default SidebarBrand;
