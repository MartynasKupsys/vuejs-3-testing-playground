<template>
    <template v-if="isMainModal">
      <div class="modal fade" :id="idData" tabindex="-1" :aria-labelledby="idData+'Label'" aria-hidden="true">
        <div class="modal-dialog modal-md modal-lg modal-xl">
          <div class="modal-content modal-content-border-radius">
            <div class="modal-header" :class="{'modal-header-border': !showTitle}">
              <h5 class="modal-title" :id="idData+'Label'" v-if="showTitle">{{ modalTitle }}</h5>
              <ButtonComponent type="button" data-bs-dismiss="modal" aria-label="Close" class="modal-close-button">
                <template #btnContent>
                  <span><img src="../icons/xTimes-1.svg"></span>
                </template>
              </ButtonComponent>
            </div>
            <div class="modal-body" :class="{'modal-body-padding': !showTitle}">
              <slot name="body-content"></slot>
            </div>
          </div>
        </div>
      </div>
    </template>
  
    <!-- Custom-bootstrap modal container -->
  
    <template v-else-if="!isMainModal">
        <div :id="id" class="modal modal-custom" :class="zIndexCustom">
          <div class="modal-dialog modal-dialog-margin modal-md modal-lg modal-xl modal-dialog--open">
            <div class="modal-content modal-content-border-radius">
              <div class="modal-header image-modal-header">
                <ButtonComponent type="button" @click="close({id: id, backdrop: backdrop, bodyOverflow: bodyOverflow})" aria-label="Close" class="modal-close-button">
                  <template #btnContent>
                    <span><img src="../icons/xTimes-1.svg" alt="times"></span>
                  </template>
                </ButtonComponent>
              </div>
              <!-- <div v-show="showLink" class="vehicle-info-container-wrapper-header">
                <a @click="close({id: id, backdrop: backdrop, bodyOverflow: bodyOverflow})" class="d-flex">
                  <img src="../../../icons/arrow-right-1.svg" alt="arrow-1">
                  <div class="ps-3">{{ $t('choose-vehicle.back_to_list') }}</div>
                </a>
              </div> -->
              <slot name="body-content"></slot>
            </div>
          </div>
        </div>
    </template>
  
  </template>
  
  <script>
  import ButtonComponent from "./ButtonComponent.vue";
  
  export default {
    name: 'ModalComponent',
    components: {ButtonComponent},
    emits: ['close'],
    props: {
      idData: {
        type: String,
        default: '',
        required: false
      },
      modalTitle: {
        type: String,
        default: '',
        required: false
      },
      showTitle: {
        type: Boolean,
        default: true,
        required: false
      },
      isMainModal: {
        type: Boolean,
        default: true,
        required: false
      },
      zIndexCustom: {
        type: String,
        default: ''
      },
      showLink: {
        type: Boolean,
        default: false
      },
  
      id: {
        type: String,
        default: '',
      },
  
      backdrop: {
        type: String
      },
  
      bodyOverflow: {
        type: String
      }
    },
    data() {
      return {}
    },
  
    methods: {
  
      close(payload) {
  
        let parentEl = document.querySelector('body');
        let backdrop = document.querySelector('.' + payload.backdrop);
  
        let modal = document.querySelector('#' + payload.id);
        // @ts-ignore
        modal.style.display = 'none';
  
        // @ts-ignore
        parentEl.classList.remove(payload.bodyOverflow);
        if (backdrop && parentEl) {
          backdrop.classList.remove('fade-in-backdrop');
          backdrop.classList.add('fade-out-backdrop');
  
          backdrop.addEventListener('animationend', () => {
            if (backdrop && parentEl) {
              parentEl.removeChild(backdrop);
            }
          })
        }
  
      },
  
    }
  };
  
  </script>
  
  <style lang="scss">
  @import "../variables.scss";

.vehicle-info-container-wrapper-header {
  padding-top: 1.5rem;
  padding-right: 3.5rem;
  padding-left: 3.5rem;
  padding-bottom: 0.875rem;
  font-weight: 400;
  font-size: 1rem;
  line-height: 1.5rem;
  div {
    color: $black;
  }
  a {
    text-decoration: none;
    //width: 1.5rem;
    img {
      height: 1.5rem;
      width: 1.5rem;
    }
    &:hover {
      cursor: pointer;
    }
  }
}


.modal-dialog-margin {
  //margin: 0;
  border: none;
}

.image-modal-header {
  height: 0;
  border: none;
}

.image-modal-body {
  padding-bottom: 48px;
  padding-left: 48px;
  padding-right: 48px;
  img {
    width: 100%;
  }
}


.modal {

  &-custom {
    position: fixed;
    top: 0;
    left: 0;
    display: none;
    width: 100%;
    height: 100%;
    overflow-x: hidden;
    //overflow-y: scroll;
    outline: 0;
  }

  div.modal-content-border-radius {
    border-radius: 1.5rem;
  }
  div.modal-body-padding {
    padding: 0;
  }
}


.modal-header-border {
  border: none;
}

.z-index-custom-0 {
  z-index: 1058;
}

.z-index-custom-1 {
  z-index: 1059;
}

.body-overflow {
  overflow: hidden;
  padding-right: 17px;
}

.body-overflow-1 {
  overflow: hidden;
  padding-right: 17px;

}

.custom-modal-backdrop-0 {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1057;
  width: 100vw;
  height: 100vh;
  background-color: black;
  animation: fade-in 0.15s;
}

.custom-modal-backdrop-1 {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1058;
  width: 100vw;
  height: 100vh;
  background-color: black;
}

.fade-in-backdrop {
  opacity: 0.5;
  animation: fade-in 0.15s;
}

.fade-out-backdrop {
  opacity: 0;
  animation: fade-out 0.15s;
}

@keyframes fade-in {
  0%{
    opacity: 0;
  }
  100% {
    opacity: 0.5;
  }
}

@keyframes fade-out {
  0%{
    opacity: 0.5;
  }
  100% {
    opacity: 0;
  }
}


.modal {
  &--close {
    animation: modal-fade-out 0.3s linear;
    opacity: 0;
  }

  &-dialog {
    &--open {
      animation: modal-fade-in 0.3s linear;
    }

    &--close {
      animation: dialog-fade-out 0.3s linear;
      opacity: 0;
    }
  }

}

@keyframes modal-fade-in {
  0% {
    opacity: 0.15;
    transition: transform 0.3s ease-out;
    transform: translate(0, -50px);
  }

  100% {
    opacity: 1;
    transition: transform 0.5s ease-out;
    transform: translate(0, 0px);
  }
}

@keyframes modal-fade-out {
  0% {
    opacity: 1;
  }

  50% {
    opacity: 1;
  }

  100% {
    opacity: 0;
  }
}

@keyframes dialog-fade-out {
  0% {
    opacity: 1;
    transition: transform 0.3s ease-out;
    transform: translate(0, 0px);
  }

  100% {
    opacity: 0.15;
    transition: transform 0.3s ease-out;
    transform: translate(0, -50px);
  }
}

@media screen and (max-width: 520px) {
  .modal-dialog-margin {
    margin: 0;
    border: none;
  }
}




  
  </style>