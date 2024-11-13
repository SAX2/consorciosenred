import Section from '@/components/Sections/AppSections/Section';
import NoResult from '@/containers/errors/no-result';
import PaymentList from '@/containers/payments-page/payment-list';
import getParams from '@/env/getParams';
import { getUnitPayments } from '@/lib/queries/queries';

const page = async ({ params: { id } }: { params: { id: string } }) => {
  const unitId = getParams({ params: id, type: "id" });

  if (!unitId) return null;

  const data = await getUnitPayments({ id: unitId });

  if (data.ERRMSG) {
    return <NoResult message={data.ERRMSG}/>
  }

  return (
    <div className="flex flex-col gap-4">
      <Section
        title="Notificaciones de pago"
        pageTitle="Reclamos"
        className="w-full pb-8 max-md:pb-0 mt-0"
        isFirst
      >
        <PaymentList
          items={data.notificaciones}
        />
      </Section>
    </div>
  );
}

export default page