import EmptySection from '@/components/Sections/AppSections/Errors/EmptySection';
import PDFViewer from './_components/PdfViewer';
import { getFiles } from '@/lib/queries/queries';
import { QueryFileProps } from '@/types/globals';
import Image from 'next/image';
import React from 'react'
import { IconFaceIdError } from '@tabler/icons-react';
import Header from './_components/Header';

interface PageProps {
  params: QueryFileProps;
}

export async function generateStaticParams() {
  return [{ id: "1", name: "1", type: "1" }];
}

const page: React.FC<PageProps> = async ({ params: { id, name, type } }) => {
  const data = await getFiles({ id, name, type });

  if (data.ERROR) {
    return (
      <EmptySection
        reload
        Icon={IconFaceIdError}
        title="Ocurrió un error al obtener datos"
        description="Hubo un problema al procesar la solicitud. Por favor, verifica tu conexión e intenta nuevamente."
      />
    );
  }

  if (data.ContentType === "application/pdf") {
    return <PDFViewer base64String={data[type]} />;
  }

  return (
    <div className="flex flex-col h-dvh">
      <Header />
      <div className="flex flex-1 w-full justify-center items-center">
        <Image
          alt={id}
          src={`data:${data.ContentType};base64,${data[type]}`}
          width={500}
          height={500}
          className="h-auto max-h-[calc(100dvh-104px)] object-contain"
        />
      </div>
    </div>
  );
};

export default page