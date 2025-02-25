"use client"

import { PopoverFiles } from '@/components/Dropdowns/PopoverFiles';
import Input from '@/components/Form/Input';
import InputSubmit from '@/components/Form/InputSubmit';
import UserIcon from '@/components/Icons/UserIcon';
import Pill from '@/components/Pill';
import EmptySection from '@/components/Sections/AppSections/Errors/EmptySection';
import SemiSection from '@/components/Sections/AppSections/SemiSection';
import { getStatusType } from '@/hooks/use-status';
import { details } from '@/lib/contents/(app)/contents';
import { createNewCommentRcl } from '@/lib/queries/queries';
import { IconAlertTriangle, IconArrowUp, IconInfoSquareRounded, IconInfoTriangle, IconMessage, IconMessagesOff, IconPaperclip } from '@tabler/icons-react';
import { format, formatDistanceToNow, isToday, parse } from 'date-fns';
import { es } from 'date-fns/locale';
import { useRouter } from 'next/navigation';
import React, { useActionState, useEffect, useState } from 'react'

const InfoHeader = ({ issue }: { issue: any }) => {
  const issueDate = parse(issue.Rcl_DateTime, 'dd/MM/yyyy', new Date());
  const formattedDateTime = format(issueDate, "dd 'de' MMMM, yyyy", { locale: es })

  return (
    <div className="flex flex-col gap-3" key={`header-${issue.Rcl_id}`}>
      <div className="flex flex-row items-center">
        <div className="flex bg-orange-icon/10 mr-3 flex-shrink-0 self-start rounded-[16px] p-3">
          <IconAlertTriangle size={46} className="text-orange-icon" />
        </div>
        <div className="flex flex-1 flex-col">
          <div className="flex flex-row items-center justify-between">
            <p className="text-lg font-bold">{issue.Rcl_Subject}</p>
          </div>
          <div className="flex flex-row mt-[4px] items-center justify-between">
            <div className="flex flex-row flex-wrap items-center gap-2">
              <Pill text={formattedDateTime} classNameText="text-sm" />
              <Pill
                key="status-pill"
                text={issue.Rcl_Status}
                variant={getStatusType("reclamos", issue.Rcl_Status)}
                classNameText="text-sm"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <SemiSection
          key="Rcl_About"
          type="simple"
          title={details.issue.about}
          icon={<IconInfoTriangle size={24} />}
        >
          <Pill
            key="about-pill"
            text={issue.Rcl_Sobre}
            classNameText="text-base"
          />
        </SemiSection>
        <SemiSection
          key="Rcl_Type"
          type="simple"
          title={details.issue.type}
          icon={<IconInfoSquareRounded size={24} />}
        >
          <Pill
            key="type-pill"
            text={issue.Rcl_Type}
            classNameText="text-base"
          />
        </SemiSection>
        <SemiSection
          key="Rcl_Message"
          type="custom"
          title={details.issue.description}
          margin="top"
        >
          <div className="flex w-full flex-col">
            <div className="flex flex-row items-center gap-2">
              <IconMessage size={24} />
              <p className="ios:ml-[6px] android:ml-[6px] text-base font-semibold">
                {details.issue.description}
              </p>
            </div>
            <p className="mt-3 text-base text-black/75 dark:text-white/75">
              {issue.Rcl_Description}
            </p>
            {issue.adjuntosMobile.length > 0 && (
              <PopoverFiles
                files={issue.adjuntosMobile}
                totalLength={issue.adjuntosMobile.length}
              />
            )}
          </div>
        </SemiSection>
      </div>
    </div>
  );
}

const Comment = ({ item }: { item: any }) => (
  <div className="flex flex-col rounded-[16px]">
    <div className="flex flex-row w-full items-center">
      <div className="flex flex-row items-center gap-2">
        <UserIcon
          name={item.Rcl_User}
          color={'blue'}
          rounded="rounded-[6px]"
          textSize="text-sm"
          dimensions="w-6 h-6"
        />
        <p className="text-lg font-medium truncate">{item.Rcl_User}</p>
      </div>
      <p className="text-text-grey ml-3 text-xs uppercase truncate">
        {isToday(parse(item.Rcl_DateTimeRsp, "dd/MM/yyyy", new Date()))
          ? "Hoy"
          : formatDistanceToNow(
              parse(item.Rcl_DateTimeRsp, "dd/MM/yyyy", new Date()),
              { locale: es, addSuffix: false }
            )}
      </p>
    </div>
    <div className="flex bg-grey mt-2 justify-center self-start rounded-[8px] p-1 px-2">
      <p className="text-base text-black/75">{item.Rcl_DescriptionRsp}</p>
    </div>
  </div>
);

interface RclDetailsProps {
  data: any[];
}

const RclDetails = ({ data }: RclDetailsProps) => {
  if (!data || data.length === 0) {
    return (
      <div className=" flex h-3/4 w-full items-center justify-center">
        <p className="text-text-grey text-center text-2xl">
          No hay datos disponibles
        </p>
      </div>
    );
  }

  const router = useRouter()

  const [comments, setComments] = useState<any[]>([])
  const [value, setValue] = useState<string>("")
  const [error, submitAction, isPending] = useActionState(
    async (previousState: unknown, formData: any) => {
      const error = await createNewCommentRcl({ Rcl_id: issue.Rcl_id, Rcl_Description: formData.get('input') })
      if (error.ERROR || error["ERROR CATCH"]) {
        return error;
      }
      return router.refresh();
    },
    null,
  );

  const issue = data[0]
  
  useEffect(() => {
    if (!(!issue.respuesta || issue.respuesta.length === 0)) {
      if (issue.respuesta) {
        setComments(issue.respuesta.reverse())
      }
    }
  }, [data, issue])

  return (
    <div className="flex flex-1 h-full flex-col gap-4">
      <InfoHeader issue={issue} />
      {comments.length === 0 && (
        <EmptySection title="No hay comentarios" Icon={IconMessagesOff} description='Aún no se han agregado comentarios a este reclamo. Puedes dejar uno si es necesario.' />
      )}
      {comments.length > 0 && (
        <div className="flex flex-col gap-6">
          <div key="comments-header" className="flex flex-row mt-4">
            <p className="text-xl font-semibold">Comentarios</p>
          </div>
          <div className="flex flex-col gap-3">
            {comments.map((item: any) => (
              <Comment item={item} key={item.Rcl_SubjectRsp} />
            ))}
          </div>
        </div>
      )}
      <form
        className="flex flex-row items-center gap-2 sticky bottom-0 pb-4 py-2"
        action={submitAction}
      >
        <label className="cursor-pointer">
          <IconPaperclip size={26} className="text-text-grey" />
          <input type="file" className="hidden" />
        </label>
        <Input
          autoComplete='off'
          className="bg-grey dark:bg-grey-dark border-0"
          placeholder="Escribe aquí tu mensaje"
          name="input"
        />
        <InputSubmit
          loadingText=''
          errorText=''
          successText=''
          idleIcon={<IconArrowUp className="text-white" />}
          status={isPending ? "loading" : error ? "error" : "idle"}
          className="border-0 w-fit bg-orange-icon px-2"
        />
      </form>
    </div>
  );
}

export default RclDetails