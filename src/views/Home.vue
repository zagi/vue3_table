<template>
    <DataTable />
    <router-view />
</template>

<script>
import DataTable from "../components/DataTable.vue";

export default {
    name: "Home",
    components: {
        DataTable,
    }
};
</script>