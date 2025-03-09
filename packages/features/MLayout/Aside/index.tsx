"use client"

import { FC, PropsWithChildren } from 'react'
import { useParams } from 'next/navigation';

const AsideHome: FC<PropsWithChildren> = ({ children }) => {
  const params = useParams();

  if (!params.id) return children;
}

export default AsideHome