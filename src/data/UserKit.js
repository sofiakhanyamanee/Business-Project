const ROOT_URL = 'https://frebi.willandskill.eu/'
const API_URL = `${ROOT_URL}api/v1/`
// const AUTH_URL = `${ROOT_URL}auth/`
// const LOGIN_URL = `${ROOT_URL}api-token-auth/`

export default class {
  async register(data) {
    const url = `${ROOT_URL}auth/users/`;
    return fetch(url, {
      method: "POST",
      headers: this.getPublicHeaders(),
      body: JSON.stringify(data),
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

  async login(data) {
    const url = `${ROOT_URL}api-token-auth/`;
    return fetch(url, {
      method: "POST",
      headers: this.getPublicHeaders(),
      body: JSON.stringify(data),
    });
  }



  async getUser(){
    const url = `${ROOT_URL}api/v1/me`
    return fetch(url, {
      method: "GET",
      headers: this.getPrivateHeaders(),
      body: JSON.stringify()
    });
  }

  async getCustomerList() {
    const url = `${API_URL}customers`
    return fetch(url, {
      headers: this.getPrivateHeaders(),
    })
  }

  async getCustomerDetails(id) {
    const url = `${API_URL}customers/${id}/`
    return fetch(url, {
      headers: this.getPrivateHeaders(),
    })
  }


  async createCustomer(data) {
    const url = `${API_URL}customers`
    return fetch(url, {
      method: "POST",
      headers: this.getPrivateHeaders(),
      body: JSON.stringify(data)
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

  async editCustomer(id, data){
    const url = `${API_URL}customers/${id}/`
    return fetch(url, {
      method: "PATCH",
      headers: this.getPrivateHeaders(),
      body: JSON.stringify(data)
    })
  }


  setToken(token) {
    localStorage.setItem("BUSINESS_TOKEN", token);
  }

  getToken() {
    return localStorage.getItem("BUSINESS_TOKEN");
  }

  removeToken() {
    return localStorage.clear();
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
