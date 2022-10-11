import { ApolloProvider } from "@apollo/client";
import client from "../apollo/apollo-client";
import { AppProps } from "next/app";
import 'bootstrap/dist/css/bootstrap.css';
import { Provider } from "react-redux";
import { store } from "../redux/store";
import AppWrapper from "../Components/AppWrapper";
import Navbar from "../Components/Navbar";


function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
    <ApolloProvider client={client}>
    <AppWrapper>
      <Navbar/>
      <Component {...pageProps} />
      </AppWrapper>
    </ApolloProvider>
    </Provider>
  );
}
export default MyApp;
