"use client"

import SemiSectionData from "@/components/Sections/AppSections/SemiSection";
import Pill from "@/components/Pill";
import Link from "next/link";
import Shortcuts from "../../../components/Sections/AppSections/ShortcutSection";
import MediaQueryProvider from "@/context/MediaQueryProvider";
import { IconBuilding, IconCalendarExclamation, IconChevronRight, IconCoins, IconExclamationCircle, IconInfoSquareRounded, IconMailExclamation, IconMailFast, IconMailForward, IconReceipt2 } from "@tabler/icons-react";
import { FC, useEffect, useRef } from "react";
import { useInView } from "framer-motion";
import { sisAdmImg } from "@/lib/images";
import { useLayoutStore } from "@/store/useLayoutStore";
import { shortcutsPaymentUnit, shortcutsUnit, unitCard } from "@/lib/contents/(app)/contents";

interface UnitInfoSectionProps {
  unit: any;
}

const UnitInfoSection: FC<UnitInfoSectionProps> = ({ unit }) => {

  const div = useRef(null)
  // const isDivInView = useInView(div);
  // const { handleHasBuilding, setIsInView } = useLayoutStore()

  const expiresTitle = ["1er vencimiento"];
  if (unit.uf_vto2UltimaExpensa && unit.uf_vto2UltimaExpensa.length > 0) {
    expiresTitle.push("2do vencimiento");
  }

  const mostRecentLiquidation = unit.uf_liquidaciones.sort(
    (a: any, b: any) => parseInt(b.orden) - parseInt(a.orden)
  )[0];

  // useEffect(() => {
  //   setIsInView(isDivInView);
  //   if (!isDivInView) {
  //     handleHasBuilding({
  //       direction: unit.uf_domiDpto.split("-")[0],
  //       id: unit.uf_id,
  //       image: sisAdmImg,
  //       unit: `${unit.uf_nroUnidad} ${unit.uf_codDpto}`,
  //     });
  //   }
  // }, [isDivInView, setIsInView, handleHasBuilding, unit])

  return (
    <div className="w-full flex flex-col gap-4">
      <div className="flex flex-col gap-2 py-1">
        <div ref={div}>
          <SemiSectionData title="" type="custom" key={"Unit info"}>
            <div className="flex items-center gap-3 w-full">
              <div className="rounded-[10px] w-14 h-14 flex items-center justify-center border border-outline bg-white dark:bg-grey-sec-dark dark:border-outline-dark">
                <IconBuilding
                  width={32}
                  height={32}
                  className="text-text-grey"
                />
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
          </SemiSectionData>
        </div>
        <SemiSectionData
          type="main"
          title={unitCard.import_to_pay}
          key={unitCard.import_to_pay}
        >
          <p className="font-geist text-4xl font-bold max-md:text-3xl">
            {unit.uf_importeTotal}
          </p>
          <Shortcuts
            display="icon-bg"
            className="mt-2 grid grid-cols-2 w-full gap-2"
            data={shortcutsPaymentUnit}
            mainPath={`/prp/expensas/${unit.uf_id + "_" + unit.uf_codEdificio}`}
          />
        </SemiSectionData>

        <SemiSectionData
          type="simple"
          icon={<IconCoins size={24} className="text-black dark:text-white" />}
          title={unitCard.expense}
          key={unitCard.expense}
        >
          <p className="text-lg font-semibold font-geist">
            $ {unit.uf_importeUltimaExpensa}
          </p>
        </SemiSectionData>

        <SemiSectionData
          type="multiple"
          title={unitCard.debts.title}
          key={unitCard.debts.title}
          icon={
            <IconExclamationCircle
              width={24}
              height={24}
              className="text-black dark:text-white"
            />
          }
          content={[
            {
              title: unitCard.debts[0],
              children: (
                <Pill
                  text={unit.uf_importeExpensasAcumulado}
                  classNameText="text-sm"
                />
              ),
            },
            {
              title: unitCard.debts[1],
              children: (
                <Pill
                  text={unit.uf_importeInteresAcumulado}
                  classNameText="text-sm"
                />
              ),
            },
          ]}
        />

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
                <Pill text={unit.uf_vtoUltimaExpensa} classNameText="text-sm" />
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
      <div className="flex gap-2 max-md:flex-col">
        {mostRecentLiquidation && (
          <Link
            target="_blank"
            href={`/file/uf_liquidaciones/${mostRecentLiquidation.id}/${mostRecentLiquidation.nombreAdjunto}`}
            className="w-full border border-outline dark:border-outline-dark p-2 flex rounded-lg items-center justify-center"
          >
            <div className="flex gap-2">
              <IconMailForward
                width={24}
                height={24}
                className="ios:mr-[6px] android:mr-[6px] text-green"
              />
              <span className="text-base font-medium">Ver Liquidacion</span>
            </div>
          </Link>
        )}
        {unit.uf_aviso.length > 0 && (
          <Link
            target="_blank"
            href={`/file/uf_aviso/${unit.uf_aviso[0].id}/${unit.uf_aviso[0].nombreAdjunto}`}
            className="w-full border border-outline dark:border-outline-dark p-2 flex rounded-lg items-center justify-center"
          >
            <div className="flex gap-2">
              <IconMailExclamation
                width={24}
                height={24}
                className="ios:mr-[6px] android:mr-[6px] text-brown"
              />
              <span className="text-base font-medium">Ver Aviso de pago</span>
            </div>
          </Link>
        )}
      </div>
      <MediaQueryProvider maxWidth={768}>
        <Shortcuts
          mainPath={`/prp/expensas/${unit.uf_id}`}
          data={shortcutsUnit}
          className="grid grid-cols-3 gap-2 w-full"
          display="no-styled"
        />
      </MediaQueryProvider>
    </div>
  );
};

export default UnitInfoSection;