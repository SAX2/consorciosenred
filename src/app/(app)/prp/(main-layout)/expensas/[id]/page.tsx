import { SemiSectionCard } from '@/app/(app)/components/cards/UnitCard';
import TitleSection from '@/app/(app)/components/sections/TitleSection';
import Pill from '@/components/pill/Pill';
import getParams from '@/lib/hooks/getParams';
import { acrobatLogo } from '@/lib/images';
import { getUnit } from '@/lib/queries/queries';
import { IconAlarmAverage, IconAlertCircle, IconBuilding, IconCoins, IconInfoSquareRounded, IconMailFast, IconReceipt2 } from '@tabler/icons-react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'

const UnitInfo = ({ unit }: { unit: any }) => {
  const expiresTitle = ["1er vencimiento"];
  if (unit.uf_vto2UltimaExpensa && unit.uf_vto2UltimaExpensa.length > 0) {
    expiresTitle.push("2do vencimiento");
  }

  return (
    <div className="w-full flex flex-col gap-4">
      <div className="flex items-center gap-3 w-full">
        <div className="rounded-md w-14 h-14 flex items-center justify-center bg-grey-sec dark:bg-grey-sec-dark">
          <IconBuilding width={32} height={32} className="text-text-grey" />
        </div>
        <div className="flex flex-col gap-[2px] max-w-max w-full">
          <h3 className="font-semibold truncate text-lg">{unit.uf_domiDpto}</h3>
          <div className="flex items-center gap-2">
            <Pill text={`${unit.uf_nroUnidad} ${unit.uf_codDpto}`} />
            <span className="text-sm text-black/75 dark:text-white/75 truncate">
              {unit.uf_nombrePropietario}
            </span>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-3 py-1">
        <SemiSectionCard
          className="bg-grey border border-outline  dark:bg-grey-dark dark:border-outline-dark"
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
          className="bg-grey border border-outline  dark:bg-grey-dark dark:border-outline-dark"
          titles={["Expensas del mes"]}
          key={"Expensas del mes"}
          icon={<IconCoins width={32} height={32} />}
          mainColors="icon-green"
        >
          <span className="pr-2 font-medium text-lg">
            {unit.uf_importeUltimaExpensa.includes("$")
              ? unit.uf_importeUltimaExpensa
              : `$ ${unit.uf_importeUltimaExpensa}`}
          </span>
        </SemiSectionCard>
        <SemiSectionCard
          className="bg-grey border border-outline  dark:bg-grey-dark dark:border-outline-dark"
          titles={["Expensas adeudadas", "Intereses acumulados"]}
          key={"Intereses"}
          icon={<IconInfoSquareRounded width={32} height={32} />}
          mainColors="icon-yellow"
        >
          <div className="flex flex-col gap-1">
            <Pill text={unit.uf_importeExpensasAcumulado} className="text-sm" />
            <Pill text={unit.uf_importeInteresAcumulado} className="text-sm" />
          </div>
        </SemiSectionCard>
        <SemiSectionCard
          className="bg-grey border border-outline  dark:bg-grey-dark dark:border-outline-dark"
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
        {unit.uf_liquidaciones[0] && (
          <SemiSectionCard
            className="bg-grey border border-outline  dark:bg-grey-dark dark:border-outline-dark"
            titles={["Ultima liquidacion"]}
            key={"Ultima liquidacion"}
            icon={<IconMailFast width={32} height={32} />}
            mainColors="icon-yellow"
          >
            <Link
              target="_blank"
              href={`/file/uf_liquidaciones/${unit.uf_liquidaciones[0].id}/${unit.uf_liquidaciones[0].nombreAdjunto}`}
            >
              <Pill
                text={`${unit.uf_liquidaciones[0].titulo}`}
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
        {unit.uf_aviso.length > 0 && (
          <SemiSectionCard
            className="bg-grey border border-outline  dark:bg-grey-dark dark:border-outline-dark"
            titles={["Aviso de pago"]}
            key={unit.uf_aviso[0].id}
            icon={<IconAlertCircle width={32} height={32} />}
            mainColors="icon-green"
          >
            <Link
              target="_blank"
              href={`/file/uf_aviso/${unit.uf_aviso[0].id}/${unit.uf_aviso[0].nombreAdjunto}`}
            >
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
  );
};

const page = async ({ params: { id } }: { params: { id: string } }) => {
  const unitId = getParams({ params: id, type: "id" });
  
  const data = await getUnit({ id: unitId });

  if (data.length <= 0) return <div>Not found</div>;

  return (
    <div className="flex flex-col gap-8">
      <TitleSection
        pageTitle="Mis expensas"
        className="w-full col-span-1 pb-8 max-md:pb-0 mt-0"
        backUrl={true}
        isFirst={true}
        unitPage
        // link={{ href: "/expensas", title: "Ver todos los edificios" }}
      >
        <UnitInfo unit={data[0]} key={data[0].uf_id} />
      </TitleSection>
      <TitleSection
        title="Histórico de Expensas"
        className="w-full col-span-1 pb-8 max-md:pb-0 mt-0"
        pills={[{ text: data[0].uf_liquidaciones.length }]}
        unitPage
        // link={{ href: "/expensas", title: "Ver todos los edificios" }}
      >
        table
      </TitleSection>
    </div>
  );
};

export default page