"use client"

import React, {
  Dispatch,
  forwardRef,
  ReactElement,
  SetStateAction,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
// import { Row } from "app/design/layout";
import Button from "app/components/Buttons/Button";
import {
  IconCalendarX,
  IconChevronDown,
  IconChevronLeft,
  IconChevronRight,
  IconChevronUp,
  IconInfoCircleFilled,
  IconListDetails,
} from "@tabler/icons-react";
import { addDays, format, parse, parseISO, startOfWeek } from "date-fns";
// import { es } from "date-fns/locale";
// import { cn } from "@/lib/utils";
// import BottomButton from "app/components/sections/bottom-button";
// import BottomSheetMessage from "app/components/sheets/message";
// import { BottomSheetModal } from "@gorhom/bottom-sheet";
// import BottomSheet from "app/components/sheets/bottom-sheet";
// import Pill from "@/components/Pill";
// import Checkbox from "app/components/buttons/checkbox";
import { toast } from "sonner";
// import BottomSheetSuccess from "app/components/sheets/success";
import { useRouter } from "next/navigation";
// import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createNewReservation } from "@/lib/queries/queries";
// import * as Haptics from "expo-haptics";
import getParams from '@/env/getParams';
import { es } from "date-fns/locale";
import EmptySection from "@/components/Sections/AppSections/Errors/EmptySection";
import MoreOptionsEmpty from "./more-options-empty";
import useIsLargeScreen from "@/hooks/useIsLargeScreen";
import Pill from "@/components/Pill";
import { Checkbox } from "@/components/ui/checkbox";
import BottomSection from "@/components/Sections/AppSections/BottomSection";
import DialogMessage from "@/components/Dialogs/Message";

export type Turn = {
  id: string;
  estado: string;
  costo: number;
  start: string;
  end: string;
  title: string;
  mensaje: string;
  tycs: string;
  color: string;
  tycsAttach: string;
  tycsChecked: string;
  costoChequed: string;
  pin: string;
};

export type Day = {
  day: string;
  turns: Turn[];
};

interface ItemBottomSheetConfirmBookProps {
  turn: Turn;
  setTurns: Dispatch<SetStateAction<any[]>>;
  setOpen: Dispatch<SetStateAction<{ start: string; open: boolean }>>;
  open?: { open: boolean; start: string };
}

const ItemBottomSheetConfirmBook = ({
  turn,
  open,
  setOpen,
  setTurns,
}: ItemBottomSheetConfirmBookProps) => {
  const isOpen = open && open.open && open.start === turn.start;
  const [conditionsNotChecked, setConditionsNotChecked] = useState<number>(0);
  const { isLargeScreen } = useIsLargeScreen({ minWidth: 768 })

  const handlePressOpen = () => {
    setOpen((prev) => ({
      start: turn.start,
      open: prev.start === turn.start ? !prev.open : true,
    }));
  };

  const verifyConditionsChecked = (): number => {
    let checked: string[] = [];

    if (turn.costoChequed.includes("0")) checked.push(turn.costoChequed);
    if (turn.tycsChecked.includes("0")) checked.push(turn.tycsChecked);

    return checked.length;
  };

  const handleCheckboxChange = (
    conditionType: "costo" | "tycs",
    value: string
  ) => {
    setTurns((prevTurns) =>
      prevTurns.map((t) =>
        t.start === turn.start
          ? {
              ...t,
              costoChequed: conditionType === "costo" ? value : t.costoChequed,
              tycsChecked: conditionType === "tycs" ? value : t.tycsChecked,
            }
          : t
      )
    );
  };

  useEffect(() => {
    setConditionsNotChecked(verifyConditionsChecked());
  }, [turn]);

  return (
    <div className="flex p-3 rounded-xl bg-grey dark:bg-grey-dark flex-col gap-3">
      <div className="flex items-center justify-between gap-3">
        <div className="flex flex-1 items-center gap-2">
          <p className="flex-1 text-base font-semibold truncate">
            {turn.title}
          </p>
        </div>
        <Pill
          className="!py-0 flex-1"
          classNameText="font-semibold text-base truncate"
          text={`de ${format(turn.start, "p")} a ${format(turn.end, "p")}`}
        />
      </div>
      <button
        onClick={handlePressOpen}
        className="flex flex-row w-full justify-between"
      >
        <span className="text-sm text-text-grey font-medium">{`Debes aceptar ${conditionsNotChecked} condici${
          conditionsNotChecked === 1 ? "ó" : "o"
        }n${conditionsNotChecked === 1 ? "" : "es"}`}</span>
        <span className="flex items-center gap-1">
          <span className="text-sm font-semibold">
            {isOpen ? "Ver menos" : "Ver mas"}
          </span>
          {isOpen ? <IconChevronUp size={20} /> : <IconChevronDown size={20} />}
        </span>
      </button>
      {isOpen && (
        <div className="flex mt-1 flex-col gap-2">
          {turn.costo > 0 && (
            <div className="flex items-center gap-3">
              <Checkbox
                onCheckedChange={(checked: boolean) =>
                  handleCheckboxChange("costo", checked ? "1" : "0")
                }
                value={turn.costoChequed === "1" ? "on" : "off"}
              />
              <div className="flex items-center justify-between gap-1 flex-1 flex-wrap">
                <p className="text-black/85 dark:text-white/85">
                  Acepto que la reserva tiene un costo de:
                </p>
                <Pill
                  text={`$${turn.costo}`}
                  classNameText="text-base"
                  className="!py-0 px-1"
                />
              </div>
            </div>
          )}
          {turn.tycs && (
            <div className="flex items-center gap-3">
              <Checkbox
                onCheckedChange={(checked: boolean) =>
                  handleCheckboxChange("tycs", checked ? "1" : "0")
                }
                value={turn.tycs === "1" ? "on" : "off"}
              />
              <div className="flex items-center gap-1 flex-1 flex-wrap">
                <p className="text-black/85 dark:text-white/85">
                  {turn.tycs}. Acepto los Términos y condiciones adjuntos a
                  continuación:
                </p>
                <Pill
                  text={"Terminos y condiciones"}
                  classNameText="text-base"
                  isFile={true}
                  // fileType="application/pdf"
                  // fileId="asd"
                  // fileName="sd"
                  // className="!py-0"
                />
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

interface BottomSheetConfirmBookProps {
  selectedDay: Day;
  selectedTurns: Turn[];
  setSelectedTurns: Dispatch<SetStateAction<Turn[]>>;
  isLoadingRequest?: boolean;
}

const BottomSheetConfirmBook = ({ selectedTurns, setSelectedTurns, isLoadingRequest }: BottomSheetConfirmBookProps) => {
  const [open, setOpen] = useState<{ start: string; open: boolean }>({
    open: false,
    start: "",
  });

  const [allConditionsAccepted, setAllConditionsAccepted] = useState(false);

  const handleAcceptAllConditions = (accepted: string) => {
    setAllConditionsAccepted(accepted === "1" ? true : false);
    setSelectedTurns(prev =>
      prev.map((turn) => ({
        ...turn,
        costoChequed: turn.costo ? accepted : turn.costoChequed,
        tycsChecked: turn.tycs ? accepted : turn.costoChequed,
      }))
    );
  };

  useEffect(() => {
    const isAllConditionsAccepted = selectedTurns.every(turn => (!turn.costo || turn.costoChequed === "1") && (!turn.tycs || turn.tycsChecked === "1"))
    setAllConditionsAccepted(isAllConditionsAccepted)
  }, [selectedTurns])

  const calculateTotalTurnsCost = () => {
    return selectedTurns.filter(turn => turn.costo).reduce((total, turn) => total + (turn.costo || 0), 0);
  }

  return (
    <>
      <div className="max-h-[50dvh] overflow-y-auto flex flex-col gap-2">
        {selectedTurns.map((turn) => {
          return (
            <ItemBottomSheetConfirmBook
              turn={turn}
              setTurns={setSelectedTurns}
              setOpen={allConditionsAccepted ? () => ({}) : setOpen}
              open={open}
              key={`${turn.start}-${turn.end}-${turn.id}`}
            />
          );
        })}
      </div>
      <div className="flex items-center gap-3">
        <Checkbox
          value={allConditionsAccepted ? "on" : "off"}
          onCheckedChange={(value) =>
            handleAcceptAllConditions(value ? "1" : "0")
          }
        />
        <div className="flex flex-wrap gap-2 items-center">
          <p className="text-lg font-semibold">Aceptar todas las condiciones</p>
          <p className="text-sm text-text-grey italic">{`Total $${calculateTotalTurnsCost().toFixed(
            2
          )}`}</p>
        </div>
      </div>
    </>
  );
};

interface DayPickerProps {
  days: Day[];
  selectedDay: Day;
  setSelectedDay: (day: Day) => void;
}

const DayPicker = ({ days, selectedDay, setSelectedDay }: DayPickerProps) => {
  const [currentWeekStart, setCurrentWeekStart] = useState(new Date());

  const weekDays = useMemo(() => {
    return Array.from({ length: 7 }, (_, index) => {
      const date = new Date(currentWeekStart);
      date.setDate(currentWeekStart.getDate() + index - 1);
      const formattedDate = format(date, "yyyy-MM-dd");
      const matchingDay = days.find(d => d.day === formattedDate);
      
      return {
        date,
        day: format(date, "EEE", { locale: es }),
        hasAvailableTurns: !!matchingDay,
        fullDay: matchingDay,
      };
    });
  }, [currentWeekStart, days]);

  const changeWeek = (direction: "next" | "prev") => {
    const newDate = new Date(currentWeekStart);
    newDate.setDate(newDate.getDate() + (direction === "next" ? 7 : -7));
    setCurrentWeekStart(newDate);
  };

  return (
    <div className="flex flex-col p-4 gap-3">
      <div className="flex items-center justify-between">
        {weekDays.map(({ date, day, hasAvailableTurns, fullDay }) => (
          <button
            key={date.toISOString()}
            onClick={() => hasAvailableTurns && setSelectedDay(fullDay as Day)}
            className={`flex-1 text-center border-b-2 p-2 py-1 ${
              selectedDay?.day === format(date, "yyyy-MM-dd")
                ? "border-green dark:border-green-dark"
                : "border-outline dark:border-outline-dark"
            } ${!hasAvailableTurns ? "opacity-25" : ""}`}
            disabled={!hasAvailableTurns}
          >
            <span className={`text-xs font-medium ${
              selectedDay?.day === format(date, "yyyy-MM-dd")
                ? "text-green dark:text-green-dark"
                : ""
            }`}>
              {day.toUpperCase()}
            </span>
            <p className={`text-lg font-medium ${
              selectedDay?.day === format(date, "yyyy-MM-dd")
                ? "text-green dark:text-green-dark"
                : ""
            }`}>
              {format(date, "dd")}
            </p>
          </button>
        ))}
      </div>

      <div className="flex items-center justify-between px-2">
        <button onClick={() => changeWeek("prev")} className="p-2">
          <IconChevronLeft size={24} />
        </button>
        <p className="text-lg font-semibold">
          {format(selectedDay.day, "iiii d 'de' MMMM", { locale: es })}
        </p>
        <button onClick={() => changeWeek("next")} className="p-2">
          <IconChevronRight size={24} />
        </button>
      </div>
    </div>
  );
};

interface TurnPicker {
  turns: Turn[];
  setSelectedTurns: Dispatch<SetStateAction<Turn[]>>;
  selectedTurns: Turn[];
  header: ReactElement;
}

const TurnPicker = ({ turns, selectedTurns, setSelectedTurns, header }: TurnPicker) => {
  const toggleTurn = (turn: Turn) => {
    if (turn.estado !== "disponible") return;
    if (turn.mensaje) return toast.info(turn.mensaje);

    setSelectedTurns(current => {
      const isSelected = current.some(t => t.start === turn.start);
      return isSelected 
        ? current.filter(t => t.start !== turn.start) 
        : [...current, turn];
    });
  };

  if (!turns?.length) {
    return <EmptySection Icon={IconCalendarX} title="No hay turnos disponibles" description="Por el momento, no hay turnos disponibles. Vuelve a intentarlo más tarde."/>
  }

  return (
    <div className="flex flex-col gap-4">
      {header}
      <div className="grid grid-cols-1 gap-2">
        {Array.from(new Map(turns.map(turn => [turn.id, turn])).values()).map((turn) => (
          <button
            key={turn.start}
            onClick={() => toggleTurn(turn)}
            disabled={turn.estado !== "disponible"}
            className={`p-3 rounded-lg border ${
              selectedTurns.some(t => t.start === turn.start)
                ? "border-green/15 dark:border-green-dark/15 bg-green/10 dark:bg-green-dark/10"
                : "border-outline dark:border-outline-dark"
            } ${turn.estado !== "disponible" ? "opacity-50" : ""}`}
          >
            <div className="flex items-center justify-center gap-2">
              <span className={`text-lg ${
                selectedTurns.some(t => t.start === turn.start)
                  ? "text-green dark:text-green-dark font-medium"
                  : "text-black/75 dark:text-white/75"
              }`}>
                {format(turn.start, "p")} - {format(turn.end, "p")}
              </span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

interface ReserveTurnsScreenProps {
  data: Day[];
  pathParams?: string;
}

const ReserveTurnsScreenComponent = ({ data, pathParams }: ReserveTurnsScreenProps) => {
  const [day, setDay] = useState<Day | undefined>(
    data.find((d) => d.turns.some((turn) => turn.estado === "disponible"))
  );
  const [turns, setTurns] = useState<Turn[]>([]);

  const turnsAccepted = turns.every(turn => {
    const tycsAccepted = !turn.tycs || turn.tycsChecked === "1";
    const costoAccepted = !turn.costo || turn.costoChequed === "1";
    return tycsAccepted && costoAccepted;
  });

  const router = useRouter()

  const id = getParams({ params: pathParams as string, type: "id" })

  const [dialogConfirmOpen, setDialogConfirmOpen] = useState(false);
  const [dialogSuccessOpen, setDialogSuccessOpen] = useState(false);

  const handleConfirm = async () => {
      const formattedTurns = turns.map((turn) => {
        const startDate = parseISO(turn.start);
        const endDate = parseISO(turn.end);

        return {
          tycs: turn.tycs,
          costo: turn.costo.toString(),
          start: startDate.getTime().toString(),
          end: endDate.getTime().toString(),
          id: turn.id,
          title: turn.title,
          pn: turn.pin,
          timeZone: "cvt",
          costoChecked: turn.costoChequed,
          isAdmChecked: "0",
          tycsAttach: turn.tycsAttach,
          tycsChecked: turn.tycsChecked,
        };
      });

      return await createNewReservation({
        eventos: formattedTurns,
      });
  };

  
  const handleConfirmSheet = async () => {
    if (turnsAccepted) {
      const data = await handleConfirm()

      if (data.PROCESS) {
        setDialogConfirmOpen(false);
        setDialogSuccessOpen(true);
      }
    }
  };

  return (
    <React.Fragment>
      <div className="flex flex-col flex-1 gap-6 h-fit">
        <TurnPicker
          turns={day?.turns as Turn[]}
          selectedTurns={turns}
          setSelectedTurns={setTurns}
          header={
            <DayPicker
              days={data}
              selectedDay={day as Day}
              setSelectedDay={setDay}
            />
          }
        />
        {turns.length > 0 && (
          <BottomSection>
            <DialogMessage
              status="info"
              message="¿Desea confirmar las reservas?"
              trigger={
                <Button
                  classNameContainer="w-full"
                  buttonBackground="bg-green"
                  classNameText="text-white"
                  textSize="text-lg"
                  title="Reservar"
                />
              }
              backButton={{
                closeDialog: true,
                button: {
                  icon: (
                    <IconChevronLeft size={24} className="text-text-grey" />
                  ),
                  title: "Volver",
                },
              }}
              button={
                <Button
                  title="Confirmar"
                  buttonBackground="bg-blue-button"
                  classNameText="text-white"
                  onClick={handleConfirmSheet}
                />
              }
              dialogOpen={dialogConfirmOpen}
              setDialogOpen={setDialogConfirmOpen}
            >
              <BottomSheetConfirmBook
                selectedDay={day as Day}
                selectedTurns={turns}
                setSelectedTurns={setTurns}
              />
            </DialogMessage>
          </BottomSection>
        )}
        <DialogMessage
          status="success"
          message="La reserva se ha hecho exitosamente"
          trigger={null}
          backButton={{
            button: {
              href: `/prp/expensas/${pathParams}/reservas`,
              title: "Ir al listado de reservas",
              icon: <IconChevronRight size={24} className="text-text-grey" />,
              iconOrientation: "right",
            },
          }}
          dialogOpen={dialogSuccessOpen}
          setDialogOpen={setDialogSuccessOpen}
        >
          <div />
        </DialogMessage>
      </div>
      {/* <BottomSheet ref={successSheet} enablePanDownToClose={false}>
        <BottomSheetSuccess
          successTitle="La reserva se ha hecho exitosamente"
          backButton={{
            title: "Ir al listado de reservas",
            onPress: () => {
              successSheet.current?.dismiss()
              router.dismissTo(`/${pathParams}/reservas`)
            }
          }}
        />
      </BottomSheet> */}
    </React.Fragment>
  );
};

const ReserveTurnsScreen = ({ data, pathParams, resource, group }: { data: any[], pathParams: string, resource: string, group: string }) => {
  const [dataCalendar, setDataCalendar] = useState<Record<string, Day[]>>({});

  useEffect(() => {
    if (data && data.length > 0) {
      const formattedData = data.reduce((acc: any, turn: any) => {
        const day = format(new Date(turn.start), "yyyy-MM-dd");
        const resource = turn.recurso;

        if (!acc[resource]) {
          acc[resource] = [];
        }

        const existingDay = acc[resource].find((item: any) => item.day === day);

        const turnData: Turn = {
          estado: turn.estado,
          costo: turn.costo,
          start: turn.start,
          end: turn.end,
          title: turn.title,
          mensaje: turn.mensaje,
          color: turn.color,
          tycs: turn.tycs,
          tycsAttach: turn.tycsAttach,
          costoChequed: turn.costoChequed,
          tycsChecked: turn.tycsChecked,
          id: turn.id,
          pin: turn.pin
        };

        if (existingDay) {
          existingDay.turns.push(turnData);
        } else {
          acc[resource].push({
            day,
            turns: [turnData],
          });
        }

        return acc;
      });

      setDataCalendar(formattedData);
    } 
  }, [data]);

  if (dataCalendar && dataCalendar[resource])
    return (
      <ReserveTurnsScreenComponent
        data={dataCalendar[resource]}
        pathParams={pathParams}
      />
    );
  return (
    <EmptySection
      Icon={IconCalendarX}
      title="No hay turnos disponibles"
      description="Parece que no hay elementos para mostrar en este momento. Intenta ajustar los filtros o volver más tarde."
    >
      <MoreOptionsEmpty params={pathParams} group={group} />
    </EmptySection>
  );
}

export default ReserveTurnsScreen;
