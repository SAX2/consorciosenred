"use client";

import { IconAlertCircleFilled, IconChevronLeft } from "@tabler/icons-react";
import Button from "app/components/Buttons/Button";
import DialogMessage from "app/components/Dialogs/Message";
import Input from "app/components/Form/Input";
import InputSubmit from "app/components/Form/InputSubmit";
import SemiSection from "app/components/Sections/SemiSection";
import { cn } from "app/lib/utils";
import { getUser } from "app/services/queries";
import { InputSubmitStatus, User, UserQueryBody } from "app/types/globals";
import React, { ChangeEvent, FC, useState, useTransition } from "react";
import { content } from "./content";
import { logoutHandler } from "app/services/auth";
import { z, ZodFormattedError } from "zod";
import { parsePreguntaPersonal } from "../Edit/content";

interface UserEditProps {
  user: User;
}

const Rcl = z.object({
  // importe: z.number().min(1, "Debe ingresar una cantidad mayor a $0"),
  // fecha: z.date({ required_error: "Selecciona una fecha" }),
  // comentario: z.string({ invalid_type_error: "La 'Descripción' debe ser un texto válido." }),
  // adjuntos: z.array(z.string()).min(1, { message: "Es obligatório que envíe una foto del comprobante" }),
  // pagoTotal: z.boolean(),

  idUsrOrg: z.string().optional(),
  apellido: z.string().optional(),
  nombre: z.string().optional(),
  email: z.string().optional(),
  preguntaPersonal: z.string().optional(),
  respuestaPersonal: z.string().optional(),
  fechaNac: z.string().optional(),
  profesion: z.string().optional(),
  telefono: z.string().optional(),
  booNewClave: z.boolean(),
  newClave: z.string({ required_error: "Debe introducir un texto para continuar" }).min(4, { message:  "La clave debe tener al menos 4 caracteres" }),
  newClaveConfirma: z.string({ required_error: "Debe introducir un texto para continuar" }).min(4, { message:  "La clave debe tener al menos 4 caracteres" }),
}).superRefine(({ newClave, newClaveConfirma }, ctx) => {
  console.log(newClaveConfirma !== newClave)

  if (newClaveConfirma !== newClave) {
    ctx.addIssue({
      code: "custom",
      message: "Las contraseñas no coinciden",
      path: ['newClaveConfirma']
    });
  }
});;

type RclFormValues = z.infer<typeof Rcl>;
type RclFormErrors = ZodFormattedError<RclFormValues>;

const UserEditPassword: FC<UserEditProps> = ({ user }) => {
  const [userBody, setUserBody] = React.useState<RclFormValues>({
    idUsrOrg: user.idUsrOrg,
    apellido: user.apellido,
    nombre: user.nombre,
    email: user.email,
    preguntaPersonal: parsePreguntaPersonal(user.preguntaPersonal),
    respuestaPersonal: user.respuestaPersonal,
    fechaNac: user.fechaNac,
    profesion: user.profesion,
    telefono: user.telefono,
    booNewClave: true,
    newClave: "",
    newClaveConfirma: "",
  });

  const [errors, setErrors] = useState<Partial<RclFormErrors>>({});
  const [isPending, startTransition] = useTransition();
  const [state, setState] = useState<{ state: InputSubmitStatus, value?: string } | undefined>();

  const [isOpenModal, setIsOpenModal] = useState<boolean>(false)

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const result = Rcl.safeParse(userBody);

    if (result.success) {
      startTransition(async () => {
        const res = await getUser({ query: userBody as UserQueryBody });
        
        if (res.DatosModificadosError.length > 0) {
          return setState({ state: "error", value: res.DatosModificadosError });
        }
        
        if (res.DatosModificados) {
          setState({ state: "success", value: "Se han modificado los datos correctamente" })
          return logoutHandler()
        } 
  
        return setState({ state:   "error", value: "Ha ocurrido un error al modificar los datos" });
      })
  
      setErrors({});
    }
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUserBody((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  }

  const handleClick = () => {
    const result = Rcl.safeParse(userBody);

    if (!result.success) {
      setErrors(result.error.format());
      return;
    }

    if (result.success) {
      setErrors({})
      setIsOpenModal(prev => !prev)
    }
  }

  return (
    <div className="flex flex-col gap-4 max-md:p-4">
      <Input
        placeholder="Nombre de usuario"
        label="Nombre de usuario"
        id="nombre"
        disabled
        value={userBody.nombre}
        />
      <Input
        placeholder="Coloque la contraseña que desea crear"
        label="*Nueva contraseña"
        id="newClave"
        onChange={handleChange}
        value={userBody.newClave}
        error={errors.newClave?._errors[0]}
      />
      <Input
        placeholder="Vuelva a colocar la nueva contraseña"
        label="*Confirmar nueva contraseña"
        id="newClaveConfirma"
        onChange={handleChange}
        value={userBody.newClaveConfirma}
        error={errors.newClaveConfirma?._errors[0]}
      />
      <DialogMessage
        status="info"
        CustomIcon={IconAlertCircleFilled}
        message={content.title}
        dialogOpen={isOpenModal}
        backButton={{
          button: {
            title: "Volver atras",
            icon: <IconChevronLeft size={22} className="text-text-grey"/>,
            onClick: () => setIsOpenModal(false)
          },
          closeDialog: true
        }}
        button={
          <form onSubmit={handleSubmit}>
            <InputSubmit
              status={isPending ? "loading" : state ? state.state : "idle"}
              errorText={state ? state.state === 'error' ? state.value : undefined : undefined}
              successText={state ? state.state === 'success' ? state.value : undefined : undefined}
              idleText={content.button}
              className={cn("text-white bg-blue-button border-0")}
            />
          </form>
        }
        trigger={
          <Button
            onClick={handleClick}
            title={content.trigger}
            classNameContainer={cn("border-0 disabled:!opacity-50")}
            buttonBackground="bg-blue-button"
            classNameText="text-white"
          />
        }
      >
        <SemiSection type="custom" title="" className="flex flex-col gap-3">
          {content.description}
        </SemiSection>
      </DialogMessage>
    </div>
  );
};

export default UserEditPassword;
