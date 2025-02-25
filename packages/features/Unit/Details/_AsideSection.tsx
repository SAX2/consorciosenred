"use client"

import Section from 'app/components/Sections/Section'
import React, { useEffect, useState } from 'react'
import Shortcuts, { getShortcutCols } from 'app/components/Buttons/ButtonShortcut/List';
import { getShortcutRoutesWithPermissions } from 'app/hooks/permissions/useUnitPermissions';
import { getUnitPermissions } from 'app/hooks/permissions/unit-permissions';
import { cn } from 'app/lib/utils';

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