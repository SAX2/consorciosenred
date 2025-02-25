"use client"

import React, { memo } from 'react';
import { ShortcutProps } from 'app/types/globals'
import IconBgDescription from './_IconBgDescription';
import IconBg from './_IconBg';
import NoStyled from './_NoStyled';

const ShortcutButton = memo(({ display = 'no-styled', customComponent, ...props }: ShortcutProps) => {
  switch (display) {
    case 'icon-bg-description':
      return customComponent ? customComponent({ shortcut: <IconBgDescription {...props} /> }) : <IconBgDescription {...props} />;
    case 'icon-bg':
      return customComponent ? customComponent({ shortcut: <IconBg {...props} /> }) : <IconBg {...props} />;
    default:
      return customComponent ? customComponent({ shortcut: <NoStyled {...props} /> }) : <NoStyled {...props} />;
  }
});

export default ShortcutButton;
