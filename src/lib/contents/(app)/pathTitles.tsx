"use client"

import { useParams } from "next/navigation"

export const getPathsAndTitles = () => {
  const params = useParams()
  
  return [
    {
      title: "Mis expensas",
      paths: [`/prp/expensas/`, `/prp/expensas/${params.id}`]
    },
    {
      title: "Novedades",
      paths: [`/prp/expensas/${params.id}/novedades`]
    },
    {
      title: "Reclamos",
      paths: [`/prp/expensas/${params.id}/reclamos`, `/prp/expensas/${params.id}/reclamos/${params.rclid}`]
    },
    {
      title: "Juicios",
      paths: [`/prp/expensas/${params.id}/juicios`]
    },
    {
      title: "Asambleas",
      paths: [`/prp/expensas/${params.id}/asambleas`]
    },
    {
      title: "Reglamento",
      paths: [`/prp/expensas/${params.id}/reglamento`]
    },
  ];
}