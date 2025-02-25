import EmptySection from 'app/components/Messages/EmptySection'
import JudgmentsScreen from 'app/features/Judgement/List'
import getParams from 'app/hooks/use-get-params'
import { getUnitJudgments } from "app/services/queries"
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