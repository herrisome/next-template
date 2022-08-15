import { SearchIcon } from '@chakra-ui/icons';
import { InputGroupProps } from '@chakra-ui/input';
import {
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  useColorModeValue,
} from '@chakra-ui/react';
import React from 'react';

export function SearchBar(props: InputGroupProps) {
  // 将计算出的样式传入 `__css` 属性
  const { background, placeholder, borderRadius, ...rest } = props;
  //!THEME 主题配置
  const searchIconColor = useColorModeValue('gray.700', 'white');
  const inputBg = useColorModeValue('secondaryGray.300', 'navy.900');
  const inputText = useColorModeValue('gray.700', 'gray.100');
  return (
    <InputGroup w={{ base: '100%', md: '200px' }} {...rest}>
      <InputLeftElement>
        <IconButton
          bg='inherit'
          borderRadius='inherit'
          _active={{
            bg: 'inherit',
            transform: 'none',
            borderColor: 'transparent',
          }}
          _focus={{
            boxShadow: 'none',
          }}
          icon={<SearchIcon color={searchIconColor} w='15px' h='15px' />}
          aria-label=''
        ></IconButton>
      </InputLeftElement>
      <Input
        variant='search'
        fontSize='sm'
        bg={background ? background : inputBg}
        color={inputText}
        fontWeight='500'
        _placeholder={{ color: 'gray.400', fontSize: '14px' }}
        borderRadius={borderRadius ? borderRadius : '30px'}
        placeholder={placeholder ? placeholder : '搜索...'}
      />
    </InputGroup>
  );
}
