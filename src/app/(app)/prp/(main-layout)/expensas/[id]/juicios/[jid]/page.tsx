import JudgmentDetails from 'app/features/Judgement/Details';
import getParams from 'app/hooks/use-get-params';
import { getUnitJudgments } from "app/services/queries";
import React from 'react'

const page = async ({ params }: { params: { jid: string; id: string } }) => {
  const code = getParams({ params: params.id, type: "code" })
  const id = getParams({ params: params.id, type: "id" })
  const data = await getUnitJudgments({ code, id: params.jid, pin: id })

  return (
    <JudgmentDetails data={data} param={params.id} />
  )
}

export default page