import { imagens } from './Services'
import maisImg from '../../assets/+.svg'
import menosImg from '../../assets/-.svg'
import buttonCart from '../../assets/ShoppingCartSimple.svg'
import S from '../CoffeList/CoffeList.module.css'
import api from '../../utils/axios'
import useQuery from '../../Hook/useQuery'

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

  const { data, refetch } = useQuery<teste>("https://localhost:7140/produtos")
  const image = imagens.map((img, index) => {
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

  async function increment(product: responseCart) {
    const newQuantity = product.quantity += 1
    const newItem = { ...product, quantity: newQuantity }

    const res = await api.put(`/produtos/atualizarproduto/${product.id}`, newItem)

    if (res.status === 200) {
      refetch()
    }

  }

  async function decrement(product: responseCart) {

    let newQuantity = product.quantity;
    if(newQuantity != 1) {
     newQuantity = product.quantity -= 1
    }
    const newItem = {...product, quantity: newQuantity}
  
    const res = await api.put(`/produtos/atualizarproduto/${product.id}`, newItem)

    if (res.status === 200) {
      refetch()
    }
   }

    


  return (
    <div className={S["container-coffe"]}>
      <h1>Nossos Cafés</h1>

      <section className={S["container-list"]}>
        {completeProducts?.map((product) => (
          <div key={product.id} className={S["card-coffe"]}>
            <img src={product.image?.img} alt="" />
            <span>{product.type}</span>
            <h3>{product.productName}</h3>
            <p>{product.desCription}</p>
            <div className={S["cart-add-quantity"]}>
            <p>R$<strong>{`${(Math.round(product.productPrice * 100) / 100).toFixed(2)}`}</strong></p>
              <div className={S["container-quantity"]}>
              <button onClick={() => increment(product)} className={S["button-quantity"]}><img id={`${product.id}`} src={maisImg} alt="" /></button>
              <strong>{product.quantity}</strong>
              <button onClick={() => decrement(product)} className={S["button-quantity"]}><img src={menosImg} alt="" /></button>
              </div>
             
              <button className={S["button-add-cart"]}>
                <img src={buttonCart} alt="" />
              </button>
            </div>
          </div>
        ))}
      </section>
    </div>
  )
}

export default CoffeList;