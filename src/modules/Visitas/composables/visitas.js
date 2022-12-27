import { ref, reactive } from 'vue'

import configTable from '../../../composables/configTable'

export default function composableModuls(name) {

  const { table } = configTable(name);
  const check_select = ref([])
  const filterable = reactive(table)

  const check = (event) => {
    if (check_select.value == event) {
      check_select.value = [];
    } else {
      check_select.value = [];
      check_select.value.push(event);
    }
  }
  return {
    filterable,
    check_select,
    check
  }
}
