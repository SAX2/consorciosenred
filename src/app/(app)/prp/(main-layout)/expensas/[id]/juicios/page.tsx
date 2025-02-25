import EmptySection from '@/components/Sections/AppSections/Errors/EmptySection'
import JudgmentsScreen from 'app/features/Judgement/List'
import getParams from '@/env/getParams'
import { getUnitJudgments } from '@/lib/queries/queries'
import React from 'react'

const page = async ({ params }: { params: { id: string } }) => {
  const code = getParams({ params: params.id, type: "code" })
  const data = await getUnitJudgments({ code })

  if (data.juiciosPorEdificio.length === 0) {
    return <EmptySection />
  }

  return (
    <JudgmentsScreen data={data.juiciosPorEdificio} param={params.id} />
  )
}

export default page