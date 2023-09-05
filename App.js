import { StyleSheet } from "react-native";
import { ModalPortal } from "react-native-modals";
import { Provider } from "react-redux";
import { registerRootComponent } from 'expo';
import StackNavigator from "./StackNavigator";
import store from "./store";

export default function App() {
  return (
    <>
      <Provider store={store}>
        <StackNavigator />
        <ModalPortal />
      </Provider>
    </>
  );
}

registerRootComponent(App);

const styles = StyleSheet.create({
});