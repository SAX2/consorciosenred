"use client"

import SemiSection from "@/components/Sections/AppSections/SemiSection";
import Pill from "@/components/Pill";
import Link from "next/link";
import Shortcuts from "../shortcut-section";
import MediaQueryProvider from "@/context/MediaQueryProvider";
import { AcrobatLogo } from "@/lib/icons";
import { IconAlarmAverage, IconAlertCircle, IconBuilding, IconCoins, IconInfoSquareRounded, IconMailFast, IconReceipt2 } from "@tabler/icons-react";
import { FC, useEffect, useRef } from "react";
import { useInView } from "framer-motion";
import Image from "next/image";
import { sisAdmImg } from "@/lib/images";
import { useLayoutStore } from "@/store/useLayoutStore";
import { shortcuts, shortcutsPayemnt } from "../shortcut-section/contents";

interface UnitInfoSectionProps {
  unit: any;
}

const UnitInfoSection: FC<UnitInfoSectionProps> = ({ unit }) => {

  const div = useRef(null)
  const isDivInView = useInView(div);
  const { handleHasBuilding, setIsInView } = useLayoutStore()

  const expiresTitle = ["1er vencimiento"];
  if (unit.uf_vto2UltimaExpensa && unit.uf_vto2UltimaExpensa.length > 0) {
    expiresTitle.push("2do vencimiento");
  }

  useEffect(() => {
    setIsInView(isDivInView);
    if (!isDivInView) {
      handleHasBuilding({
        direction: unit.uf_domiDpto.split("-")[0],
        id: unit.uf_id,
        image: sisAdmImg,
        unit: `${unit.uf_nroUnidad} ${unit.uf_codDpto}`,
      });
    }
  }, [isDivInView])

  return (
    <div className="w-full flex flex-col gap-4">
      <div className="flex flex-col gap-2 py-1">
        <div ref={div}>
          <SemiSection
            custom={true}
            titles={[""]}
            className="bg-grey border-outline  dark:bg-grey-dark dark:border-outline-dark flex-col items-start gap-2"
            key={"Importe a pagar"}
          >
            <div className="flex justify-start gap-3 items-start  max-[425px]:flex-col max-[425px]:items-center w-full">
              <div className="flex items-center justify-center bg-grey-sec dark:bg-grey-sec-dark h-fit">
                <Image
                  src={sisAdmImg}
                  alt="Icono de unidad"
                  className="rounded-xl"
                  width={50}
                  height={50}
                />
              </div>
              <div className="flex flex-col gap-[6px] max-w-max w-full max-[425px]:items-center">
                <Pill
                  text={unit.uf_nombrePropietario}
                  className="icon-blue py-[1px]"
                />
                <div className="flex flex-col gap-0 max-[425px]:items-center">
                  <h3 className="font-semibold text-lg leading-tight max-[425px]:text-center">
                    {unit.uf_domiDpto}
                  </h3>
                  <div className="flex items-center gap-2">
                    <span>Unidad</span>
                    <Pill
                      text={`${unit.uf_nroUnidad} ${unit.uf_codDpto}`}
                      className="py-[1px]"
                    />
                  </div>
                </div>
              </div>
            </div>
          </SemiSection>
        </div>
        <SemiSection
          isMain
          className="bg-grey border-outline  dark:bg-grey-dark dark:border-outline-dark"
          titles={["Importe a pagar"]}
          key={"Importe a pagar"}
          icon={<IconReceipt2 width={32} height={32} />}
        >
          <p className="pr-2 font-bold text-4xl max-md:text-3xl font-geist">
            {unit.uf_importeTotal}
          </p>
          <div className="mt-2 w-full">
            <Shortcuts
              mainPath={`/prp/expensas/${unit.uf_id}`}
              data={shortcutsPayemnt}
              className="max-[350px]:grid-cols-1 gap-1"
              classNameItem="bg-white dark:bg-grey-sec-dark"
            />
          </div>
        </SemiSection>
        <SemiSection
          className="bg-grey border-outline  dark:bg-grey-dark dark:border-outline-dark"
          titles={["Expensas del mes"]}
          key={"Expensas del mes"}
          icon={<IconCoins width={32} height={32} />}
          mainColors="icon-green max-md:dark:bg-grey-sec-dark max-md:dark:border-outline-dark max-md:dark:text-text-grey"
        >
          <span className="pr-2 font-medium text-lg">
            {unit.uf_importeUltimaExpensa.includes("$")
              ? unit.uf_importeUltimaExpensa
              : `$${unit.uf_importeUltimaExpensa}`}
          </span>
        </SemiSection>
        <SemiSection
          className="bg-grey border-outline dark:bg-grey-dark dark:border-outline-dark"
          titles={["Expensas adeudadas", "Intereses acumulados"]}
          key={"Intereses"}
          icon={<IconInfoSquareRounded width={32} height={32} />}
          mainColors="icon-yellow max-md:dark:bg-grey-sec-dark max-md:dark:border-outline-dark max-md:dark:text-text-grey"
        >
          <div className="flex flex-col gap-1">
            <Pill
              text={unit.uf_importeExpensasAcumulado}
              className="text-base truncate"
            />
            <Pill
              text={unit.uf_importeInteresAcumulado}
              className="text-base truncate"
            />
          </div>
        </SemiSection>
        <SemiSection
          className="bg-grey border-outline  dark:bg-grey-dark dark:border-outline-dark"
          titles={expiresTitle}
          key={"Vencimiento"}
          icon={<IconAlarmAverage width={32} height={32} />}
          mainColors="icon-purple max-md:dark:bg-grey-sec-dark max-md:dark:border-outline-dark max-md:dark:text-text-grey"
        >
          <div className="flex flex-col gap-1">
            <Pill
              text={unit.uf_vtoUltimaExpensa}
              className="text-base truncate"
            />
            {unit.uf_vto2UltimaExpensa && (
              <Pill
                text={unit.uf_vto2UltimaExpensa}
                className="text-base truncate"
              />
            )}
          </div>
        </SemiSection>
        {unit.uf_liquidaciones[0] && (
          <SemiSection
            className="bg-grey border-outline  dark:bg-grey-dark dark:border-outline-dark"
            titles={["Ultima liquidacion"]}
            key={"Ultima liquidacion"}
            icon={<IconMailFast width={32} height={32} />}
            mainColors="icon-blue max-md:dark:bg-grey-sec-dark max-md:dark:border-outline-dark max-md:dark:text-text-grey"
          >
            <Link
              target="_blank"
              href={`/file/uf_liquidaciones/${unit.uf_liquidaciones[0].id}/${unit.uf_liquidaciones[0].nombreAdjunto}`}
            >
              <Pill
                text={`${unit.uf_liquidaciones[0].titulo}`}
                icon={<AcrobatLogo width={15} height={15} />}
                className="text-base truncate"
              />
            </Link>
          </SemiSection>
        )}
        {unit.uf_aviso.length > 0 && (
          <SemiSection
            className="bg-grey border-outline  dark:bg-grey-dark dark:border-outline-dark"
            titles={["Aviso de pago"]}
            key={unit.uf_aviso[0].id}
            icon={<IconAlertCircle width={32} height={32} />}
            mainColors="icon-yellow max-md:dark:bg-grey-sec-dark max-md:dark:border-outline-dark max-md:dark:text-text-grey"
          >
            <Link
              target="_blank"
              href={`/file/uf_aviso/${unit.uf_aviso[0].id}/${unit.uf_aviso[0].nombreAdjunto}`}
            >
              <Pill
                text={`${unit.uf_aviso[0].titulo}`}
                icon={<AcrobatLogo width={15} height={15} />}
                className="text-base truncate"
              />
            </Link>
          </SemiSection>
        )}
      </div>
      <MediaQueryProvider maxWidth={768}>
        <Shortcuts
          mainPath={`/prp/expensas/${unit.uf_id}`}
          data={shortcuts}
          classNameItem="bg-white dark:bg-grey-sec-dark max-[350px]:col-span-1"
          className="gap-[6px] !max-[350px]:grid-cols-1"
        />
      </MediaQueryProvider>
    </div>
  );
};

export default UnitInfoSection;