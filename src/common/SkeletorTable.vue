<template>
    <tbody>
        <tr v-for="t in TR" :key="t">
            <td class="text-center" v-for="d in TD" :key="d">
                <q-skeleton animation="blink" type="text" width="80%" style="margin: 0 auto;" />
            </td>
        </tr>
    </tbody>
</template>
<script>
export default {
    props: ['TR', 'TD']
}
</script>
