"use client"

import { ButtonProps } from "../../../../packages/components/Buttons/Button";
import { IconBellRinging, IconPlus } from "@tabler/icons-react";
import { useParams } from "next/navigation"
import React from "react";

type HeaderPath = {
  isSubroute?: boolean;
  backPaths?: {
    title: string;
    path: string;
  }[];
  title: string;
  paths: string[];
  rightContent?: {
    isButton?: boolean;
    component?: React.ReactNode;
    button?: ButtonProps;
  };
};

export const usePathsAndTitles = () => {
  const params = useParams()
  
  const customButton: ButtonProps = {
    buttonPadding: "py-1 px-2",
    classNameContainer: "!rounded-md",
  }

  return [
    {
      title: "Mis expensas",
      paths: [`/prp/expensas`, `/prp/expensas/${params.id}`],
    },
    {
      title: "Novedades",
      paths: [`/prp/expensas/${params.id}/novedades`],
    },
    {
      title: "Reclamos",
      paths: [`/prp/expensas/${params.id}/reclamos`],
      rightContent: {
        isButton: true,
        button: {
          ...customButton,
          title: "Hacer un reclamo",
          iconOrientation: "right",
          icon: <IconPlus size={24} className="text-orange-icon" />,
          classNameText: "text-orange-icon",
          buttonBackground: "hover:bg-orange-icon/10",
          href: `/prp/expensas/${params.id}/reclamos/nuevo`,
        },
      },
    },
    {
      isSubroute: true,
      backPaths: [
        { path: `/prp/expensas/${params.id}/reclamos`, title: "Reclamos" },
      ],
      title: "Reclamo",
      paths: [`/prp/expensas/${params.id}/reclamos/${params.rclid}`],
      rightContent: {
        isButton: true,
        button: {
          ...customButton,
          title: "Hacer un reclamo",
          iconOrientation: "right",
          icon: <IconPlus size={24} className="text-orange-icon" />,
          classNameText: "text-orange-icon",
          buttonBackground: "hover:bg-orange-icon/10",
          href: `/prp/expensas/${params.id}/reclamos/nuevo`,
        },
      },
    },
    {
      isSubroute: true,
      backPaths: [{ path: `/prp/expensas/${params.id}/reclamos`, title: "Reclamos" }],
      title: "Nuevo reclamo",
      paths: [`/prp/expensas/${params.id}/reclamos/nuevo`],
    },
    {
      title: "Pagos",
      paths: [`/prp/expensas/${params.id}/pagos`],
      rightContent: {
        isButton: true,
        button: {
          ...customButton,
          title: "Notificar pago",
          iconOrientation: "right",
          icon: <IconBellRinging size={24} className="text-blue-button" />,
          classNameText: "text-blue-button",
          buttonBackground: "hover:bg-blue-button/10",
          href: `/prp/expensas/${params.id}/pagos/nuevo`,
        },
      },
    },
    {
      isSubroute: true,
      backPaths: [{ path: `/prp/expensas/${params.id}/pagos`, title: "Pagos" }],
      title: "Notificar pago",
      paths: [`/prp/expensas/${params.id}/pagos/nuevo`],
    },
    {
      title: "Juicios",
      paths: [`/prp/expensas/${params.id}/juicios`],
    },
    {
      title: "Detalles del juicio",
      isSubroute: true,
      backPaths: [
        { path: `/prp/expensas/${params.id}/juicios`, title: "Juicios" },
      ],
      paths: [`/prp/expensas/${params.id}/juicios/${params.jid}`],
    },
    {
      title: "Asambleas",
      paths: [`/prp/expensas/${params.id}/asambleas`],
    },
    {
      title: "Reglamento",
      paths: [`/prp/expensas/${params.id}/reglamento`],
    },
    {
      title: "Reservas",
      paths: [`/prp/expensas/${params.id}/reservas`],
      rightContent: {
        isButton: true,
        button: {
          ...customButton,
          title: "Nueva reserva",
          iconOrientation: "right",
          icon: <IconPlus size={24} className="text-green" />,
          classNameText: "text-green",
          buttonBackground: "hover:bg-green/10",
          href: `/prp/expensas/${params.id}/reservas/reservar`,
        },
      },
    },
    {
      isSubroute: true,
      backPaths: [
        { path: `/prp/expensas/${params.id}/reservas`, title: "Reservas" },
      ],
      title: "Reservar",
      paths: [`/prp/expensas/${params.id}/reservas/reservar`],
    },
    {
      isSubroute: true,
      backPaths: [
        { path: `/prp/expensas/${params.id}/reservas`, title: "Reservas" },
        {
          path: `/prp/expensas/${params.id}/reservas/reservar`,
          title: "Reservar",
        },
      ],
      title: params.group,
      paths: [`/prp/expensas/${params.id}/reservas/reservar/${params.group}`],
    },
  ] as HeaderPath[];
}