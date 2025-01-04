import { cn } from '@/lib/utils';
import React, { PropsWithChildren } from 'react'

interface ArticleProps extends PropsWithChildren {
  className?: string;
}

export const Article = ({ children, className }: ArticleProps) => {
  return (
    <article
      className={cn(
        "flex flex-col w-full px-8 max-md:px-4 items-center",
        className
      )}
    >
      {children}
    </article>
  );
}

interface SectionProps extends PropsWithChildren {
  className?: string;
}

export const Section = ({ children, className }: SectionProps) => {
  return (
    <section className={cn("flex h-full max-w-[1000px] w-full", className)}>
      {children}
    </section>
  );
}

interface SectionArticleProps extends PropsWithChildren {
  articleClassName?: string;
  sectionClassName?: string;
}

const SectionArticle = ({ articleClassName, children, sectionClassName }:SectionArticleProps) => {
  return (
    <Article className={articleClassName}>
      <Section className={sectionClassName}>{children}</Section>
    </Article>
  );
}

export default SectionArticle