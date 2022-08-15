import {
  Avatar,
  Button,
  Flex,
  Icon,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  useColorMode,
  useColorModeValue,
} from '@chakra-ui/react';
import React from 'react';
import { FaCalendarAlt } from 'react-icons/fa';
import { IoMdMoon, IoMdSunny } from 'react-icons/io';
import { MdNotificationsNone } from 'react-icons/md';

import { router } from '@/components/layout/Layout';
import { ItemContent } from '@/components/menu/ItemContent';
import { SearchBar } from '@/components/navbar/searchBar/SearchBar';
import { SidebarResponsive } from '@/components/sidebar/Sidebar';

export default function HeaderLinks(props: {
  secondary: boolean;
  logoText: string | undefined;
  scrolled: boolean;
}) {
  const { secondary } = props;
  const { colorMode, toggleColorMode } = useColorMode();

  //!THEME 主题配置
  const navbarIcon = useColorModeValue('gray.400', 'white');
  const menuBg = useColorModeValue('white', 'navy.800');
  const textColor = useColorModeValue('secondaryGray.900', 'white');
  const textColorBrand = useColorModeValue('brand.700', 'brand.400');
  const ethColor = useColorModeValue('gray.700', 'white');
  const borderColor = useColorModeValue('#E6ECFA', 'rgba(135, 140, 189, 0.3)');
  const ethBg = useColorModeValue('secondaryGray.300', 'navy.900');
  const ethBox = useColorModeValue('white', 'navy.800');
  const shadow = useColorModeValue(
    '14px 17px 40px 4px rgba(112, 144, 176, 0.18)',
    '14px 17px 40px 4px rgba(112, 144, 176, 0.06)'
  );

  return (
    <Flex
      w={{ sm: '100%', md: 'auto' }}
      alignItems='center'
      flexDirection='row'
      bg={menuBg}
      flexWrap={secondary ? { base: 'wrap', md: 'nowrap' } : 'unset'}
      p='10px'
      borderRadius='30px'
      boxShadow={shadow}
    >
      <SearchBar
        mb={secondary ? { base: '10px', md: 'unset' } : 'unset'}
        me='10px'
        borderRadius='30px'
      />
      <Flex
        bg={ethBg}
        display={secondary ? 'flex' : 'none'}
        borderRadius='30px'
        ms='auto'
        p='6px'
        align='center'
        me='6px'
      >
        <Flex
          align='center'
          justify='center'
          bg={ethBox}
          h='29px'
          w='29px'
          borderRadius='30px'
          me='7px'
        >
          <Icon color={ethColor} w='9px' h='14px' as={FaCalendarAlt} />
        </Flex>
        <Text
          w='max-content'
          color={ethColor}
          fontSize='sm'
          fontWeight='700'
          me='6px'
        >
          2022-08-15
          <Text as='span' display={{ base: 'none', md: 'unset' }}>
            {' '}
            😄
          </Text>
        </Text>
      </Flex>
      <SidebarResponsive routes={router} />
      <Menu>
        <MenuButton p='0px'>
          <Icon
            mt='6px'
            as={MdNotificationsNone}
            color={navbarIcon}
            w='18px'
            h='18px'
            m='10px'
          />
        </MenuButton>
        <MenuList
          boxShadow={shadow}
          p='20px'
          borderRadius='20px'
          bg={menuBg}
          border='none'
          mt='22px'
          me={{ base: '30px', md: 'unset' }}
          minW={{ base: 'unset', md: '400px', xl: '450px' }}
          maxW={{ base: '360px', md: 'unset' }}
        >
          <Flex justify='space-between' w='100%' mb='20px'>
            <Text fontSize='md' fontWeight='600' color={textColor}>
              提醒
            </Text>
            <Text
              fontSize='sm'
              fontWeight='500'
              color={textColorBrand}
              ms='auto'
              cursor='pointer'
            >
              全部已读
            </Text>
          </Flex>
          <Flex flexDirection='column'>
            <MenuItem
              _hover={{ bg: 'none' }}
              _focus={{ bg: 'none' }}
              px='0'
              borderRadius='8px'
              mb='10px'
            >
              <ItemContent info='开历史倒车者，必将走入歧途' aName='人民日报' />
            </MenuItem>
            <MenuItem
              _hover={{ bg: 'none' }}
              _focus={{ bg: 'none' }}
              px='0'
              borderRadius='8px'
              mb='10px'
            >
              <ItemContent info='地平线设计系统免费' aName='乔什·亨利' />
            </MenuItem>
          </Flex>
        </MenuList>
      </Menu>

      <Button
        variant='no-hover'
        bg='transparent'
        p='0px'
        minW='unset'
        minH='unset'
        h='18px'
        w='max-content'
        onClick={toggleColorMode}
      >
        <Icon
          me='10px'
          h='18px'
          w='18px'
          color={navbarIcon}
          as={colorMode === 'light' ? IoMdMoon : IoMdSunny}
        />
      </Button>
      <Menu>
        <MenuButton p='0px'>
          <Avatar
            _hover={{ cursor: 'pointer' }}
            src='https://iconfont.alicdn.com/p/illus/file/eq619pYlknZI/046174e5-0181-429e-ab06-2c42492281ff_origin.svg'
            color='white'
            name='白衣菩萨'
            bg='#11047A'
            size='sm'
            w='40px'
            h='40px'
          />
        </MenuButton>
        <MenuList
          boxShadow={shadow}
          p='0px'
          mt='10px'
          borderRadius='20px'
          bg={menuBg}
          border='none'
        >
          <Flex w='100%' mb='0px'>
            <Text
              ps='20px'
              pt='16px'
              pb='10px'
              w='100%'
              borderBottom='1px solid'
              borderColor={borderColor}
              fontSize='sm'
              fontWeight='700'
              color={textColor}
            >
              👋&nbsp; 欢迎回来，白衣菩萨
            </Text>
          </Flex>
          <Flex flexDirection='column' p='10px'>
            <MenuItem
              _hover={{ bg: 'none' }}
              _focus={{ bg: 'none' }}
              borderRadius='8px'
              px='14px'
            >
              <Text fontSize='sm'>配置文件设置</Text>
            </MenuItem>
            <MenuItem
              _hover={{ bg: 'none' }}
              _focus={{ bg: 'none' }}
              borderRadius='8px'
              px='14px'
            >
              <Text fontSize='sm'>通讯设置</Text>
            </MenuItem>
            <MenuItem
              _hover={{ bg: 'none' }}
              _focus={{ bg: 'none' }}
              color='red.400'
              borderRadius='8px'
              px='14px'
            >
              <Text fontSize='sm'>登出</Text>
            </MenuItem>
          </Flex>
        </MenuList>
      </Menu>
    </Flex>
  );
}
