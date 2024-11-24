<template>
    <div class="form-content">
        <h2>Авторизация</h2>
        <form action="#" @submit.prevent="handleLogin">
            <div class="input-box">
                <img src="../assets/img/phone.png" alt="number">
                <input type="text" id="phone" placeholder="Логин или Телефон" v-model="username" required>
            </div>
            <div class="input-box">
                <img src="../assets/img/lock.png" alt="number">
                <input type="password" id="password" placeholder="Пароль" v-model="password" required>
                <img src="../assets/img/parolviewer.png" alt="">
            </div>
            <button class="btn">Войти</button>
            <p v-if="errorMessage">{{ errorMessage }}</p>
        </form>
    </div>
</template>
<script>
import { mapActions } from "vuex";

export default {
    data() {
        return {
            username: "",
            password: "",
            errorMessage: null,
        }
    },
    methods: {
        ...mapActions("auth", ["login"]),
        async handleLogin() {
            try {
                await this.login({ username: this.username, password: this.password });
                this.$router.push("/");
            } catch (error) {
                this.errorMessage = "Неправильные данные";
            }
        }
    }
}
</script>

<style lang="scss">
@mixin flex {
    display: flex;
    align-items: center;
    justify-content: center;
}

:root {
    --green: #44A248;
    --white: #ffffff;
}

.form-content {
    width: 340px;
    height: 309px;
    border-radius: 5px;
    background: var(--white);
    @include flex();
    flex-direction: column;
    row-gap: 20px;

    h2 {
        position: relative;
        top: -20px;
        width: 308px;
        height: 56px;
        background: var(--green);
        @include flex();
        border-radius: 10px;
        color: #fff;
    }

    form {
        width: 340px;
        height: 290px;
        @include flex();
        flex-direction: column;
        row-gap: 20px;

        .input-box {
            @include flex();
            gap: 20px;
            border-bottom: 2px solid #CCCCCC;

            input {
                width: 220px;
                height: 24px;
                border: none;
                outline: 0;
                font-size: 16px;
                @include flex();

                &:nth-child(1) {
                    width: 300px;
                    height: 24px;

                }
            }

            input:active label {
                background: red;
            }

            label {
                position: absolute;
                display: inline;
                color: var(--green);
                font-size: 16px;
                text-align: center;

            }
        }

        .btn {
            width: 110px;
            height: 36px;
            background: var(--green);
            border: none;
            color: var(--white);
            border-radius: 5px;
            cursor: pointer;
        }
    }
}
</style>