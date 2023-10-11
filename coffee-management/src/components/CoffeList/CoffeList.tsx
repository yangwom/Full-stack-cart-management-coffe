import { useFetch } from '../../Hook/useFetch'
import { imagens } from './Services'
import S from  '../CoffeList/CoffeList.module.css'

function CoffeList() {


    type teste = {
      products: responseCart[],
      total: number,
    }
   
    type responseCart = {
     id: number,
     type: string,
     productName: string,
     desCription: string,
     productPrice: number,
     quantity: number,
     totalByProduct: number
    }

   
 
const { data } = useFetch<teste>("https://localhost:7140/carrinho")
const image = imagens.map((img, index )=> {
return {
  id: index + 1,
  img
}
})
const completeProducts = data?.products.map((product) => {
  return {
   ...product,
   image: image.find(t => t.id == product.id)
  }
})

return (
    <div className={S["container-coffe"]}>
      <h1>Nossos Cafés</h1>

       <section className={S["container-list"]}>
        {completeProducts?.map((product) => (
            <div className={S["card-coffe"]}>
              <img src={product.image?.img} alt="" />
               <span>{product.type}</span>
               <h3>{product.productName}</h3>
               <p>{product.desCription}</p>
               <strong>{`R$ ${(Math.round(product.productPrice* 100) / 100).toFixed(2)}`}</strong>
               <strong>{product.quantity}</strong>
                
            </div>
        ))}
       </section>
    </div>
)
}

export default CoffeList;