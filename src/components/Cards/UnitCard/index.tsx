"use client"

import Link from "next/link";
import Pill from "@/components/Pill";
import SemiSectionData from "@/components/Sections/AppSections/SemiSection";
import Shortcuts, { getShortcutCols } from "@/components/Sections/AppSections/ShortcutSection";
import { IconCalendarExclamation, IconMailExclamation, IconMailForward, IconPlus } from "@tabler/icons-react";
import { FC } from "react";
import { shortcutsUnit, unitCard } from "@/lib/contents/(app)/contents";
import IconUnit from "@/components/Icons/IconUnit";
import ButtonFile from "../../../../packages/components/Buttons/ButtonFile";
import { formatUnitPermissions, getShortcutRoutesWithPermissions } from "@/store/permissions/useUnitPermissions";
import { cn } from "@/lib/utils";

interface unitProps {
  unit: any;
}

const unit: FC<unitProps> = ({ unit }) => {

  const expiresTitle = ["1er vencimiento"];
  if (unit.uf_vto2UltimaExpensa && unit.uf_vto2UltimaExpensa.length > 0) {
    expiresTitle.push("2do vencimiento");
  }

  const mostRecentLiquidation = unit.uf_liquidaciones.sort(
    (a: any, b: any) => parseInt(b.orden) - parseInt(a.orden)
  )[0];

  const permissions = formatUnitPermissions(unit)
  const shortcutsUnit = getShortcutRoutesWithPermissions(permissions, unit.uf_id + '_' + unit.uf_codEdificio)

  return (
    <div className="w-full flex flex-col gap-2 justify-between p-4 rounded-2xl border-outline border dark:border-outline-dark">
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-3 w-full">
          <IconUnit id={unit.edf_id} name={unit.nombreAdjunto ?? null} padding="p-2" rounded="rounded-lg" iconSize={36} size={54}/>
          <div className="flex flex-col gap-[2px] max-w-max w-full">
            <p className="font-semibold truncate">{unit.uf_domiDpto}</p>
            <div className="flex items-center gap-1">
              <Pill
                text={`${unit.uf_nroUnidad} ${unit.uf_codDpto}`}
                className="text-sm"
              />
              <Pill
                text={unit.uf_nombrePropietario}
                className=""
                classNameText="text-sm font-bold text-blue"
              />
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <SemiSectionData
            type="main"
            title={unitCard.import_to_pay}
            key={unitCard.import_to_pay}
          >
            <p className="font-geist text-4xl font-bold max-md:text-3xl">
              {unit.uf_importeTotal}
            </p>
          </SemiSectionData>

          <SemiSectionData
            type="multiple"
            title={unitCard.expirations.title}
            key={unitCard.expirations.title}
            icon={
              <IconCalendarExclamation
                width={24}
                height={24}
                className="text-black dark:text-white"
              />
            }
            content={[
              {
                title: unitCard.expirations[0],
                children: (
                  <Pill
                    text={unit.uf_vtoUltimaExpensa}
                    classNameText="text-sm"
                  />
                ),
              },
              ...(unit.uf_vto2UltimaExpensa.length > 0
                ? [
                    {
                      title: unitCard.expirations[1],
                      children: (
                        <Pill text={unit.uf_vto2UltimaExpensa} classNameText="text-sm" />
                      ),
                    },
                  ]
                : []),
            ]}
          />
        </div>
        <div className="flex flex-col gap-2">
          {mostRecentLiquidation && (
            <ButtonFile
              fileType="uf_liquidaciones"
              key={mostRecentLiquidation.id}
              fileId={mostRecentLiquidation.id}
              fileName={mostRecentLiquidation.nombreAdjunto}
              title="Ver Ultima Liquidación"
              icon={
                <IconMailForward
                  size={24}
                  className="text-[#1f9163]"
                />
              }
            />
          )}
          {unit.uf_aviso.length > 0 && (
            <ButtonFile
              // classname={!(unit.uf_aviso[0]) ? "pointer-events-none opacity-25 blur-sm" : ""}
              fileType="uf_aviso"
              key={unit.uf_aviso[0]?.id ?? ""}
              fileId={unit.uf_aviso[0]?.id ?? ""}
              fileName={unit.uf_aviso[0]?.nombreAdjunto ?? ""}
              title="Ver Aviso de pago"
              icon={
                <IconMailExclamation
                  size={24}
                  className="text-[#91694a]"
                />
              }
            />
          )} 
        </div>
        <Shortcuts
          data={shortcutsUnit}
          display="no-styled"
          className={cn("grid gap-2", getShortcutCols(shortcutsUnit.length))}
          mainPath={`/prp/expensas/${unit.uf_id}_${unit.uf_codEdificio}`}
        />
        <Link
          prefetch
          scroll={true}
          href={`/prp/expensas/${unit.uf_id}_${unit.uf_codEdificio}`}
          className="bg-blue-button dark:bg-green flex items-center justify-center w-full rounded-lg py-2 gap-1 font-medium text-white"
        >
          <IconPlus size={22} />
          Ver mas
        </Link>
      </div>
    </div>
  );
}

export default unit