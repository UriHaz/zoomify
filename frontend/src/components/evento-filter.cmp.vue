<template>
  <section >

    <el-input
      class="search"
      prefix-icon="el-icon-search"
      @input="filterOn"
      placeholder="Search events ..."
      v-model="filterBy.txt"
    ></el-input>
    <!-- <el-button type="primary" @click="clearAll">Clear All</el-button> -->
    <br />

    <!-- <el-select v-model="filterBy.sort" placeholder="Sort by ..." @change="filterOn">
      <el-option label="sort by: title" value="title"></el-option>
      <el-option label="sort by: price" value="price"></el-option>
      <el-option label="sort by: creator" value="creator.fullName"></el-option>
    </el-select>

    <el-select v-model="filterBy.order" placeholder="Select" @change="filterOn">
      <el-option label="Order: ascending" value="asc"></el-option>
      <el-option label="Order: descending" value="desc"></el-option>
    </el-select>

    <el-select v-model="filterBy.type" placeholder="Filter by category ..." @change="filterOn">
      <el-option label="Show all categories" value></el-option>
      <el-option label="Funny" value="Funny"></el-option>
      <el-option label="Educational" value="Educational"></el-option>
    </el-select> -->

  </section>
</template>

<script>
import { ValidationProvider } from "vee-validate";

export default {
  name: "evento-filter",
  data() {
    return {
      filterBy: {},
      email: ""
    };
  },
  components: {
    ValidationProvider
  },
  methods: {
    filterOn() {
      this.$store.commit({
        type: "updateFilterBy",
        filterBy: { ...this.filterBy }
      });
      this.$store.dispatch({ type: "loadEventos" });
    },
    clearAll() {
      this.filterBy.txt = "";
      this.filterBy.category = "";
      this.filterBy.order = "asc";
      this.filterOn();
    }
  },
  created() {
    const filter = this.$store.getters.filterBy;
    this.filterBy = { ...filter };
  }
};
</script>

<style lang="scss" scoped>
.el-select {
  margin: 5px 10px;
}
.el-button {
  margin: 0px 10px;
}
.el-input.search {
  max-width: 200px;
  margin-bottom: 10px;
  border-radius: 0.5rem;
}
</style>