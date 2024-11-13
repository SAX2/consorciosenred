import Modal from '@/components/Modal';
import NewRcl from '@/containers/rcl-page/new-rcl';
import getParams from '@/env/getParams';

const page = ({ params }: { params: { id: string } }) => {
  const unitId = getParams({ params: params.id, type: 'id' });

  return (
    <Modal
      isParallel
      hasDrawerResponsive
      dialogTitle="Nuevo reclamo"
      className="!max-w-[550px] gap-6 p-4"
    >
      <NewRcl id={unitId} />
    </Modal>
  );
}

export default page