import EmptySection from '@/components/Sections/AppSections/Errors/EmptySection';
import Section from '@/components/Sections/AppSections/Section';
import NewsScreen from 'app/features/News/List';
import getParams from '@/env/getParams';
import { getUnitNews } from '@/lib/queries/queries';

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