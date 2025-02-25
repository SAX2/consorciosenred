import React from 'react'
import RclDetails from 'app/features/Issues/Details'
import getParams from 'app/hooks/use-get-params';
import { getUnitIssues } from "app/services/queries";
import EmptySection from 'app/components/Messages/EmptySection';

const page = async ({ params: { rclid, id } }: { params: { rclid: string, id: string } }) => {
  const unitCode = getParams({ params: id, type: "code" });

  if (!unitCode) return null;

  const data = await getUnitIssues({ code: unitCode, id: rclid });

  if (data.length === 0) {
    return <EmptySection title={'No se han encontrado resultados'}/>
  }

  const details = data && (data.rclDpto.length === 0 ? data.rclEdif : data.rclDpto)

  return (
    <RclDetails data={details} />
  )
}

export default page