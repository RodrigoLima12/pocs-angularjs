import { CustomRouter } from "@utils/router";
import { getUrlLogout } from "@core/decorators/catch";

export const ServerError = {
  showErrorPage: (message) => {
    console.log("server error")
    const url = getUrlLogout();
    CustomRouter.navigate('erro', { message, url });
  }
}
