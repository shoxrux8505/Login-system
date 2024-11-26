<template>
    <div class="modal" v-if="visible">
        <div class="modal-content">
            <h2 v-if="appeal">Редактирование заявки</h2>
            <h2 v-else>Создание новой заявки</h2>
            <form @submit.prevent="handleSubmit">
                <label>Дом</label>
                <select v-model="form.premise_id" required>
                    <option value="" disabled>Выберите дом</option>
                    <option v-for="premise in premises" :key="premise.id" :value="premise.id">
                        {{ premise.name }}
                    </option>
                </select>
                <!-- Остальные поля -->
                <button type="submit">Сохранить</button>
                <button type="button" @click="$emit('close')">Закрыть</button>
            </form>
        </div>
    </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
    props: {
        appeal: {
            type: Object,
            default: null
        },
        premises: {
            type: Array,
            // required: true
        },
        visible: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            form: this.appeal
                ? { ...this.appeal }
                : {
                    premise_id: null,
                    apartment_id: null,
                    applicant: {
                        first_name: "",
                        last_name: "",
                        patronymic_name: "",
                        username: "",
                    },
                    description: "",
                    due_date: "",
                },
        };
    },
    watch: {
        appeal(newVal) {
            this.form = newVal ? { ...newVal } : {
                premise_id: null,
                apartment_id: null,
                applicant: {
                    first_name: "",
                    last_name: "",
                    patronymic_name: "",
                    username: "",
                },
                description: "",
                due_date: "",
            };
        }
    },
    methods: {
        ...mapActions("appeals", ["createAppeal", "updateAppeal"]),
        async handleSubmit() {
            try {
                if (this.appeal) {
                    await this.updateAppeal(this.form);
                } else {
                    await this.createAppeal(this.form);
                }
                this.$emit("close");
            } catch (error) {
                console.error("Ошибка при сохранении заявки:", error);
                // Здесь можно добавить уведомление для пользователя
            }
        },
    },
};
</script>

<style lang="scss" scoped>
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;

  .modal-content {
    background-color: #fff;
    padding: 20px;
    border-radius: 8px;
    width: 500px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);

    h2 {
      margin-bottom: 20px;
      color: #007bff;
    }

    form {
      display: flex;
      flex-direction: column;

      label {
        margin-bottom: 5px;
        font-weight: bold;
      }

      select {
        margin-bottom: 20px;
        padding: 10px;
        border: 1px solid #ccc;
        border-radius: 5px;
        transition: border-color 0.3s ease;

        &:focus {
          border-color: #007bff;
        }
      }

      button {
        padding: 10px;
        margin-top: 10px;
        border: none;
        border-radius: 5px;
        cursor: pointer;
        transition: background-color 0.3s ease;

        &:first-of-type {
          background-color: #007bff;
          color: #fff;

          &:hover {
            background-color: #0056b3;
          }
        }

        &:last-of-type {
          background-color: #ccc;
          color: #333;

          &:hover {
            background-color: #aaa;
          }
        }
      }
    }
  }
}
</style>