import Button from "../../../../packages/components/Buttons/Button";
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
      <div className="flex gap-2 bg-grey dark:bg-grey-dark w-full flex-1 flex-col rounded-2xl p-3">
        <div className="flex flex-row items-center gap-3">
          <CardIcon className="bg-brown/10 dark:bg-brown-dark/10">
            <IconGavel size={48} className="text-brown dark:text-brown-dark" />
          </CardIcon>
          <div className="flex flex-1 flex-col">
            <div className="flex items-center justify-between gap-2">
              <p className="text-lg font-bold">
                {item.Jui_Caratula}
              </p>
              <Button
                iconOrientation="right"
                classNameText="text-text-grey"
                buttonBackground=""
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
