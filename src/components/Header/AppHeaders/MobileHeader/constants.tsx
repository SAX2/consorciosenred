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
      paths: [`/prp/expensas/${params.id}/reclamos`]
    },
        {
      title: "Reclamos / Nuevo",
      paths: [`/prp/expensas/${params.id}/reclamos/nuevo`]
    },
    {
      title: "Pagos",
      paths: [`/prp/expensas/${params.id}/pagos`, `/prp/expensas/${params.id}/pagos/nuevo`]
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
    {
      title: "Reservas",
      paths: [`/prp/expensas/${params.id}/reservas`]
    },
  ];
}