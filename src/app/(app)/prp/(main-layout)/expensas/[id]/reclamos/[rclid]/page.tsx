import React from 'react'
import NoResult from '@/containers/errors/no-result';
import RclDetails from '@/containers/rcl-page/rcl-details'
import getParams from '@/env/getParams';
import { getUnitIssues } from '@/lib/queries/queries';

const page = async ({ params: { rclid, id } }: { params: { rclid: string, id: string } }) => {
  const unitCode = getParams({ params: id, type: "code" });

  if (!unitCode) return null;

  const data = await getUnitIssues({ code: unitCode, id: rclid });

  if (data.length === 0) {
    return <NoResult message={'No se han encontrado resultados'}/>
  }

  const details = data && (data.rclDpto.length === 0 ? data.rclEdif : data.rclDpto)

  return (
    <RclDetails data={details} />
  )
}

export default page