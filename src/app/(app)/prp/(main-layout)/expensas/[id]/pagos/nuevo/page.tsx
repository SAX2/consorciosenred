import FormSkeleton from '@/components/Skeletons/Form';
import NewPayment from '@/containers/payments-page/new-payment'
import getParams from '@/env/getParams'
import { getUnit } from '@/lib/queries/queries';
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
      <div className="p-3 rounded-xl bg-grey flex justify-between mb-3 dark:bg-grey-dark">
        <p className="text-text-grey font-medium">Importe a pagar</p>
        <p className="font-semibold font-geist">{expenseTotal}</p>
      </div>
    </NewPayment>
  );
}

export default page