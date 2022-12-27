<template>
    <q-toolbar>
        <q-btn flat dense round @click="toggleLeftDrawer" aria-label="Menu" icon="menu" />

        <q-btn flat no-caps no-wrap class="q-ml-xs" v-if="$q.screen.gt.xs">
            <img alt="Quasar logo" src="~assets/img/logo.png" style="width: 160px; height: 30px" />
        </q-btn>

        <q-space />

        <div class="YL__toolbar-input-container row no-wrap">
            <q-input dense outlined square placeholder="Search" class="bg-white col" />
            <q-btn class="YL__toolbar-input-btn" color="grey-3" text-color="grey-8" icon="search" unelevated />
        </div>

        <q-space />

        <div class="q-gutter-sm row items-center no-wrap">
            <q-btn round dense flat color="grey-8" icon="video_call" v-if="$q.screen.gt.sm">
                <q-tooltip>Create a video or post</q-tooltip>
            </q-btn>
            <q-btn round dense flat color="grey-8" icon="apps" v-if="$q.screen.gt.sm">
                <q-tooltip>Apps</q-tooltip>
            </q-btn>
            <q-btn round dense flat color="grey-8" icon="message" v-if="$q.screen.gt.sm">
                <q-tooltip>Messages</q-tooltip>
            </q-btn>
            <q-btn round dense flat color="grey-8" icon="notifications">
                <q-badge color="red" text-color="white" floating>
                    2
                </q-badge>
                <q-tooltip>Notifications</q-tooltip>
            </q-btn>
            <q-btn round flat>
                <q-avatar size="26px">
                    <img src="https://cdn.quasar.dev/img/boy-avatar.png">
                </q-avatar>
                <q-tooltip>Account</q-tooltip>
            </q-btn>
        </div>
    </q-toolbar>
</template>
<script>
import { inject } from "vue";
export default {
    setup() {
        const emitter = inject("emitter");
        const toggleLeftDrawer = () => emitter.emit("toggleLeftDrawer", true);
        return {
            toggleLeftDrawer
        }
    }
}
</script>
