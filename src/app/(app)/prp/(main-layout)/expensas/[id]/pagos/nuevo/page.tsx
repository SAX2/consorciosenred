import NewPayment, { AccordionNewPaymentDetails } from 'app/features/Payments/Create'
import getParams from 'app/hooks/use-get-params'
import { getUnit } from "app/services/queries";
import { notFound } from 'next/navigation';
import React from 'react'

const page = async ({ params: { id } }: { params: { id: string } }) => {
  const unitId = getParams({ params: id, type: "id" });

  const data = await getUnit({ id: unitId });

  if (data.length <= 0) return notFound();

  const unit = data[0]
  const expenseTotal = unit.uf_importeTotal as string;
  const expirationDates = [unit.uf_vtoUltimaExpensa, unit.uf_vto2UltimaExpensa]

  return (
    <NewPayment
      totalImport={parseFloat(
        expenseTotal.split(" ")[1].replace(".", "").replace(",", ".")
      )}
      unitId={unitId}
      unitCode={unit.uf_codEdificio}
    >
      <AccordionNewPaymentDetails unit={unit} id={id}/>
    </NewPayment>
  );
}

export default page