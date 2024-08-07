import { IconAlarmAverage, IconAlertCircle, IconArrowRight, IconBuilding, IconFileAlert, IconMailFast, IconReceipt2 } from '@tabler/icons-react';
import Pill from '@/components/pill/Pill';
import React from 'react'
import { cn } from '@/lib/utils';
import Link from 'next/link';
import ShortcutsGrid from '../sections/ShortcutsGrid';
import { shortcuts } from '@/lib/contents/(app)/shortcuts';
import { AcrobatLogo } from '@/lib/icons';

interface UnitCardProps {
  unit: any;
}

interface SemiSectionCardProps {
  titles: string[];
  icon: React.ReactElement;
  children: React.ReactNode;
  className?: string;
  isMain?: boolean;
  mainColors?: "icon-yellow" | "icon-green" | "icon-blue" | "icon-purple";
}

export const SemiSectionCard: React.FC<SemiSectionCardProps> = ({
  children,
  icon,
  mainColors,
  titles,
  className,
  isMain
}) => {
  return (
    <div
      className={cn(
        "p-3 rounded-xl text-black bg-grey-sec dark:bg-grey-sec-dark dark:text-white flex items-center gap-1 justify-between",
        className,
        isMain && "flex-col justify-center items-center"
      )}
    >
      {isMain && (
        <p className="text-base font-medium text-text-grey" key={titles[0]}>
          {titles[0]}
        </p>
      )}
      {!isMain && (
        <div className="flex items-center gap-3">
          <div
            className={cn(
              mainColors,
              "p-1 rounded-lg border",
              !mainColors && "bg-grey border-outline text-text-grey dark:bg-grey-dark dark:border-outline-dark"
            )}
          >
            {icon}
          </div>
          <div className="flex flex-col">
            {titles.map((title) => (
              <p className="text-base font-medium" key={title}>
                {title}
              </p>
            ))}
          </div>
        </div>
      )}
      {children}
    </div>
  );
};


const UnitCard: React.FC<UnitCardProps> = ({ unit }) => {

  const expiresTitle = ["1er vencimiento"];
  if (unit.uf_vto2UltimaExpensa && unit.uf_vto2UltimaExpensa.length > 0) {
    expiresTitle.push("2do vencimiento");
  }

  const mostRecentLiquidation = unit.uf_liquidaciones.sort(
    (a: any, b: any) => parseInt(b.orden) - parseInt(a.orden)
  )[0];


  return (
    <div className="w-full flex flex-col gap-2 justify-between p-[10px] rounded-lg border border-outline bg-grey dark:border-outline-dark dark:bg-grey-dark">
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-3 w-full">
          <div className="rounded-md w-14 h-14 flex items-center justify-center border border-outline bg-white dark:bg-grey-sec-dark dark:border-outline-dark">
            <IconBuilding width={32} height={32} className="text-text-grey" />
          </div>
          <div className="flex flex-col gap-[2px] max-w-max w-full">
            <p className="font-semibold truncate">{unit.uf_domiDpto}</p>
            <div className="flex items-center gap-2">
              <span className='text-sm text-text-grey font-medium'>Unidad</span>
              <Pill text={`${unit.uf_nroUnidad} ${unit.uf_codDpto}`} />
              <Pill text={unit.uf_nombrePropietario} className='icon-blue' />
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-[6px] py-1">
          <SemiSectionCard
            isMain
            titles={["Importe a pagar"]}
            key={"Importe a pagar"}
            icon={<IconReceipt2 width={32} height={32} />}
          >
            <p className="pr-2 font-bold text-4xl max-md:text-3xl font-geist">
              {unit.uf_importeTotal}
            </p>
          </SemiSectionCard>
          <SemiSectionCard
            titles={expiresTitle}
            key={"Vencimiento"}
            icon={<IconAlarmAverage width={32} height={32} />}
          >
            <div className="flex flex-col gap-1">
              <Pill text={unit.uf_vtoUltimaExpensa} className="text-base" />
              {unit.uf_vto2UltimaExpensa && (
                <Pill text={unit.uf_vto2UltimaExpensa} className="text-base" />
              )}
            </div>
          </SemiSectionCard>
          {mostRecentLiquidation && (
            <SemiSectionCard
              titles={["Ultima liquidacion"]}
              key={"Ultima liquidacion"}
              icon={<IconMailFast width={32} height={32} />}
            >
              <Link
                target="_blank"
                href={`/file/uf_liquidaciones/${mostRecentLiquidation.id}/${mostRecentLiquidation.nombreAdjunto}`}
              >
                <Pill
                  text={`${mostRecentLiquidation.titulo}`}
                  icon={<AcrobatLogo width={15} height={15}/>}
                  className="text-sm max-md:text-base"
                />
              </Link>
            </SemiSectionCard>
          )}
          {unit.uf_aviso.length > 0 && (
            <SemiSectionCard
              titles={["Aviso de pago"]}
              key={unit.uf_aviso[0].id}
              icon={<IconAlertCircle width={32} height={32} />}
            >
              <Link
                target="_blank"
                href={`/file/uf_aviso/${unit.uf_aviso[0].id}/${unit.uf_aviso[0].nombreAdjunto}`}
              >
                <Pill
                  text={`${unit.uf_aviso[0].titulo}`}
                  className="text-sm max-md:text-base"
                  icon={<AcrobatLogo width={15} height={15}/>}
                />
              </Link>
            </SemiSectionCard>
          )}
        </div>
      </div>
      <div className="flex flex-col gap-3">
        <ShortcutsGrid
          data={shortcuts}
          addShortcuts={false}
          classNameItem="bg-white dark:bg-grey-sec-dark"
          className='gap-[6px]'
        />
        <Link
          href={`/prp/expensas/${unit.uf_id}_${unit.uf_codEdificio}`}
          className="bg-white border border-outline dark:bg-grey-sec-dark dark:border-outline-dark flex items-center justify-center w-full rounded-md py-[6px] gap-1 font-medium"
        >
          Ver mas <IconArrowRight width={18} height={18} />
        </Link>
      </div>
    </div>
  );
}

export default UnitCard