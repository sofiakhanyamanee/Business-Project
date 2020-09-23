const ROOT_URL = 'https://frebi.willandskill.eu/'
const API_URL = `${ROOT_URL}api/v1/`
// const AUTH_URL = `${ROOT_URL}auth/`
// const LOGIN_URL = `${ROOT_URL}api-token-auth/`

export default class {
  async register(
    firstName,
    lastName,
    email,
    password,
    organisationName,
    organisationKind
  ) {
    const url = `${ROOT_URL}auth/users/`;
    const payload = {
      firstName,
      lastName,
      email,
      password,
      organisationName,
      organisationKind,
    };
    return fetch(url, {
      method: "POST",
      headers: this.getPublicHeaders(),
      body: JSON.stringify(payload),
    });
  }

  async activateUser(uid, token) {
    const url = `${ROOT_URL}auth/users/activate/`;
    const payload = { uid, token };
    return fetch(url, {
      method: "POST",
      headers: this.getPublicHeaders(),
      body: JSON.stringify(payload),
    });
  }

  async login(email, password) {
    const url = `${ROOT_URL}api-token-auth/`;
    const payload = { email, password };
    return fetch(url, {
      method: "POST",
      headers: this.getPublicHeaders(),
      body: JSON.stringify(payload),
    });
  }

  async getCustomerList() {
    const url = `${API_URL}customers`
    // console.log(url)
    console.log(this.getPrivateHeaders())
    return fetch(url, {
      headers: this.getPrivateHeaders(),
    })
  }


  async createCustomer(payload) {
    const url = `${API_URL}customers`
    return fetch(url, {
      method: "POST",
      headers: this.getPrivateHeaders(),
      body: JSON.stringify(payload)
    })
  }

  async deleteCustomer(id) {
    const url = `${API_URL}customers/${id}/`
    return fetch(url, {
      method: "delete",
      headers: this.getPrivateHeaders(),
      body: JSON.stringify(id)
    })
  }


  setToken(token) {
    localStorage.setItem("BUSINESS_TOKEN", token);
  }

  getToken() {
    return localStorage.getItem("BUSINESS_TOKEN");
  }

  getPublicHeaders() {
    return {
      "Content-Type": "application/json",
    };
  }

  getPrivateHeaders() {
    return {
      "Content-Type": "application/json",
      Authorization: `Bearer ${this.getToken()}`,
    };
  }
}
