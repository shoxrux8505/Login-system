<template>
    <div class="pagination">
      <button
        :disabled="currentPage === 1"
        @click="changePage(currentPage - 1)"
        class="pagination-button"
      >
        &#8592; Предыдущая
      </button>
      <span class="pagination-info">
        Страница {{ currentPage }} из {{ totalPages }}
      </span>
      <button
        :disabled="currentPage === totalPages"
        @click="changePage(currentPage + 1)"
        class="pagination-button"
      >
        Следующая &#8594;
      </button>
    </div>
  </template>
  
  <script>
 export default {
  name: 'PagiNation',
  props: {
    currentPage: {
      type: Number,
      required: true,
    },
    appeals: {
      type: Array,
      required: true,
    },
    itemsPerPage: {
      type: Number,
      required: true,
    }
  },
  computed: {
    totalPages() {
      return Math.ceil(this.appeals.length / this.itemsPerPage);
    }
  },
  methods: {
    changePage(newPage) {
      if (newPage >= 1 && newPage <= this.totalPages) {
        this.$emit("page-change", newPage); // Отправляем событие с новой страницей
      }
    },
  },
};
  </script>
  
  <style lang="scss">
  .pagination {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 1rem 0;
  
    .pagination-button {
      background-color: #3498db;
      color: #fff;
      border: none;
      padding: 0.5rem 1rem;
      margin: 0 0.5rem;
      border-radius: 4px;
      font-size: 0.9rem;
      cursor: pointer;
  
      &:disabled {
        background-color: #ddd;
        color: #aaa;
        cursor: not-allowed;
      }
  
      &:hover:not(:disabled) {
        background-color: #2980b9;
      }
    }
  
    .pagination-info {
      font-size: 1rem;
      color: #555;
    }
  }
  </style>
  