import Link from 'next/link'
 
export default function NotFound() {
  return (
    <div className="w-full h-dvh bg-white dark:bg-black-app-bg flex flex-col gap-8 justify-center items-center">
      <div className='flex justify-center items-center flex-col'>
        <h2 className="font-bold font-geist text-[120px] leading-none">404</h2>
        <p className="text-text-grey text-base">
          No se ha podido encontrar la ruta
        </p>
      </div>
      <Link
        href="/prp/expensas"
        className="rounded-xl px-2 py-1 border border-outline bg-grey shadow-sm font-medium w-fit text-xl"
      >
        Volver
      </Link>
    </div>
  );
}