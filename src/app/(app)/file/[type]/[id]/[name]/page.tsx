import PDFViewer from './_components/PdfViewer';
import { getFiles } from '@/lib/queries/queries';
import { QueryFileProps } from '@/types/globals';
import React from 'react'

interface PageProps {
  params: QueryFileProps;
}

export async function generateStaticParams() {
  return [{ id: "1", name: "1", type: "1" }];
}

const page: React.FC<PageProps> = async ({ params: { id, name, type } }) => {
  const data = await getFiles({ id, name, type });

  return <PDFViewer base64String={data[type]} />;
};

export default page