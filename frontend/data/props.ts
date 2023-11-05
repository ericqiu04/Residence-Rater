import {NextRouter} from "next/router";

export type RouterProps = {
    router:NextRouter
}

//university 
export type UniPropProp = {
    key: number;
    name: string;
    logo: string;
  }

//residence props
export type resDescProps = {
    residence: string | string[]
    pricing: string | string[]
    rating: string | string[]
    style: string 
}

export type ResImageProps = {
    images: any[];
  };

export type ResPropProp = {
  resName: string;
  resImageLink: any;
  rating: string;
  uniName: string;
}

export type MapProps = {
    residence: string | string[];
  };

export type RatingProps = {
  uniName: string | string[],
  resName: string | string[],
  router:NextRouter
}