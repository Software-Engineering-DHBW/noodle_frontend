<template>
  <v-treeview
    :items="lectureMaterial"
    item-key="name"
    expand-icon=""
    open-on-click
    hoverable
  >
    <template v-slot:prepend="{ item, open }">
      <v-icon
        v-if="!item.format"
        color="primary"
      >
        {{ open ? 'mdi-folder-open' : 'mdi-folder' }}
      </v-icon>
      <v-icon
        v-else
        color="primary"
      >
        {{ formats[item.format] }}
      </v-icon>
    </template>

    <template v-slot:append="{ item, open }">
      <v-btn
        v-if="item.format"
        icon
        @click.stop="downloadMaterial(item)"
      >
        <v-icon>mdi-download</v-icon>
      </v-btn>

      <v-btn
        v-if="item.format && canEdit"
        icon
        @click.stop="deleteMaterial(item)"
      >
        <v-icon>mdi-delete</v-icon>
      </v-btn>

      <v-btn
        v-if="!item.format && open && canEdit"
        icon
        @click.stop="addMaterial(item)"
      >
        <v-icon>mdi-plus</v-icon>
      </v-btn>
    </template>
  </v-treeview>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { namespace } from 'vuex-class';

const Auth = namespace('Auth');

@Component
export default class LectureMaterialTree extends Vue {
  @Prop({ required: true }) lectureMaterial: any;

  @Auth.Getter
  isAdmin!: boolean;

  @Auth.Getter
  isTeacher!: boolean;

  get canEdit(): boolean {
    return this.isAdmin || this.isTeacher;
  }

  formats = {
    file: 'mdi-file-outline',
    pdf: 'mdi-file-pdf-box',
    link: 'mdi-link',
  };

  // eslint-disable-next-line class-methods-use-this
  deleteMaterial(item: any): void {
    alert(`Material "${item.name}" wird gelöscht`);
  }

  // eslint-disable-next-line class-methods-use-this
  downloadMaterial(item: any): void {
    alert(`Material "${item.name}" wird heruntergeladen`);
  }

  // eslint-disable-next-line class-methods-use-this
  addMaterial(item: any): void {
    alert(`Material wird zu "${item.name}" hinzugefügt`);
  }
}
</script>
