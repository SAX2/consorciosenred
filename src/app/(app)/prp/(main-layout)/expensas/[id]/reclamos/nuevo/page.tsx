import NewRcl from '@/containers/rcl-page/new-rcl';

const page = ({ params }: { params: { id: string } }) => {
  return <NewRcl id={params.id} />;
}

export default page