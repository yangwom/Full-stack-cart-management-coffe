import supabase from "@/supabase";

export const insertOrder = async (total_value: number, payment_method: string, client_id: number, status: string) => {

  const { data, error } = await supabase
    .from('orders')
    .insert([
      { total_value: total_value, payment_method: payment_method, client_id: client_id, status: status },
    ])
    .select()
  if (error) {
    console.error("erro ao inserir o produto", error)
  } else {
    return data
  }

}