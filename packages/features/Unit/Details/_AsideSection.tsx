"use client"

import Section from 'app/components/Sections/Section'
import React, { useEffect, useState } from 'react'
import Shortcuts, { getShortcutCols } from 'app/components/Buttons/ButtonShortcut/List';
import { getShortcutRoutesWithPermissions } from 'app/hooks/permissions/useUnitPermissions';
import { getUnitPermissions } from 'app/hooks/permissions/unit-permissions';
import { cn } from 'app/lib/utils';
import { useParams } from 'next/navigation';
import getParams from 'app/hooks/use-get-params';

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

export const AsideUnit = () => {
  const params = useParams();
  const unitId = getParams({ params: params.id as string, type: "id" })
  
  if (params.id) {
    return <AsideSection id={unitId}/>
  }

  return null;
}