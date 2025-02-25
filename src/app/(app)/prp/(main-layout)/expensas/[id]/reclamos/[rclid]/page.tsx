import React from 'react'
import RclDetails from 'app/features/Issues/Details'
import getParams from '@/env/getParams';
import { getUnitIssues } from '@/lib/queries/queries';
import EmptySection from '@/components/Sections/AppSections/Errors/EmptySection';

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