<template>
    <div class="appeals">
        <h1>Список заявок</h1>
        <div class="filters">
            <input v-model="search" @input="fetchAppeals" placeholder="Поиск..." />
            <select v-model="selectedPremise" @change="fetchAppeals">
                <option v-for="premise in premises" :key="premise.id" :value="premise.id">
                    {{ premise.name }}
                </option>
            </select>
        </div>
        <table>
            <thead>
                <tr>
                    <th>№</th>
                    <th>Создана</th>
                    <th>Адрес</th>
                    <th>Заявитель</th>
                    <th>Описание</th>
                    <th>Срок</th>
                    <th>Статус</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="appeal in appeals" :key="appeal.number" @click="openModal(appeal)">
                    <td>{{ appeal.number }}</td>
                    <td>{{ appeal.created_at }}</td>
                    <td>{{ appeal.premise }} {{ appeal.apartment }}</td>
                    <td>{{ appeal.applicant }}</td>
                    <td>{{ appeal.description }}</td>
                    <td>{{ appeal.due_date }}</td>
                    <td>{{ appeal.status }}</td>
                </tr>
            </tbody>
        </table>
        <PagiNation :currentPage="currentPage" :totalPages="totalPages" @page-change="handlePageChange" />
        <appeal-modal v-if="selectedAppeal" :appeal="selectedAppeal" @close="closeModal" />
    </div>
</template>
<script>
import { mapState, mapActions } from "vuex";
import AppealModal from "../components/AppealModal.vue";
import PagiNation from "../components/Pagination.vue";

export default {
    components: { AppealModal, PagiNation },
    data() {
        return {
            search: "",
            selectedPremise: null,
            selectedAppeal: null,
        };
    },
    computed: {
        ...mapState("appeals", ["appeals", "currentPage", "totalPages", "premises"]),
    },
    methods: {
        ...mapActions("appeals", ["fetchAppeals", "fetchPremises", "setPage"]),
        openModal(appeal) {
            this.selectedAppeal = appeal;
        },
        handlePageChange(newPage) {
            this.setPage(newPage);
            this.fetchAppeals();
        },
        async fetchAppeals() {
            try {
                await this.$store.dispatch("appeals/fetchAppeals", {
                    search: this.search,
                    premise: this.selectedPremise,
                });
            } catch (error) {
                console.error("Ошибка при загрузке заявок:", error);
            }
        },
        closeModal() {
            this.selectedAppeal = null;
            this.fetchAppeals();
        },
    },
    created() {
        this.fetchPremises();
        this.fetchAppeals();
    },
};
</script>
<style lang="scss" scoped>
.appeals {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  font-family: 'Arial', sans-serif;
  color: #333;

  h1 {
    text-align: center;
    margin-bottom: 20px;
    color: #007bff;
  }

  .filters {
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;

    input, select {
      padding: 10px;
      border: 1px solid #ccc;
      border-radius: 5px;
      width: 48%;
      transition: border-color 0.3s ease;

      &:focus {
        border-color: #007bff;
      }
    }
  }

  table {
    width: 100%;
    border-collapse: collapse;
    margin-bottom: 20px;

    th, td {
      padding: 10px;
      text-align: left;
      border-bottom: 1px solid #ddd;
    }

    th {
      background-color: #f8f9fa;
    }

    tr:hover {
      background-color: #f1f1f1;
      cursor: pointer;
    }
  }
}
</style>