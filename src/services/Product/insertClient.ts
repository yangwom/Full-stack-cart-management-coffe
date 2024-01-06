import supabase from "@/supabase";

export const insertClient = async (name: string) => {

  const { data, error } = await supabase
    .from('clientes')
    .insert([
      { name: name },
    ])
    .select()
  if (error) {
    console.error("erro em inserir o cliente", error)
  } else {
    return data
  }

}