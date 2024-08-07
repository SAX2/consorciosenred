import React from 'react'
import ShortcutsGrid from '@/app/(app)/components/sections/ShortcutsGrid';
import TitleSection from '@/app/(app)/components/sections/TitleSection';
import { shortcuts } from '@/lib/contents/(app)/shortcuts';
import EditShortcuts from './shortcuts/EditShortcuts';

const AsideUnit = () => {
  return (
    <TitleSection
      title="Acciones rapidas"
      pills={[
        {
          text: shortcuts.filter((i) => i.isActive).length.toString(),
        },
      ]}
      rightContent={<EditShortcuts />}
    >
      <ShortcutsGrid data={shortcuts} classNameItem='bg-white dark:bg-grey-sec-dark' />
    </TitleSection>
  );
}

export default AsideUnit