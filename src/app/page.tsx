import { GetServerSideProps } from "next";
import ProductList from "@/components/ProductsList/productsList";
import { Header } from "@/components/Header/header";
import coffeLogo from "../assets/Imagem.png";
import cart from "../assets/cartBuy.svg";
import clock from "../assets/clock.svg";
import embalagem from "../assets/box.svg";
import coffeSvg from "../assets/coffeLogo.svg";
import Image from "next/image";
import { ProductService } from "@/services/Product";
import { useProductTransform } from '@/hooks';
import S from "./page.module.css";

const Home = async () => {
  const products = await ProductService.getProducts();
  const allProducts = useProductTransform(products ?? []);

  return (
    <main className={S.teste}>
      <Header />
      <section className={S["section-information"]}>
        <section className={S["section-information-1"]}>
          <div className={S["header-content-section"]}>
            <h1 className={S["title-information"]}>
              Encontre o café perfeito para qualquer <br />
              hora do dia
            </h1>
            <p className={S["description"]}>
              Com o Coffee Delivery você recebe seu café onde estiver, a <br />
              qualquer hora
            </p>
          </div>
          <section className={S["section-svg"]}>
            <div className={S["container-description"]}>
              <div className={S["container-text-svg"]}>
                <Image
                  className={S["svg-style-information"]}
                  style={{ backgroundColor: "#C47F17" }}
                  src={cart as any}
                  alt={""}
                />
                <p className={S["text-svg"]}>Compra simples e segura</p>
              </div>

              <div className={S["container-text-svg"]}>
                <Image
                  className={S["svg-style-information"]}
                  style={{ backgroundColor: "#DBAC2C" }}
                  src={clock}
                  alt={""}
                />
                <p className={S["text-svg"]}>Entrega rápida e rastreada</p>
              </div>
            </div>
            <div className={S["container-description"]}>
              <div className={S["container-text-svg"]}>
                <Image
                  className={S["svg-style-information"]}
                  style={{ backgroundColor: "#574F4D" }}
                  src={embalagem}
                  alt={""}
                />
                <p className={S["text-svg"]}>Embalagem mantém o café intacto</p>
              </div>

              <div className={S["container-text-svg"]}>
                <Image
                  className={S["svg-style-information"]}
                  style={{ backgroundColor: "#8047F8" }}
                  src={coffeSvg}
                  alt={""}
                />
                <p className={S["text-svg"]}>
                  O café chega fresquinho até você
                </p>
              </div>
            </div>
          </section>
        </section>
        <Image className={S["coffe-logo"]} src={coffeLogo as any} alt="coffee" />
      </section>
      {allProducts?.length > 0 && <ProductList products={allProducts} />}
    </main>
  );
};

export default Home;
