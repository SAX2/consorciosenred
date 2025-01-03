import JudgmentsScreen from '@/containers/judgements-page/judgements'
import getParams from '@/env/getParams'
import { getUnitJudgments } from '@/lib/queries/queries'
import React from 'react'

const page = async ({ params }: { params: { id: string } }) => {
  const code = getParams({ params: params.id, type: "code" })
  const data = await getUnitJudgments({ code })

  return (
    <JudgmentsScreen data={data.juiciosPorEdificio} param={params.id} />
  )
}

export default page