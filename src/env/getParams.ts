const getParams = ({ params, type }: { params: string, type: "id" | "code" }) => {
  const arr = params.split('_')

  if (type === 'id') {
    return arr[0]
  }

  if (type === 'code') {
    return arr[1]
  }

  return params;
}

export default getParams