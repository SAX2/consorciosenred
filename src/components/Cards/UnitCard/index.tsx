import Link from "next/link";
import Pill from "@/components/Pill";
import SemiSectionData from "@/components/Sections/AppSections/SemiSection";
import Shortcuts from "@/components/Sections/AppSections/ShortcutSection";
import { IconBuilding, IconCalendarExclamation, IconChevronRight, IconMailExclamation, IconMailFast, IconMailForward, IconPlus, IconReceipt2 } from "@tabler/icons-react";
import { FC } from "react";
import { shortcutsUnit, unitCard } from "@/lib/contents/(app)/contents";

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


  return (
    <div className="w-full flex flex-col gap-2 justify-between p-4 rounded-2xl border-outline border dark:border-outline-dark">
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-3 w-full">
          <div className="rounded-[10px] w-14 h-14 flex items-center justify-center border border-outline bg-white dark:bg-grey-sec-dark dark:border-outline-dark">
            <IconBuilding width={32} height={32} className="text-text-grey" />
          </div>
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
        <div className="flex flex-col gap-2 py-1">
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
              {
                title: unitCard.expirations[1],
                children: (
                  <Pill
                    text={
                      unit.uf_vto2UltimaExpensa.length > 0
                        ? unit.uf_vto2UltimaExpensa
                        : "Sin Fecha"
                    }
                    classNameText="text-sm"
                  />
                ),
              },
            ]}
          />
          
        </div>
        <div className="flex flex-col gap-2">
          {mostRecentLiquidation && (
            <Link
              target="_blank"
              href={`/file/uf_liquidaciones/${mostRecentLiquidation.id}/${mostRecentLiquidation.nombreAdjunto}`}
              className="border border-outline dark:border-outline-dark p-2 flex rounded-lg items-center justify-between"
            >
              <div className="flex gap-2">
                <IconMailForward
                  width={24}
                  height={24}
                  className="ios:mr-[6px] android:mr-[6px] text-green"
                />
                <span className="text-base font-medium">Ver Liquidacion</span>
              </div>
              <IconChevronRight
                width={20}
                height={20}
                className="text-text-grey"
              />
            </Link>
          )}
          {unit.uf_aviso.length > 0 && (
            <Link
              target="_blank"
              href={`/file/uf_aviso/${unit.uf_aviso[0].id}/${unit.uf_aviso[0].nombreAdjunto}`}
              className="border border-outline dark:border-outline-dark p-2 flex rounded-lg items-center justify-between"
            >
              <div className="flex gap-2">
                <IconMailExclamation
                  width={24}
                  height={24}
                  className="ios:mr-[6px] android:mr-[6px] text-brown"
                />
                <span className="text-base font-medium">Ver Aviso de pago</span>
              </div>
              <IconChevronRight
                width={20}
                height={20}
                className="text-text-grey"
              />
            </Link>
          )}
        </div>
        <Shortcuts
          data={shortcutsUnit}
          display="no-styled"
          className="grid grid-cols-3 gap-2"
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