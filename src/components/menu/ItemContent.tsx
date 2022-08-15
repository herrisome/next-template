import { Flex, Icon, Text, useColorModeValue } from '@chakra-ui/react';
import React from 'react';
import { ImNewspaper } from 'react-icons/im';

export function ItemContent({
  info,
  aName,
}: {
  info: string | React.ReactNode;
  aName: string | React.ReactNode;
}) {
  //!THEME 主题配置
  const textColor = useColorModeValue('navy.700', 'white');
  return (
    <>
      <Flex
        justify='center'
        align='center'
        borderRadius='16px'
        minH={{ base: '60px', md: '70px' }}
        h={{ base: '60px', md: '70px' }}
        minW={{ base: '60px', md: '70px' }}
        w={{ base: '60px', md: '70px' }}
        me='14px'
        bg='linear-gradient(135deg, #868CFF 0%, #4318FF 100%)'
      >
        <Icon as={ImNewspaper} color='white' w={8} h={14} />
      </Flex>
      <Flex flexDirection='column'>
        <Text
          mb='5px'
          fontWeight='bold'
          color={textColor}
          fontSize={{ base: 'md', md: 'md' }}
        >
          {info}
        </Text>
        <Flex alignItems='center'>
          <Text
            fontSize={{ base: 'sm', md: 'sm' }}
            lineHeight='100%'
            color={textColor}
          >
            {aName}
          </Text>
        </Flex>
      </Flex>
    </>
  );
}
