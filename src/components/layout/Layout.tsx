import { Box, Portal, useDisclosure } from '@chakra-ui/react';
import React, { useState } from 'react';
import { AiOutlineDotChart } from 'react-icons/ai';
import { BsTable } from 'react-icons/bs';
import { CgOptions } from 'react-icons/cg';
import { GoDashboard } from 'react-icons/go';

import Navbar from '@/components/navbar/Navbar';
import Sidebar from '@/components/sidebar/Sidebar';

export const router = [
  {
    name: '仪表盘',
    path: '/default',
    icon: <GoDashboard />,
  },
  {
    name: '可视化',
    path: '/nft-marketplace',
    icon: <AiOutlineDotChart />,
    secondary: true,
  },
  {
    name: '数据表',
    path: '/data-tables',
    icon: <BsTable />,
  },
  {
    name: '配置维护',
    path: '/profile',
    icon: <CgOptions />,
  },
];

export default function Layout({ children }: { children: React.ReactNode }) {
  const [fixed] = useState(false);

  const { onOpen } = useDisclosure();
  return (
    <Box>
      <Sidebar routes={router} />
      <Box
        float='right'
        minHeight='100vh'
        height='100%'
        overflow='auto'
        position='relative'
        maxHeight='100%'
        w={{ base: '100%', xl: 'calc( 100% - 290px )' }}
        maxWidth={{ base: '100%', xl: 'calc( 100% - 290px )' }}
        transition='all 0.33s cubic-bezier(0.685, 0.0473, 0.346, 1)'
        transitionDuration='.2s, .2s, .35s'
        transitionProperty='top, bottom, width'
        transitionTimingFunction='linear, linear, ease'
      >
        <Portal>
          <Box>
            <Navbar
              onOpen={onOpen}
              logoText='ITPSP'
              brandText='主页'
              secondary={true}
              // message='message'
              fixed={fixed}
            />
          </Box>
        </Portal>

        <Box
          mx='auto'
          p={{ base: '20px', md: '30px' }}
          pe='20px'
          minH='100vh'
          pt={{ base: '250px', md: '150px' }}
        >
          {children}
        </Box>
      </Box>
    </Box>
  );
}

export const getLayout = (page: React.ReactNode) => <Layout>{page}</Layout>;
