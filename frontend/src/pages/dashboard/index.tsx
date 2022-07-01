import { canSSAuth } from "../../utils/canSSAuth";
import Head from "next/head";
import { Header } from "../../components/Header";

export default function Dashboard() {
  return (
    <>
      <Head>
        <title>Painel - Pizzaria</title>
      </Head>
      <div>
        <Header />
      </div>
    </>
  );
}

export const getServerSideProps = canSSAuth(async (ctx) => {
  return {
    props: {},
  };
});
