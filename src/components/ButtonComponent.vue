<template>
    <!--    <button @click="$emit('onClick')">-->
    <!--      <slot name="btnContent"></slot>-->
    <!--    </button>-->
      <button>
        <slot name="btnContent"></slot>
      </button>
    </template>
    
    <script>
    
    export default {
      name: 'ButtonComponent',
      components: {},
      data() {
        return {
    
        }
      },
    }
    </script>
    
<style lang="scss">
@import "../variables.scss";

.button-container-white {
    text-decoration: underline;
    font-size: 1rem;
    line-height: 1.5rem;
    text-align: center;
    font-weight: 700;
    border: 1px solid $grey-light;
    padding: 0.75rem 1.5rem;
    background: $white;
    border-radius: 1.375rem;
    &:hover {
        background: $grey-light;
    }

  a {
    color: inherit;
  }

}

.mob-button-container-white {
        font-size: 1rem;
        line-height: 1.5rem;
        text-align: center;
        border: 1px solid $grey-light;
        background: $white;
        height: 3rem;
        width: 3rem;
        border-radius: 50%;
  &:hover {
    background: $grey-light;
  }

  a {
    color: inherit;
  }
          svg {
            height: 1rem;
            width: 1rem;
          }

}

.mob-close-button {
  font-size: 1.25rem;
  line-height: 1.5rem;
  text-align: center;
  font-weight: 700;
  border: 1px solid $grey-light;
  background: $white;
  padding: 0.625rem 1rem;
  border-radius: 50%;
  &:hover {
    background-color: $grey-light;
  }
}

.order-form-submit-button {
  font-weight: 700;
  font-size: 1rem;
  line-height: 1.5rem;
  color: #FFFFFF;
  background: #0029FF;
  border-radius: 16px;
  padding: 1rem;
  margin: 0.5rem;
  border: none;
}

.disabled-button {
  background-color: $grey-light;
  font-weight: 700;
  font-size: 1rem;
  line-height: 1.5rem;
  color: #FFFFFF;
  border-radius: 16px;
  padding: 1rem;
  margin: 0.5rem;
  border: none;
}

.order-status-form-button {
  font-weight: 700;
  font-size: 1rem;
  line-height: 1.5rem;
  color: #FFFFFF;
  background: #0029FF;
  border-radius: 16px;
  padding: 1rem;
  margin: 0.5rem;
  border: none;
  width: 100%;
  margin-top: 56px;
}

//----- PC -----//
@media screen and (min-width: 1440px) {
  .typeButtons {
    display: inline-block;
    background-color: $white;
    color: $blue;
    border: 2px solid $blue;
    border-radius: 1.563rem;
    font-size: $font-size-base;
    height: 3.125rem;
    margin-top: 3.125rem;
    padding: 0 0.938rem;
  }

  #transportationButton {
    margin-left: 1.25rem;
  }

  .active {
    background-color: $blue;
    color: $white;
  }

}


@media screen and (min-width: 992px) and (max-width: 1439.98px) {
  .typeButtons {
    display: inline-block;
    background-color: $white;
    color: $blue;
    border: 2px solid $blue;
    padding: 0 0.938rem;
    border-radius: 1.563rem;
    font-size: $font-size-base;
    height: 3.125rem;
    margin-top: 3.125rem;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  #transportationButton {
    margin-left: 1.25rem;
  }

  .active {
    background-color: $blue;
    color: $white;
  }
}


//----- Tablet -----//
@media screen and (min-width: 768.1px) and (max-width: 991.98px) {
      .typeButtons {
        display: inline-block;
        background-color: $white;
        color: $blue;
        border: 2px solid $blue;
        padding: 0 0.938rem;
        border-radius: 1.563rem;
        font-size: $font-size-base;
        height: 3.125rem;
        margin-top: 1.875rem;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }

      #transportationButton {
        margin-left: 0;
      }
      .active {
        background-color: $blue;
        color: $white;
      }
    }

////----- Mobile -----//
@media screen and (min-width: 321px) and (max-width: 768px) {

    .typeButtons {
      display: inline-block;
      background-color: $white;
      color: $blue;
      border: 2px solid $blue;
      width: 300px;
      border-radius: 1.563rem;
      font-size: $font-size-base;
      height: 3.125rem;
      margin-top: 1.875rem;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    #transportationButton {
      margin-left: 0px;
      font-weight: 300;
    }
    .active {
      background-color: $blue;
      color: $white;
    }
  }

@media screen and (max-width: 320px) {
  .typeButtons {
    display: inline-block;
    background-color: $white;
    color: $blue;
    border: 2px solid $blue;
    padding: 0 0.938rem;
    border-radius: 1.563rem;
    font-size: $font-size-base;
    height: 3.125rem;
    margin-top: 3.125rem;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  #transportationButton {
    margin: 1rem;
  }

  #rentButton {
    margin: 1rem;
  }

  .active {
    background-color: $blue;
    color: $white;
  }
}

.modal-close-button {
  position: absolute;
  color: $white;
  width: 3rem;
  height: 3rem;
  background-color: $red;
  border-radius: 50%;
  border: none;
  font-size: 1.75rem;
  left: calc(100% - 1.5rem);
  top: -1.5rem;
}

.modal-order-button {
  margin-top: 2rem;
  box-sizing: border-box;
  width: 260px;
  height: 3.5rem;
  border: 2px solid #0029FF;
  border-radius: 1rem;
  font-weight: 700;
  font-size: 1rem;
  line-height: 1.5rem;
  text-align: center;
  color: #0029FF;
  background-color: $white;
  padding: 0;
  &:hover {
    color: $white;
    background-color: $blue;
  }
  a {
    color: $blue;
    text-decoration: none;
    height: 100%;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 1rem;

    &:hover {
      color: $white;
      background-color: $blue;
    }
  }
}

@media screen and (max-width: 576px) {
  .modal-close-button {
    position: absolute;
    color: $white;
    width: 3rem;
    height: 3rem;
    background-color: $red;
    border-radius: 50%;
    border: none;
    font-size: 1.75rem;
    top: 0;
    left: calc(100% - 3rem);
  }
}






</style>    