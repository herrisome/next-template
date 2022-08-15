import {
  Box,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerOverlay,
  Flex,
  Icon,
  useColorModeValue,
  useDisclosure,
} from '@chakra-ui/react';
import React from 'react';
import { IoMenuOutline } from 'react-icons/io5';

import Content from '@/components/sidebar/components/Content';

function Sidebar(props: {
  logoText?: string;
  routes: Array<object>;
  variant?: string;
}) {
  const variantChange = '0.2s linear';
  const shadow = useColorModeValue(
    '14px 17px 40px 4px rgba(112, 144, 176, 0.08)',
    'unset'
  );
  //!THEME 主题配置
  const sidebarBg = useColorModeValue('white', 'navy.800');
  const sidebarMargins = '0px';
  const { routes } = props;

  return (
    <Box display={{ sm: 'none', xl: 'block' }} position='fixed' minH='100%'>
      <Box
        bg={sidebarBg}
        transition={variantChange}
        w='300px'
        h='100vh'
        m={sidebarMargins}
        minH='100%'
        overflowX='hidden'
        boxShadow={shadow}
      >
        <Content routes={routes} />
      </Box>
    </Box>
  );
}

export function SidebarResponsive(props: { routes: Array<object> }) {
  const sidebarBackgroundColor = useColorModeValue('white', 'navy.800');
  const menuColor = useColorModeValue('gray.400', 'white');
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { routes } = props;

  return (
    <Flex display={{ sm: 'flex', xl: 'none' }} alignItems='center'>
      <Flex w='max-content' h='max-content' onClick={onOpen}>
        <Icon
          as={IoMenuOutline}
          color={menuColor}
          my='auto'
          w='20px'
          h='20px'
          me='10px'
          _hover={{ cursor: 'pointer' }}
        />
      </Flex>
      <Drawer
        isOpen={isOpen}
        onClose={onClose}
        placement={document.documentElement.dir === 'rtl' ? 'right' : 'left'}
      >
        <DrawerOverlay />
        <DrawerContent w='285px' maxW='285px' bg={sidebarBackgroundColor}>
          <DrawerCloseButton
            zIndex='3'
            _focus={{ boxShadow: 'none' }}
            _hover={{ boxShadow: 'none' }}
          />
          <DrawerBody maxW='285px' px='0rem' pb='0'>
            <Content routes={routes} />
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Flex>
  );
}

export default Sidebar;
