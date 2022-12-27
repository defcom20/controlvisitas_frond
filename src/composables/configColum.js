import { ref } from 'vue'

export default function showTableColumn(options) {

    const group = ref([])

    function columnTable(val) {
        const res = options.filter(x => x.column === val)
        res[0].hidden = !res[0].hidden
    }

    function columActive() {
        options.forEach(item => {
            if (item.hidden === false) {
                group.value.push(item.column)
            }
        })
    }

    columActive()

    return {
        group,
        columnTable,
    }
}
