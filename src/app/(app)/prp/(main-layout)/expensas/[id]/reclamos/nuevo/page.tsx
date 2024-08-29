import NewRcl from '@/containers/rcl-page/new-rcl';

interface PageProps {
  params: {
    id: string;
  }
}

const page = ({ params }: PageProps) => {
  return <NewRcl id={params.id} />;
}

export default page