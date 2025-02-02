<template>
    <div ref="modal" class="modal fade" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="exampleModalLabel">
                        <slot name="header"></slot>
                    </h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body" v-text="message"></div>
                <div class="modal-footer">
                    <slot name="buttons"></slot>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {Modal} from "bootstrap";

export default {
    name: "ConfirmModal",

    data() {
        return {
            modal: null,
            message: null
        }
    },

    mounted() {
        this.modal = new Modal(this.$refs.modal, {});
    },

    methods: {
        show(message) {
            this.message = message;
            this.modal.show();
        },

        hide() {
            this.modal.hide();
        }
    }
};
</script>