import {
  Container,
  Kbd,
  SimpleGrid,
  useColorModeValue,
} from '@chakra-ui/react';
import * as React from 'react';

import { getLayout } from '@/components/layout/Layout';
import Seo from '@/components/Seo';

export default function HomePage() {
  //!THEME 主题配置
  const itemBg = useColorModeValue('white', 'navy.800');

  return (
    <>
      <Seo templateTitle='首页' description='主页' />
      <SimpleGrid
        columns={{ base: 1, md: 2, lg: 3, '2xl': 6 }}
        gap='20px'
        mb='20px'
      >
        {Array.from({ length: 10 }, (_, i) => i).map((i) => (
          <Container
            bg={itemBg}
            key={i}
            height='80px'
            rounded='lg'
            justifyContent='center'
            alignItems='center'
            display='flex'
          >
            <Kbd>shift</Kbd> + <Kbd>num {i}</Kbd>
          </Container>
        ))}
      </SimpleGrid>
    </>
  );
}

HomePage.getLayout = getLayout;
