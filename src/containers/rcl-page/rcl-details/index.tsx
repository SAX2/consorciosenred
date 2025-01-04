"use client"

import Input from '@/components/Form/Input';
import InputSubmit from '@/components/Form/InputSubmit';
import UserIcon from '@/components/Icons/UserIcon';
import Pill from '@/components/Pill';
import SemiSection from '@/components/Sections/AppSections/SemiSection';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Separator } from '@/components/ui/separator';
import NoResult from '@/containers/errors/no-result';
import { details } from '@/lib/contents/(app)/contents';
import { createNewCommentRcl } from '@/lib/queries/queries';
import { cn } from '@/lib/utils';
import { Badge } from '@/packages/ui/badge';
import { IconAlertTriangle, IconArrowUp, IconArrowUpRight, IconChevronDown, IconCircleCheckFilled, IconClipboard, IconFile, IconInfoSquareRounded, IconInfoTriangle, IconLoader, IconMessage, IconPaperclip } from '@tabler/icons-react';
import { format, formatDistanceToNow, isToday, parse } from 'date-fns';
import { es } from 'date-fns/locale';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useActionState, useEffect, useState } from 'react'

const PopoverFiles = ({ files, totalLength }: { files: any[], totalLength: number }) => {
  return (
    <Popover>
      <PopoverTrigger>
        <div className="flex flex-row mt-2 w-full flex-wrap">
          <button className="bg-white border border-outline flex flex-row gap-2 p-1 rounded-lg">
            <span className="p-[2px] bg-grey-sec rounded-md">
              <IconFile size={20} className="text-text-grey" />
            </span>
            <p className="text-black">
              {totalLength} Adjunto
              {totalLength > 1 ? "s" : ""}
            </p>
            <Separator orientation="vertical" />
            <span className="font-medium text-text-grey flex flex-row items-center gap-1">
              Ver <IconChevronDown size={20} />
            </span>
          </button>
        </div>
      </PopoverTrigger>
      <PopoverContent align="start" className="p-1 flex-col w-fit rounded-lg">
        {files.map((file, index) => (
          <Link
            href={`/file/${file.tipo}/${file.id}/${file.nombre}`}
            className="w-[250px] flex flex-row justify-between items-center p-1 hover:bg-grey rounded-md group"
            key={file.id}
          >
            <div className="flex flex-row items-center gap-2 flex-1">
              <span className="p-[2px] bg-grey-sec rounded-md">
                <IconFile size={20} className="text-text-grey" />
              </span>
              <p className="truncate flex-1">{file.nombre}</p>
            </div>
            <IconArrowUpRight size={20} className="text-text-grey group-hover:rotate-45 group-hover:text-black transition-all" />
          </Link>
        ))}
      </PopoverContent>
    </Popover>
  );
}

const InfoHeader = ({ issue }: { issue: any }) => {
  const issueDate = parse(issue.Rcl_DateTime, 'dd/MM/yyyy', new Date());
  const formattedDateTime = format(issueDate, "dd 'de' MMMM, yyyy", { locale: es })

  return (
    <div
      className="flex flex-col bg-white gap-3"
      key={`header-${issue.Rcl_id}`}
    >
      <div className="flex flex-row items-center">
        <div className="flex bg-orange-icon/10 mr-3 flex-shrink-0 self-start rounded-[16px] p-3">
          <IconAlertTriangle size={46} className="text-orange-icon" />
        </div>
        <div className="flex flex-1 flex-col">
          <div className="flex flex-row items-center justify-between">
            <p className="text-lg font-bold text-black">{issue.Rcl_Subject}</p>
          </div>
          <div className="flex flex-row mt-[4px] items-center justify-between">
            <div className="flex flex-row flex-wrap items-center gap-2">
              <Badge variant="neutral" className="text-sm bg-white py-[2px]">
                {formattedDateTime}
              </Badge>
              <Pill
                key="status-pill"
                text={issue.Rcl_Status}
                classNameText={cn(
                  "text-sm py-[2px]",
                  issue.Rcl_Status === "En proceso" && "text-yellow-sec",
                  issue.Rcl_Status === "Cerrado" && "text-green",
                  issue.Rcl_Status === "Cancelado" && "text-red"
                )}
                className={cn("border-yellow/15 bg-yellow/20")}
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
          icon={<IconInfoTriangle size={24} className="text-black" />}
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
          icon={<IconInfoSquareRounded size={24} className="text-black" />}
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
              <IconMessage size={24} className="text-black" />
              <p className="ios:ml-[6px] android:ml-[6px] text-base font-semibold">
                {details.issue.description}
              </p>
            </div>
            <p className="mt-3 text-base text-black/75">
              {issue.Rcl_Description}
            </p>
            {issue.adjuntosMobile.length > 0 && (
              <PopoverFiles files={issue.adjuntosMobile} totalLength={issue.adjuntosMobile.length}/>
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

  console.log(isPending, error)

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
        <NoResult message="No hay comentarios" iconShown={false} />
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
        className="flex flex-row items-center gap-2 sticky bottom-0 bg-white pb-4 py-2"
        action={submitAction}
      >
        <label className="cursor-pointer">
          <IconPaperclip size={26} className="text-text-grey" />
          <input type="file" className="hidden" />
        </label>
        <Input
          className="bg-grey border-0"
          placeholder="Escribe aquí tu mensaje"
          name="input"
        />
        <InputSubmit
          loadingIcon={<IconLoader className="animate-spin text-white" />}
          successIcon={<IconCircleCheckFilled />}
          idleIcon={<IconArrowUp className="text-white" />}
          status={isPending ? "loading" : error ? "error" : "idle"}
          className="border-0 w-fit bg-orange-icon px-2"
        />
      </form>
    </div>
  );
}

export default RclDetails