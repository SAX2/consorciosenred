import Button from "@/components/Buttons/Button";
import Pill from "@/components/Pill";
import { getStatusType } from "@/hooks/use-status";
import { IconChevronRight, IconGavel } from "@tabler/icons-react";
import Link from "next/link";
import { format, parse } from "date-fns";
import { es } from "date-fns/locale";
import CardIcon from "@/components/Icons/CardIcon";

interface JudgmentCardProps {
  item: any;
  pathParam: string;
  index: number;
}

const JudgmentCard = ({ item, pathParam, index }: JudgmentCardProps) => {
  const itemDate = parse(item.Jui_DateTime, 'dd/MM/yyyy', new Date());
  const formattedDateTime = format(itemDate, "d 'de' MMMM, yyyy", { locale: es })

  return (
    <Link href={`/prp/expensas/${pathParam}/juicios/${item.Jui_id}`} className="w-full">
      <div className="flex gap-2 bg-grey w-full flex-1 flex-col rounded-2xl p-3">
        <div className="flex flex-row items-center gap-2">
          <CardIcon className="bg-brown/10">
            <IconGavel size={48} className="text-brown" />
          </CardIcon>
          <div className="flex flex-1 flex-col">
            <div className="flex items-center justify-between">
              <p className="text-lg font-bold text-black">
                {item.Jui_Caratula}
              </p>
              <Button
                buttonPadding="pl-2"
                iconOrientation="right"
                classNameText="text-text-grey"
                icon={<IconChevronRight size={22} className="text-text-grey" />}
              />
            </div>
            <div className="flex mt-[4px] items-center justify-between">
              <div className="flex flex-wrap items-center gap-1">
                <Pill
                  text={formattedDateTime}
                  classNameText="text-sm text-text-grey"
                  className="py-0"
                />
                <Pill
                  text={item.Jui_Status}
                  variant={getStatusType("juicios", item.Jui_Status)}
                  classNameText="text-sm"
                  className="py-0"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default JudgmentCard;
