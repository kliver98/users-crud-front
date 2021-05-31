<template>
  <div>
    <div v-show="showLogin">
      <div>
        <b-navbar toggleable="lg" type="dark" variant="info">
          <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
          <b-collapse id="nav-collapse" is-nav>
            <!-- Right aligned nav items -->
            <b-navbar-nav class="ml-auto">
              <b-nav-form>
                <b-button
                  class="btn btn-success float-right"
                  type="submit"
                  v-on:click="loginShow()"
                  ><span id="btnLogin">Iniciar sesion</span></b-button
                >
              </b-nav-form>
            </b-navbar-nav>
          </b-collapse>
        </b-navbar>
      </div>
    </div>
    <div v-show="!showLogin">
      <div class="mt-4">
        <h1 class="display-4 text-center">Iniciar sesion</h1>
        <hr />
        <div id="error"></div>
        <form class="text-center" style="padding-left: 15%; padding-right: 15%">
          <div class="form-group">
            <label for="exampleFormControlInput1"
              ><span class="text-danger">*</span> Nombre de Usuario</label
            >
            <input
              type="email"
              class="form-control"
              id="usernameLogin"
              autocomplete="off"
            />
          </div>
          <div class="form-group">
            <label for="exampleFormControlInput1"
              ><span class="text-danger">*</span> Contraseña</label
            >
            <input
              type="password"
              class="form-control"
              id="passwordLogin"
              autocomplete="off"
            />
          </div>
          <div class="d-flex bd-highlight mb-3">
            <button
              type="button"
              class="btn btn-secondary p-2 bd-highlight pl-4 pr-4"
              @click="login"
            >
              <span id="action">login</span>
            </button>
            <button
              type="button"
              class="btn btn-danger ml-auto p-2 bd-highlight pl-3 pr-3"
              @click="cancelLogin"
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { AuthenticationController as auth } from "../modules/AuthenticationController";

export default {
  components: {},
  data() {
    return {
      baseAPIauth: process.env.VUE_APP_BASE_URL_API_AUTH,
      showLogin: true,
    };
  },
  methods: {
    loginShow() {
      this.showLogin = !this.showLogin;
    },
    login() {
      let username = document.getElementById("usernameLogin").value;
      let password = document.getElementById("passwordLogin").value;
      let userInfo = { username: username, password: password };

      auth
        .authenticate(userInfo)
        .then((res) => {
          console.log(res.data.username);
          this.loginShow();
          document.getElementById("btnLogin").innerHTML =
            "Bienvenido " + res.data.username;
        })
        .catch((err) => {
          alert("Error", err);
        });
    },
    cancelLogin() {
      this.loginShow();
    },
  },
};
</script>
