import Section from '@/components/Sections/AppSections/Section'
import React from 'react'
import Shortcuts from '../shortcut-section'
import { shortcuts } from '../shortcut-section/contents'

const AsideSection = ({ id }: { id: string }) => {
  return (
    <>
      <Section
        title='Acciones rapidas'
        pills={[{ text: shortcuts.length.toLocaleString() }]}
      >
        <Shortcuts mainPath={`/prp/expensas/${id}`} data={shortcuts} />
      </Section>
    </>
  )
}

export default AsideSection