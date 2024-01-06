import supabase from "@/supabase";

export const insertOrdersItems = async (productId: number, orderId: number, quantity: number, priceUnit: number) => {

  const { data, error } = await supabase
    .from('orders_items')
    .insert([
      { product_id: productId, order_id: orderId,  quantity: quantity, price_unit: priceUnit },
    ])
    .select()
  if (error) {
    console.error("erro ao inserir o itens do pedido", error)
  } else {
    return data
  }

}