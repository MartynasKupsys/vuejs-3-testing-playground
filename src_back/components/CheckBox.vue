<template>
<!--    <input type="checkbox" @click="$emit('onClick')">-->
    <button @click="$emit('increase')">Click</button>
    <div> {{count}} </div>
</template>

<script>

export default {
  name: 'CheckBoxComponent',
  props: ['count'],
  data() {
    return {
    }
  },

}
</script>

<style>
  /*.checkboxText {*/
  /*  font-weight: 400;*/
  /*  font-size: 16px;*/
  /*  line-height: 24px;*/
  /*}*/

  /*input[type=checkbox] {*/
  /*  -webkit-appearance: none;*/
  /*  appearance: none;*/
  /*  background-color: #fff;*/
  /*  margin: 0;*/

  /*  font: inherit;*/
  /*  color: currentColor;*/
  /*  width: 24px;*/
  /*  height: 24px;*/
  /*  transform: translateY(-0.075em);*/

  /*  width: 24px;*/
  /*  height: 24px;*/
  /*  border: 1.5px solid #DEDEDE;*/
  /*  border-radius: 8px;*/

  /*  display: grid;*/
  /*  place-content: center;*/
  /*}*/

  /*input[type="checkbox"]::before {*/
  /*  content: "";*/
  /*  width: 24px;*/
  /*  height: 24px;*/
  /*  transform: scale(0);*/
  /*  transition: 120ms transform ease-in-out;*/
  /*  background: url("../icons/Framecheckbox.svg");*/
  /*}*/
  /*input[type="checkbox"]:checked::before {*/
  /*  transform: scale(1);*/
  /*}*/


</style>