<template>
  <v-list three-line>
    <v-list-item v-for="item in getFiles" :key="item.id_document">
      <v-list-item-avatar
        tile
        @click.prevent="download(item.doc_name, item.file_ext)"
      >
        <v-img :src="require('@/assets/icons/pdf.svg')"></v-img>
      </v-list-item-avatar>

      <v-list-item-content>
        <v-list-item-title>{{ item.doc_name }}.{{ item.file_ext }}</v-list-item-title>
      </v-list-item-content>
    </v-list-item>
  </v-list>
</template>
<script>
import { mapGetters } from "vuex";

export default {
  name: "fileList",
  computed: {
    ...mapGetters(["getFiles"]),
  },
  methods: {
    download(file, ext) {
      const url = `${file}.${ext}`;
      const link = document.createElement("a");
      link.href = url;
      link.download = url;
      link.click();
    },
  },
};
</script>
