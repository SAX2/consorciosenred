export const preguntaPersonal = [
  {
    arr: ["¿Cual es su color favorito?",]
  },
  {
    arr: ["¿Cual es el nombre de su mascota?",]
  },
  {
    arr: ["¿Cual es su película favorita?",]
  },
  {
    arr: ["¿Cual es su aniversario de casamiento?",]
  },
]

export const serverBodyPreguntaPersonal = [
  {
    key: "color",
    value: "¿Cual es su color favorito?"
  },
  {
    key: "mascota",
    value: "¿Cual es el nombre de su mascota?",
  },
  {
    key: "pelicula",
    value: "¿Cual es su película favorita?",
  },
  {
    key: "aniversario",
    value: "¿Cual es su aniversario de casamiento?",
  },
]

export const parsePreguntaPersonal = (preguntaPersonal: string, res: 'key' | 'value' | undefined = "key"): string => {
  const parsedData = serverBodyPreguntaPersonal.find(
    (item) => item.value.toLocaleLowerCase() == preguntaPersonal
  );

  return parsedData ? parsedData[res] : ""
}