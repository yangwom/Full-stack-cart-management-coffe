import supabase from "@/supabase";
import { joinClientAndOrderClient } from "@/types";

export const deleteClient = async (clientId: number) => {
  try {
    const { error } = await supabase
      .from("clientes")
      .delete()
      .eq("id", clientId);

    if (error) {
      throw error;
    }

  } catch (e) {
    console.error(e);
  }
};

export const deleteOrders = async (clientId: number) => {
  try {
    const { error } = await supabase
      .from("orders")
      .delete()
      .eq("client_id", clientId);

    if (error) {
      throw error;
    }

  } catch (e) {
    console.error(e);
  }
};



export const deleteOrderItems = async (orderItemId: number) => {
  try {
    const { error } = await supabase
      .from("orders_items")
      .delete()
      .eq("id", orderItemId );

    if (error) {
      throw error;
    }

  } catch (e) {
    console.error(e);
  }
}
