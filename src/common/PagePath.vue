<template>
    <div class="row q-pt-xs q-mx-md">
        <div class="col flex items-center justify-between">
            <q-breadcrumbs-el class="text-bold text-blue-10" :label="`${route.meta.mode} - ${route.meta.resource}`"
                icon="widgets" />
            <q-btn flat class="text-blue-10" label="Volver" @click="goBack" />
        </div>
    </div>
</template>
<script>
import { useRouter, useRoute } from "vue-router";
export default {
    setup() {
        const router = useRouter();
        const route = useRoute();

        const goBack = () => {
            router.go(-1);
        };

        return {
            route,
            goBack
        };
    },
};
</script>
