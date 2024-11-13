import Section from '@/components/Sections/AppSections/Section'
import React from 'react'
import Shortcuts from '../../../components/Sections/AppSections/ShortcutSection'
import { shortcutsUnit } from '@/lib/contents/(app)/contents';

const AsideSection = ({ id, isChildPath }: { id: string, isChildPath: boolean }) => {
  return (
    <>
      <Section
        title="Acciones rapidas"
        pills={[{ text: shortcutsUnit.length.toLocaleString() }]}
      >
        <Shortcuts
          className='grid grid-cols-3 gap-2'
          display="no-styled"
          mainPath={`/prp/expensas/${id}`}
          data={isChildPath ? shortcutsUnit : shortcutsUnit}
        />
      </Section>
    </>
  );
}

export default AsideSection