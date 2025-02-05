import EmptySection from '@/components/Sections/AppSections/Errors/EmptySection';
import Section from '@/components/Sections/AppSections/Section';
import PaymentList, { BottomSectionPayments } from '@/containers/payments-page/payment-list';
import getParams from '@/env/getParams';
import { getUnitPayments } from '@/lib/queries/queries';

const page = async ({ params: { id } }: { params: { id: string } }) => {
  const unitId = getParams({ params: id, type: "id" });

  if (!unitId) return null;

  const data = await getUnitPayments({ id: unitId });

  let empty = !data || data.ERRMSG || data.notificaciones.length === 0;

  return (
    <div className="flex flex-col gap-4">
      <Section className="w-full pb-8 max-md:pb-0 mt-0">
        {empty && <EmptySection reload />} 
        {!empty && data.notificaciones.length > 0 && (
          <PaymentList items={data.notificaciones} />
        )}
        <BottomSectionPayments param={id}/>
      </Section>
    </div>
  );
}

export default page