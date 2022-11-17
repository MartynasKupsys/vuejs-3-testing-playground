<template>
  <!-- <div class="drop-zone"
  @drop="onDrop($event)">
      <div v-for="(item, index) in items" :key="item.title" class="drag-el"
      @dragover.prevent 
      @dragenter.prevent
      :data-id="index"
      draggable="true"
      @dragstart="startDrag($event, items.indexOf(item))">
      {{ item.title }}
  </div>
  </div>
  <button @click="addNewItem">Add Item</button> -->
  <div>
    Test Calendar
  </div>
</template>
<script>
export default {
  name: 'App',
  data() {
      return {
          // items: [
          //     { id: 0, title: 'Item A' },
          //     { id: 1, title: 'Item B' },
          //     { id: 2, title: 'Item C' },
          //     { id: 3, title: 'Item D' },
          //     { id: 4, title: 'Item E' },
          // ]
      }
  },
  methods: {   
      // startDrag(evt, itemIndex) {     
      //     evt.dataTransfer.dropEffect = 'move'     
      //     evt.dataTransfer.effectAllowed = 'move'     
      //     evt.dataTransfer.setData('itemIndex', itemIndex);
      //     console.log(itemIndex);
           
      // },   
      // onDrop(evt) {
      //     console.log(evt.target.dataset.id);

      //   // swaping two items
      //     let temp = this.items[evt.dataTransfer.getData('itemIndex')];
      //     this.items[evt.dataTransfer.getData('itemIndex')] = this.items[Number(evt.target.dataset.id)];
      //     this.items[Number(evt.target.dataset.id)] = temp;

      //     console.log(this.items);
      // }, 
      // addNewItem() {
      //     this.items.push({id: this.items.length - 1, title: `Item ${this.items.length + 1}`})
      // }
  },
}
</script>
<style>
.drop-zone {
  background-color: #eee;
  margin-bottom: 10px;
  padding: 10px;
}
.drag-el {
  background-color: #fff;
  margin-bottom: 10px;
  padding: 5px;
}
</style>






<!-- <template>
  <CheckBox @increase="increaseCount" :count="count"></CheckBox>
 <div>{{dataValue}}</div>

  <div>
    <div>
      <div>inline</div>
      <div>inline img</div>
    </div>
    <div>forma blockas</div>
  </div>
</template>

<script>
import CheckBox from "@/components/CheckBox";

export default {
  name: 'App',
  components: {
    CheckBox
  },
  data() {
    return {
      // dataValue: false
      count: 0,
    }
  },
  // methods: {
  //   toggle() {
  //     this.dataValue = !this.dataValue
  //   }
  // }
  methods: {
    increaseCount() {
      this.count++;
    }
  }
}
</script>

<style>

</style> -->
