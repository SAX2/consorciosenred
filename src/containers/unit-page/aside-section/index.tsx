import Section from '@/components/Sections/AppSections/Section'
import React from 'react'
import Shortcuts from '../shortcut-section'
import { shortcuts, shortcutsUnitOption } from '../shortcut-section/contents'

const AsideSection = ({ id, isChildPath }: { id: string, isChildPath: boolean }) => {
  return (
    <>
      <Section
        title='Acciones rapidas'
        pills={[{ text: shortcuts.length.toLocaleString() }]}
      >
        <Shortcuts mainPath={`/prp/expensas/${id}`} data={isChildPath ? shortcutsUnitOption : shortcuts} />
      </Section>
    </>
  )
}

export default AsideSection