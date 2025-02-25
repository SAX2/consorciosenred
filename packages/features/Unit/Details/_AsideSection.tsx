"use client"

import Section from '@/components/Sections/AppSections/Section'
import React, { useEffect, useState } from 'react'
import Shortcuts, { getShortcutCols } from '@/components/Sections/AppSections/ShortcutSection';
import { getShortcutRoutesWithPermissions } from '@/store/permissions/useUnitPermissions';
import { getUnitPermissions } from '@/store/permissions/unit-permissions';
import { cn } from '@/lib/utils';

const AsideSection = ({ id }: { id: string }) => {
  const [permissions, setPermissions] = useState<any | null>(null)
  
  useEffect(() => {
    const getPermissions = async () => {
      const data = await getUnitPermissions(id)
      if (data) {
        setPermissions(data)
      }
    }
    
    getPermissions();
  }, [id])

  const shortcutsUnit = getShortcutRoutesWithPermissions(permissions)
  
  return (
    <>
      {permissions && shortcutsUnit.length > 0 && (
        <Section
          title="Acciones"
          pills={[{ text: shortcutsUnit.length.toLocaleString() }]}
        >
          <Shortcuts
            className={cn("grid gap-2", getShortcutCols(shortcutsUnit.length))}
            display="no-styled"
            mainPath={`/prp/expensas/${id}`}
            data={shortcutsUnit}
          />
        </Section>
      )}
    </>
  );
}

export default AsideSection