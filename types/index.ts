import { ReactNode, SVGProps } from 'react';

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export type PageProps = {
  params: Promise<Record<string, string>>;
  searchParams: Promise<Record<string, string>>;
};

export type LayoutProps = {
  children: ReactNode;
  params: Promise<Record<string, string>>;
};

export enum Status {
  SUCCESS = 'SUCCESS',
  FAILED = 'FAILED',
}
