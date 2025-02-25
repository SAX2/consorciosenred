import React from 'react'
import footer from 'app/assets/constants/footer';
import Link from 'next/link';
import Image from 'next/image';
import { logoBackgroundBlue } from 'app/assets/images';

const Footer = () => {
  return (
    <footer className="w-full flex justify-center bg-white px-8">
      <div className="w-full max-w-[1000px] py-12 flex flex-col gap-10">
        <div className="grid gap-8 grid-cols-3 max-lg:grid-cols-2 max-md:grid-cols-1">
          <div className="flex flex-col gap-6">
            <div className="flex gap-2 items-center">
              <div className="flex items-center gap-2 transition-transform">
                <Image
                  src={logoBackgroundBlue}
                  alt="Logo con fondo azul"
                  width={40}
                  height={40}
                  className="w-[40px] max-md:w-[36px]"
                />
                <span
                  className={"text-blue italic font-bold text-lg max-md:!block"}
                >
                  Consorcios<span className="text-green-logo">en</span>red
                </span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {footer.social.map((media, index) => {
                return (
                  <a
                    aria-label={media.page.title}
                    href={media.page.path}
                    key={media.page.path === "#" ? index : `${Math.random() * 100}_${media.page.path}`}
                  >
                    {media.page.icon}
                  </a>
                );
              })}
            </div>
            <div className="col-start-2 max-lg:col-start-1 ">
              <p className="font-semibold text-black text-sm">Copyright ©</p>
              <p className="text-black text-sm">
                Sistemas Administrativos S.A. 2024
              </p>
            </div>
          </div>
          {footer.sections.map((sections, index) => {
            return (
              <div
                className="flex flex-col gap-8"
                key={`${index}_#${Math.random() * footer.sections.length}`}
              >
                {sections._.map((section) => {
                  return (
                    <div className="flex flex-col gap-2" key={section.title}>
                      <p className="font-semibold">{section.title}</p>
                      {section.items.map((item) => {
                        return (
                          <Link
                            title={item.page.title}
                            href={item.page.path}
                            key={item.page.title}
                            className="text-black hover:underline"
                          >
                            {item.page.button}
                          </Link>
                        );
                      })}
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>
    </footer>
  );
}

const Group = () => {
  return (
    <div>

    </div>
  );
}

export default Footer