import { Dispatch, SetStateAction } from 'react';

export type ShowComponentProps = {
  show: boolean;
  componentName: string;
};

export type SideBarProps = {
  setShowComponent: Dispatch<SetStateAction<ShowComponentProps>>;
};

export type SellNowProps = SideBarProps & ShowComponentProps;

export type ModalProps = {
  hasCloseButton: boolean;
  title: string;
};

export type CarsBrandsSuccess = {
  description: string;
  name: string;
  yearOfEST: string;
  logoUrl: string;
}[];
