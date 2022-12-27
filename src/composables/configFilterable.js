import { ref, inject, reactive, onMounted, computed } from "vue";
import { useQuasar, QSpinnerGears } from "quasar";
import { getDataTable } from '../services'


//import tabla from '../Moduls/configSubModuls'

export default function filterable(apiPath, column) {

    const emitter = inject("emitter");
    const $q = useQuasar();

    const globalVal = reactive({
        dataToExport: [],
        errors: [],
        appliedFilters: [],
        filterCandidates: [],
        collection: [],
        loading: true,
        fixed: false,
        options: [5, 7, 10, 13, 15, 17, 18],
        optionsStatus: [{ label: "Ingreso", value: 5 }, { label: "Salida", value: 6 }],
        optionsStatusEstado: [{ label: "Activo", value: 1 }, { label: "Eliminados", value: 2 }],
        optionsStatusContract: [{ label: "Temporal", value: 0 }, { label: "Ocacional", value: 1 }, { label: "Accidental", value: 2 }, { label: "Mantenimiento", value: 3 }],
        //optionsStatus: [0,1,2]
    })

    const query = reactive({
        order_column: "created_at",
        order_direction: "desc",
        filter_match: "and",
        limit: 5,
        page: 1,
    });

    emitter.on("updateTable", () => {
        resetFilter();
    });
    emitter.on("updateTableNormal", () => {
        resetFilterNormal();
    });

    emitter.on("showModalFilter", () => {
        globalVal.fixed = true;
    });

    emitter.on("exportTable", () => {
        exportarExcel()
    });

    onMounted(() => {
        fetch();
        addFilter();
    });

    const totalColumnas = computed(() => {
        return column.filter(element => element.hidden == false);
    });

    const exportarExcel = () => {

        globalVal.dataToExport = []
        if (globalVal.loading) {
            globalVal.loading = false
            $q.loading.show({ backgroundColor: 'green', message: 'Cargando...' })
            query.limit = globalVal.collection.total
            query.order_direction = 'asc'
            const filters = getFilters()
            const params = {
                ...filters,
                ...query
            }
            console.log(params, globalVal.collection.total);
            // api.get(apiPath, { params: params })
            //   .then((res) => {
            //     $q.loading.show({
            //       spinner: QSpinnerGears,
            //       spinnerColor: 'blue-9',
            //       messageColor: 'black',
            //       backgroundColor: 'green',
            //       message: 'Procesando datos a Excel'
            //     })
            //     globalVal.dataToExport = res.data.collection.data
            //   })
            //   .catch(error => {
            //     $q.loading.hide()
            //   })
            //   .finally(() => {
            //     globalVal.loading = true

            //   })
        }
    }

    function removeFilter(f, i) {
        globalVal.filterCandidates.splice(i, 1);
    }

    function applyFilter() {
        globalVal.appliedFilters = JSON.parse(JSON.stringify(globalVal.filterCandidates));
        query.page = 1;
        fetch();
        /*globalVal.errors ?
          $q.notify({ type: "negative", position: "top-right", timeout: 1000, message: "Tabla no filtrado, campos requeridos"})
          :*/
        $q.notify({ type: "info", position: "top-right", timeout: 1000, message: "Tabla filtrada" })
    }

    function updateOrderDirection() {
        if (query.order_direction === "desc") {
            query.order_direction = "asc";
        } else {
            query.order_direction = "desc";
        }
    }

    function selectColumn(i, e) {
        if (e.length === 0) {
            globalVal.filterCandidates[i].operator = e;
            return;
        }
        globalVal.filterCandidates[i].column = e;
        switch (e.type) {
            case "numeric":
                globalVal.filterCandidates[i].operator = availableOperators()[4];
                globalVal.filterCandidates[i].query_1 = null;
                globalVal.filterCandidates[i].query_2 = null;
                break;
            case "static_lookup":
                globalVal.filterCandidates[i].operator = availableOperators()[16];
                globalVal.filterCandidates[i].query_1 = null;
                globalVal.filterCandidates[i].query_2 = null;
                break;
            case "string":
                globalVal.filterCandidates[i].operator = availableOperators()[6];
                globalVal.filterCandidates[i].query_1 = null;
                globalVal.filterCandidates[i].query_2 = null;
                break;
            case "datetime":
                globalVal.filterCandidates[i].operator = availableOperators()[9];
                globalVal.filterCandidates[i].query_1 = 28;
                globalVal.filterCandidates[i].query_2 = "days";
                break;
            case "counter":
                globalVal.filterCandidates[i].operator = availableOperators()[14];
                globalVal.filterCandidates[i].query_1 = null;
                globalVal.filterCandidates[i].query_2 = null;
                break;
            // case "datetime_between":
            //   console.log("ya te vi ",availableOperators()[4])
            //   break;
        }


        //this.autocomplitGeneral(obj.name)
    }

    function selectOperator(i, e) {
        if (e.length === 0) {
            globalVal.filterCandidates[i].operator = e;
            return;
        }

        globalVal.filterCandidates[i].operator = e;
        globalVal.filterCandidates[i].query_1 = null;
        globalVal.filterCandidates[i].query_2 = null;

        switch (e.name) {
            case "in_the_past":
            case "in_the_next":
                globalVal.filterCandidates[i].query_1 = 28;
                globalVal.filterCandidates[i].query_2 = "days";
                break;
            case "in_the_peroid":
                globalVal.filterCandidates[i].query_1 = "today";
                break;
        }
    }

    function updateOrderColumn(value) {
        updateOrderDirection();
        query.order_column = value;
        fetch();
    }

    function resetFilter() {
        globalVal.appliedFilters.splice(0);
        globalVal.filterCandidates.splice(0);
        addFilter();
        query.page = 1;
        fetch();
        $q.notify({ type: "positive", position: "top-right", timeout: 1000, message: "Tabla actualizada" });
    }
  function resetFilterNormal() {
        globalVal.appliedFilters.splice(0);
        globalVal.filterCandidates.splice(0);
        addFilter();
        query.page = 1;
        fetch();
    }

    const getFilters = () => {
        const f = {};
        globalVal.appliedFilters.forEach((filter, i) => {
            f[`f[${i}][column]`] = filter.column.name;
            f[`f[${i}][operator]`] = filter.operator.name;
            f[`f[${i}][query_1]`] = filter.query_1;
            f[`f[${i}][query_2]`] = filter.query_2;
        });
        return f;
    }

    const addFilter = () => {
        globalVal.filterCandidates.push({
            column: "",
            operator: "",
            query_1: null,
            query_2: null,
        });
    };

    const fetch = async () => {
        globalVal.loading = false;
        const filters = getFilters();
        globalVal.errors = [];

        const params = {
            ...filters,
            ...query,
        };

      await getDataTable(apiPath, params)
            .then((res) => {
                globalVal.collection = res.collection;
                query.page = res.collection.current_page;
            }).finally(() => {
                if (globalVal.collection.data.length === 0) {
                    globalVal.loading = "nodata";
                } else {
                    globalVal.loading = true;
                }
            });
    };

    const fetchOperators = computed(() => {
        return (f) => {
            return availableOperators().filter((operator) => {
                if (f.column && operator.parent.includes(f.column.type)) {
                    return operator;
                }
            });
        };
    });

    const availableOperators = () => {
        return [
            { title: "Igual a", name: "equal_to", parent: ["numeric", "string"], component: "single" },
            { title: "No igual a", name: "not_equal_to", parent: ["numeric", "string"], component: "single" },
            { title: "Menos que", name: "less_than", parent: ["numeric"], component: "single" },
            { title: "Mas grande que", name: "greater_than", parent: ["numeric"], component: "single" },
            { title: "Entre", name: "between", parent: ["numeric"], component: "double" },
            { title: "No entre", name: "not_between", parent: ["numeric"], component: "double" },
            { title: "Contiene", name: "contains", parent: ["string"], component: "single" },

            { title: "Comienza con", name: "starts_with", parent: ["string"], component: "single" },
            { title: "Terminar con", name: "ends_with", parent: ["string"], component: "single" },

            { title: "En el pasado", name: "in_the_past", parent: ["datetime"], component: "datetime_1" },
            { title: "En el proximo", name: "in_the_next", parent: ["datetime"], component: "datetime_1" },
            { title: "En el periodo", name: "in_the_peroid", parent: ["datetime"], component: "datetime_2" },

            { title: "Igual a", name: "equal_to_count", parent: ["counter"], component: "single" },
            { title: "No igual a", name: "not_equal_to_count", parent: ["counter"], component: "single" },
            { title: "Menos que", name: "less_than_count", parent: ["counter"], component: "single" },
            { title: "Mas grande que", name: "greater_than_count", parent: ["counter"], component: "single" },
            { title: "Incluye", name: "includes", parent: ["static_lookup"], component: "static_lookup" },
            { title: "No Incluye", name: "not_includes", parent: ["static_lookup"], component: "static_lookup" },

          // { title: "Entre", name: "starts_with", parent: ["double"], component: "double" },
        ];
    };

    const prevPage = () => {
        if (globalVal.collection.prev_page_url) {
            query.page--;
            fetch();
        }
    };

    const nextPage = () => {
        if (globalVal.collection.next_page_url) {
            query.page++;
            fetch();
        }
    };

    const updateLimit = () => {
        fetch();
    };

    return {
        query,
        fetchOperators,
        updateLimit,
        nextPage,
        prevPage,
        updateOrderColumn,
        selectColumn,
        selectOperator,
        applyFilter,
        resetFilter,
        addFilter,
        removeFilter,
        totalColumnas,
        globalVal,
    }

}
