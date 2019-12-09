export class CommonService {
  fixFormatVND(nStr) {
    nStr = nStr + "";
    let x = nStr.split(".");
    let x1 = x[0];
    let x2 = x.length > 1 ? "." + x[1] : "";
    var rgx = /(\d+)(\d{3})/;
    while (rgx.test(x1)) {
      x1 = x1.replace(rgx, "$1" + "," + "$2");
    }
    return x1 + x2;
  }

  checkErrorToken(response, vm) {
    if (response.data.errorToken) {
      vm.$swal({
        title: "Error",
        text: response.data.errorToken
      }).then(() => {
        localStorage.removeItem("name");
        localStorage.removeItem("token");
        vm.$router.push({ name: "storeLoginPage" });
      })
    } else {
      return true
    }
  }
  checkErrorTokenCustomer(response, vm) {
    if (response.data.errorToken) {
      vm.$swal({
        title: "Error",
        text: response.data.errorToken
      }).then(() => {
        localStorage.removeItem("cname");
        localStorage.removeItem("ctoken");
        vm.$router.push({ name: "home-page" });
      })
    } else {
      return true
    }
  }
}