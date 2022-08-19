import {
  Container,
  Kbd,
  SimpleGrid,
  useColorModeValue,
} from '@chakra-ui/react';
import * as React from 'react';
import { useEffect } from 'react';
import { useRecoilState } from 'recoil';

import { getLayout } from '@/components/layout/Layout';
import Seo from '@/components/Seo';

import { userState } from '@/store/store';

import { USER } from '@/lib/type';

export default function HomePage(props: { user: USER }) {
  const [, setUserInfo] = useRecoilState(userState);

  useEffect(() => {
    setUserInfo(props.user);
  }, []);

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

export async function getServerSideProps() {
  const user = await fetch('http://localhost:8000/api/v1/articleList');
  const userJson = await user.json();

  return {
    props: { user: userJson.data },
  };
}

HomePage.getLayout = getLayout;
