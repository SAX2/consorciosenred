import Modal, { ModalContent } from '@/components/Modal';
import { DialogTitle } from '@/components/ui/dialog';
import NewRcl from '@/containers/rcl-page/new-rcl';
import getParams from '@/env/getParams';

interface PageProps {
  params: {
    id: string;
  }
}

const page = ({ params }: PageProps) => {
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