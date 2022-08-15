import { Box, Flex, HStack, Text, useColorModeValue } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import React from 'react';

export type route = {
  name: React.ReactNode | string;
  items?: React.ReactNode;
  layout: string;
  icon: React.ReactNode;
  path: string;
};

export function SidebarLinks(props: { routes: Array<route> }) {
  const location = useRouter();
  const activeColor = useColorModeValue('gray.700', 'white');
  const inactiveColor = useColorModeValue(
    'secondaryGray.600',
    'secondaryGray.600'
  );
  const activeIcon = useColorModeValue('brand.500', 'white');
  const textColor = useColorModeValue('secondaryGray.500', 'white');
  const brandColor = useColorModeValue('brand.500', 'brand.400');

  const { routes } = props;

  const activeRoute = (routeName: string) => {
    return location.pathname.includes(routeName);
  };

  return (
    <>
      {routes.map((route, index) =>
        route.icon ? (
          <Box key={route.path + routes}>
            <HStack
              spacing={activeRoute(route.path.toLowerCase()) ? '22px' : '26px'}
              py='5px'
              ps='10px'
            >
              <Flex w='100%' alignItems='center' justifyContent='center'>
                <Box
                  color={
                    activeRoute(route.path.toLowerCase())
                      ? activeIcon
                      : textColor
                  }
                  me='18px'
                >
                  {route.icon}
                </Box>
                <Text
                  me='auto'
                  color={
                    activeRoute(route.path.toLowerCase())
                      ? activeColor
                      : textColor
                  }
                  fontWeight={
                    activeRoute(route.path.toLowerCase()) ? 'bold' : 'normal'
                  }
                >
                  {route.name}
                </Text>
              </Flex>
              <Box
                h='36px'
                w='4px'
                bg={
                  activeRoute(route.path.toLowerCase())
                    ? brandColor
                    : 'transparent'
                }
                borderRadius='5px'
              />
            </HStack>
          </Box>
        ) : (
          <Box key={route.path + index}>
            <HStack
              spacing={activeRoute(route.path.toLowerCase()) ? '22px' : '26px'}
              py='5px'
              ps='10px'
            >
              <Text
                me='auto'
                color={
                  activeRoute(route.path.toLowerCase())
                    ? activeColor
                    : inactiveColor
                }
                fontWeight={
                  activeRoute(route.path.toLowerCase()) ? 'bold' : 'normal'
                }
              >
                {route.name}
              </Text>
              <Box h='36px' w='4px' bg='brand.400' borderRadius='5px' />
            </HStack>
          </Box>
        )
      )}
    </>
  );
}

export default SidebarLinks;
