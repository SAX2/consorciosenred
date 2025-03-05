"use client"

import React, { FC } from "react";
import { content } from "./content";
import SemiSection from "app/components/Sections/SemiSection";
import { IconBellRinging, IconCoins } from "@tabler/icons-react";
import TimeLine from "app/components/Sections/Timeline";
import Button from "app/components/Buttons/Button";

interface PayHbScrenProps {
  unit: any;
  data: {
    description: string;
    codigo: string;
    imagen: string;
    barCode: string;
  };
  id: string
}

const PayHbScreen: FC<PayHbScrenProps> = ({ data, unit, id }) => {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-3">
        <p className="text-text-grey">{content.bank}</p>
        <SemiSection type="custom" title="" className="flex flex-col gap-3">
          {content.expires(unit.uf_vtoUltimaExpensa)}
        </SemiSection>
        <SemiSection
          type="simple"
          title={"Importe total a pagar"}
          key={"Importe a pagar"}
          icon={<IconCoins size={24} />}
        >
          <p className="text-lg font-semibold">{unit.uf_importeTotal}</p>
        </SemiSection>
      </div>
      <div className="flex flex-col gap-3">
        <p className="font-semibold text-2xl">{content.timeline.title}</p>
        <TimeLine
          items={content.timeline.items(data.barCode)}
          classNameItemContainer="flex-1"
          gap="gap-3"
          itemPadding="pb-8"
        />
      </div>
      <div className="flex flex-col gap-3">
        <Button
          href={`/prp/expensas/${id}/pagos/nuevo`}
          title="Notificar pago"
          classNameText="text-blue-button"
          icon={<IconBellRinging size={22} className="text-blue-button" />}
          textSize="text-lg"
          buttonBackground=""
          classNameContainer="border border-outline dark:border-outline-dark"
        />
      </div>
    </div>
  );
};

export default PayHbScreen;