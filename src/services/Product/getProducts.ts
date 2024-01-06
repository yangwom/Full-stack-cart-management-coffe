"use server";

import supabase from "@/supabase";
import { IApiProduct } from "@/types";

type IGetProducts = () => Promise<IApiProduct[] | undefined>;

export const getProducts: IGetProducts = async () => {
  try {
    const { data, error } = await supabase.from("products").select('*');
    console.log(data)
    if (error) throw error;

    return data as IApiProduct[];
  } catch (e) {
    console.error(e);
  }
};
