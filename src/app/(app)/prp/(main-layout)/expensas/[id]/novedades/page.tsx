import EmptySection from 'app/components/Messages/EmptySection';
import Section from 'app/components/Sections/Section';
import NewsScreen from 'app/features/News/List';
import getParams from 'app/hooks/use-get-params';
import { getUnitNews } from "app/services/queries";

const page = async ({ params: { id } }: { params: { id: string } }) => {
  const code = getParams({ params: id, type: "code" });

  if (!code) return null;

  const data = await getUnitNews({ code });

  if (data.ERRMSG || data.novedadesPorEdificio.length === 0) {
    return <EmptySection />
  }

  return (
    <Section className="w-full max-md:pb-0 mt-0">
      <NewsScreen 
        data={data.novedadesPorEdificio}
        param={id}
      />
    </Section>
  );
}

export default page