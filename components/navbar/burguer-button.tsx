import React from 'react';
import {useSidebarContext} from '@/components/layout/layout-context';
import {StyledBurgerButton} from './navbar.styles';

export const BurguerButton = () => {
   const {collapsed, setCollapsed} = useSidebarContext();

   return (
      <StyledBurgerButton open={collapsed} onPress={setCollapsed}>
         <div />
         <div />
      </StyledBurgerButton>
   );
};
