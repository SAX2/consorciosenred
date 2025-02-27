"use client";

import Input, { InputSelect, Label } from "app/components/Form/Input";
import InputCalendar from "app/components/Form/InputCalendar";
import InputSubmit from "app/components/Form/InputSubmit";
import { cn } from "app/lib/utils";
import { getUser } from "app/services/queries";
import { InputSubmitStatus, User, UserQueryBody } from "app/types/globals";
import { format, parse } from "date-fns";
import { useRouter } from "next/navigation";
import React, { ChangeEvent, FC, useEffect, useState, useTransition } from "react";
import { parsePreguntaPersonal, preguntaPersonal, serverBodyPreguntaPersonal } from "./content";

interface UserEditProps {
  user: User;
}

const UserEdit: FC<UserEditProps> = ({ user }) => {
  const [userBody, setUserBody] = React.useState<UserQueryBody>({
    idUsrOrg: user.idUsrOrg,
    apellido: user.apellido,
    nombre: user.nombre,
    email: user.email,
    preguntaPersonal: user.preguntaPersonal,
    respuestaPersonal: user.respuestaPersonal,
    fechaNac: user.fechaNac,
    profesion: user.profesion,
    telefono: user.telefono,
    booNewClave: false,
    newClave: "",
    newClaveConfirma: "",
  });
  const [hasChanges, setHasChanges] = useState<boolean>(false)
  const [isPending, startTransition] = useTransition();
  const [state, setState] = useState<{ state: InputSubmitStatus, value?: string } | undefined>();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUserBody((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    startTransition(async () => {
      const res = await getUser({ query: { ...userBody, preguntaPersonal: parsePreguntaPersonal(userBody.preguntaPersonal) }  });

      if (res.ERROR) return setState({ state: "error", value: "Ha ocurrido un error al modificar los datos" });

      if (res.DatosModificadosError.length > 0) {
        return setState({ state: "error", value: res.DatosModificadosError });
      }
      
      if (res.DatosModificados) {
        return setState({ state: "success", value: "Se han modificado los datos correctamente" })
      }

      return setState({ state: "error", value: "Ha ocurrido un error al modificar los datos" });
    })
  }

  useEffect(() => {
    const checkForChanges = () => {
      const fieldsToCompare: (keyof Omit<UserQueryBody, 'booNewClave' | 'newClave' | 'newClaveConfirma'>)[] = [
        'apellido', 'nombre', 'email', 'preguntaPersonal', 
        'respuestaPersonal', 'fechaNac', 'profesion', 'telefono', 'idUsrOrg'
      ];
      
      const hasFieldChanges = fieldsToCompare.some(field => {
        return user[field] !== userBody[field];
      });
      
      const hasPasswordChange = userBody.booNewClave === true;
      
      setHasChanges(hasFieldChanges || hasPasswordChange);
    };
    
    checkForChanges();
  }, [userBody, user]);

  return (
    <form className="flex flex-col gap-4 max-md:p-4" onSubmit={handleSubmit}>
      <Input
        placeholder="Coloque su nombre"
        label="*Nombre"
        id="nombre"
        onChange={handleChange}
        value={userBody.nombre}
      />
      <Input
        placeholder="Coloque su apellido"
        label="*Apellido"
        id="apellido"
        onChange={handleChange}
        value={userBody.apellido}
      />
      <Label label="Pregunta personal" classname="flex flex-col gap-1 w-full">
        <InputSelect
          placeholder="Elija una pregunta personal"
          id="preguntaPersonal"
          onChange={handleChange}
          selectOnChange={(value) =>
            setUserBody((prev) => ({ ...prev, preguntaPersonal: value.toLocaleLowerCase() }))
          }
          selectDefaultValue={parsePreguntaPersonal(userBody.preguntaPersonal, "value")}
          selectValues={preguntaPersonal}
        />
      </Label>
      <Input
        placeholder="Coloque la respuesta a la pregunta personal"
        label="*Respuesta personal"
        id="respuestaPersonal"
        onChange={handleChange}
        value={userBody.respuestaPersonal}
      />
      <Label
        label="*Fecha de nacimiento"
        classname="flex flex-col gap-1 w-full"
      >
        <InputCalendar
          calendarMode="single"
          field={{
            value: userBody.fechaNac ? parse(userBody.fechaNac, 'dd/MM/yyyy', new Date()) : "",
            onChange: (date: Date | null) =>
              setUserBody((prev) => ({
                ...prev,
                fechaNac: format(date ?? new Date(), 'dd/MM/yyyy'),
              })),
          }}
        />
      </Label>
      <Input
        placeholder="Coloque su profesión"
        label="Profesión"
        id="profesion"
        onChange={handleChange}
        value={userBody.profesion}
      />
      <Input
        type="tel"
        placeholder="Coloque su numero telefonico"
        label="Telefono"
        id="telefono"
        onChange={handleChange}
        value={userBody.telefono}
      />
      <Input
        placeholder="Coloque su dirección de correo electronico"
        label="*Email"
        id="email"
        onChange={handleChange}
        value={userBody.email}
      />
      <InputSubmit
        status={isPending ? "loading" : state ? state.state : "idle"}
        errorText={state ? state.state === 'error' ? state.value : undefined : undefined}
        successText={state ? state.state === 'success' ? state.value : undefined : undefined}
        idleText="Guardar datos"
        className={cn("text-white bg-blue-button border-0 disabled:!opacity-50")}
        disabled={!hasChanges}
      />
    </form>
  );
};

export default UserEdit;
