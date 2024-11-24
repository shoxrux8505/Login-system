<template>
  <div class="container">
    <div id="app">
      <header>
        <nav v-if="isAuthenticated">
          <router-link to="/">Список заявок</router-link>
          <button @click="logout">Выйти</button>
        </nav>
      </header>
      <!-- <LoginView/> -->
      <main>
        <!-- Здесь рендерятся текущие страницы -->
        <router-view />
      </main>
      <footer>
        <p>© 2024 WoxWeb. Все права защищены.</p>
      </footer>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  name: 'App',
  computed: {
    ...mapState("auth", ["isAuthenticated"]), // Проверка аутентификации
  },
  methods: {
    ...mapActions("auth", ["logout"]), // Выход из системы
  },

};
</script>

<style lang="scss">
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
  font-family: sans-serif;
}

@mixin flex {
  display: flex;
  align-items: center;
  justify-content: center;
}

:root {
  --green: #44A248;
  --white: #ffffff;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.container {
  width: 100%;
  height: 100vh;
  background: url('./assets/img/076dc3828d4323a8f6f5d083dfaff115.jfif') no-repeat;
  background-position: 0px -500px;
  @include flex();

}

#app {
  display: flex;
  flex-direction: column;
  min-height: 20vh;

  header {
    background-color: #34495e;
    color: #000;
    padding: 1rem;
    display: flex;
    justify-content: space-between;
    align-items: center;

    nav {
      a {
        color: #000;
        margin-right: 1rem;
        text-decoration: none;

        &:hover {
          text-decoration: underline;
        }
      }

      button {
        background-color: transparent;
        color: #fff;
        border: none;
        cursor: pointer;

        &:hover {
          text-decoration: underline;
        }
      }
    }
  }

  main {
    flex: 1;
    padding: 2rem;
    background-color: #f9f9f9;
  }

  footer {
    background-color: #34495e;
    color: #fff;
    text-align: center;
    padding: 1rem;
  }
}
</style>
