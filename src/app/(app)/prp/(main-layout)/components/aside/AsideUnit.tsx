import React from 'react'
import ShortcutsGrid from '@/app/(app)/components/sections/ShortcutsGrid';
import TitleSection from '@/app/(app)/components/sections/TitleSection';
import { shortcuts } from '@/lib/contents/(app)/shortcuts';
import EditShortcuts from './shortcuts/EditShortcuts';

const AsideUnit = () => {
  return (
    <TitleSection
      title="Atajos"
      pills={[
        {
          text: shortcuts.filter((i) => i.isActive).length.toString(),
        },
      ]}
      rightContent={<EditShortcuts />}
    >
      <ShortcutsGrid data={shortcuts} />
    </TitleSection>
  );
}

export default AsideUnit