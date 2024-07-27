import { IconAlarmAverage, IconAlertCircle, IconArrowRight, IconBuilding, IconFileAlert, IconMailFast, IconReceipt2 } from '@tabler/icons-react';
import Pill from '@/components/pill/Pill';
import React from 'react'
import { cn } from '@/lib/utils';
import Image from 'next/image';
import { acrobatLogo } from '@/lib/images';
import Link from 'next/link';

interface UnitCardProps {
  unit: any;
}

interface SemiSectionCardProps {
  titles: string[];
  mainColors: "icon-yellow" | "icon-green" | "icon-blue" | "icon-purple";
  icon: React.ReactElement;
  children: React.ReactNode;
}

const SemiSectionCard: React.FC<SemiSectionCardProps> = ({
  children,
  icon,
  mainColors,
  titles,
}) => {
  return (
    <div className="p-3 rounded-lg border-outline-dark text-black bg-grey-sec dark:bg-grey-sec-dark dark:text-white flex items-center gap-1 justify-between">
      <div className="flex items-center gap-3">
        <div className={cn(mainColors, "p-1 rounded-md border")}>{icon}</div>
        <div className='flex flex-col'>
          {titles.map((title) => (
            <p className="text-md">{title}</p>
          ))}
        </div>
      </div>
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
    <div className="w-full flex flex-col gap-3 justify-between p-[10px] rounded-lg border border-outline bg-grey dark:border-outline-dark dark:bg-grey-dark">
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-3 w-full">
          <div className="rounded-md w-14 h-14 flex items-center justify-center bg-grey-sec dark:bg-grey-sec-dark">
            <IconBuilding width={32} height={32} className="text-text-grey" />
          </div>
          <div className="flex flex-col gap-[2px] max-w-max w-full">
            <p className="font-medium truncate">{unit.uf_domiDpto}</p>
            <div className="flex items-center gap-2">
              <Pill text={`${unit.uf_nroUnidad} ${unit.uf_codDpto}`} />
              <span className="text-sm text-black/75 dark:text-white/75 truncate">
                {unit.uf_nombrePropietario}
              </span>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-2 py-1">
          <SemiSectionCard
            titles={["Importe a pagar"]}
            key={"Importe a pagar"}
            icon={<IconReceipt2 width={32} height={32} />}
            mainColors="icon-blue"
          >
            <span className="pr-2 font-medium text-lg">
              {unit.uf_importeTotal}
            </span>
          </SemiSectionCard>
          <SemiSectionCard
            titles={expiresTitle}
            key={"Vencimiento"}
            icon={<IconAlarmAverage width={32} height={32} />}
            mainColors="icon-purple"
          >
            <div className="flex flex-col gap-1">
              <Pill text={unit.uf_vtoUltimaExpensa} className="text-sm" />
              {unit.uf_vto2UltimaExpensa && (
                <Pill text={unit.uf_vto2UltimaExpensa} className="text-sm" />
              )}
            </div>
          </SemiSectionCard>
          <SemiSectionCard
            titles={["Ultima liquidacion"]}
            key={"Ultima liquidacion"}
            icon={<IconMailFast width={32} height={32} />}
            mainColors="icon-yellow"
          >
            <Link target='_blank' href={`/file/uf_liquidaciones/${mostRecentLiquidation.id}/${mostRecentLiquidation.nombreAdjunto}`}>
              <Pill
                text={`${mostRecentLiquidation.titulo}`}
                icon={
                  <Image
                    src={acrobatLogo}
                    width={15}
                    height={15}
                    alt="pdf logo"
                  />
                }
                className="text-sm"
              />
            </Link>
          </SemiSectionCard>
          {unit.uf_aviso.length > 0 && (
            <SemiSectionCard
              titles={["Aviso de pago"]}
              key={unit.uf_aviso[0].id}
              icon={<IconAlertCircle width={32} height={32} />}
              mainColors="icon-green"
            >
              <Link target='_blank' href={`/file/uf_aviso/${unit.uf_aviso[0].id}/${unit.uf_aviso[0].nombreAdjunto}`}>
                <Pill
                  text={`${unit.uf_aviso[0].titulo}`}
                  icon={
                    <Image
                      src={acrobatLogo}
                      width={15}
                      height={15}
                      alt="pdf logo"
                    />
                  }
                  className="text-sm"
                />
              </Link>
            </SemiSectionCard>
          )}
        </div>
      </div>
      <Link
        href={`/expensas/uni/${unit.uf_id}?cde=${unit.uf_codEdificio}`}
        className="bg-grey-sec border border-outline dark:bg-grey-sec-dark dark:border-outline-dark flex items-center justify-center w-full rounded-md py-2 gap-1 font-medium"
      >
        Mas informacion <IconArrowRight width={18} height={18} />
      </Link>
    </div>
  );
}

export default UnitCard