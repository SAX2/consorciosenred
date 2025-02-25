import NewRcl from 'app/features/Issues/Create';

const page = ({ params }: { params: { id: string } }) => {
  return <NewRcl id={params.id} />;
}

export default page