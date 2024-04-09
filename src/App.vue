<template>
  <v-app>
    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>

export default {
  name: "App",
};
</script>
<style>
.due-date {
    text-wrap: nowrap;
}

.due-date.red {
    background-color: red;
    color: white;
    padding: 2px 6px;
    border-radius: 4px;
}

.due-date.orange {
    background-color: orange;
    color: white;
    padding: 2px 6px;
    border-radius: 4px;
}
</style>