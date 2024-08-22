import Link from "next/link";
import Pill from "@/components/Pill";
import SemiSection from "@/components/Sections/AppSections/SemiSection";
import Shortcuts from "@/containers/expenses-page/shortcut-section";
import { AcrobatLogo } from "@/lib/icons";
import { IconAlarmAverage, IconAlertCircle, IconArrowRight, IconBuilding, IconMailFast, IconReceipt2 } from "@tabler/icons-react";
import { FC } from "react";

interface UnitCardProps {
  unit: any;
}

const UnitCard: FC<UnitCardProps> = ({ unit }) => {

  const expiresTitle = ["1er vencimiento"];
  if (unit.uf_vto2UltimaExpensa && unit.uf_vto2UltimaExpensa.length > 0) {
    expiresTitle.push("2do vencimiento");
  }

  const mostRecentLiquidation = unit.uf_liquidaciones.sort(
    (a: any, b: any) => parseInt(b.orden) - parseInt(a.orden)
  )[0];


  return (
    <div className="w-full flex flex-col gap-2 justify-between p-3 rounded-xl border-outline bg-grey dark:border-outline-dark dark:bg-grey-dark">
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
          <SemiSection
            isMain
            titles={["Importe a pagar"]}
            key={"Importe a pagar"}
            icon={<IconReceipt2 width={32} height={32} />}
          >
            <p className="pr-2 font-bold text-4xl max-md:text-3xl font-geist">
              {unit.uf_importeTotal}
            </p>
          </SemiSection>
          <SemiSection
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
          </SemiSection>
          {mostRecentLiquidation && (
            <SemiSection
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
            </SemiSection>
          )}
          {unit.uf_aviso.length > 0 && (
            <SemiSection
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
            </SemiSection>
          )}
        </div>
      </div>
      <div className="flex flex-col gap-3">
        <Shortcuts
          mainPath={`/prp/expensas/${unit.uf_id}_${unit.uf_codEdificio}`}
          classNameItem="bg-white dark:bg-grey-sec-dark"
          className='gap-[6px]'
        />
        <Link
          scroll={true}
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