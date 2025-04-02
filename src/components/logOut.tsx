import useMyStore from "../store/my-store";

function logOut() {
  useMyStore.getState().logout();
}

export default logOut;
