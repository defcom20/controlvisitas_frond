export default function configTable(valor) {

  const ALL_SUB_MODULOS = {
    'usuario': {
      url: "api/user",
      orderables: [
        { cell: 'A1', label: "ID", column: "id", hidden: false, width: '70px' },
        { cell: 'B1', label: "Nombre", column: "nombre", hidden: false, width: '' },
        { cell: 'B1', label: "Usuario", column: "usuario", hidden: false, width: '' },
        { cell: 'B1', label: "Sede", column: "sede_actual", hidden: false, width: '' },
        { cell: 'B1', label: "Rol", column: "tipo_role_id ", hidden: false, width: '' },
        { cell: 'B1', label: "Estado", column: "tipo_estado_id", hidden: false, width: '' },
      ],
      filterGroups: [
        {
          name: "visitante",
          filters: [
            { title: "Id", name: "id", type: "numeric" },
            { title: "Nombre", name: "nombre", type: "string" },
            { title: "Usuario", name: "usuario", type: "string" },
            { title: "Sede", name: "sede_actual", type: "string" },
            { title: "Rol", name: "tipo_role_id", type: "numeric" },
            { title: "Estado", name: "tipo_estado_id", type: "static_lookup" }
          ],
        },
      ]
    },
    'visitante': {
      url: "api/visitante",
      orderables: [
        { cell: 'A1', label: "ID", column: "id", hidden: false, width: '70px' },
        { cell: 'B1', label: "Nombre", column: "nombre", hidden: false, width: '' },
        { cell: 'B1', label: "Dni", column: "dni", hidden: false, width: '' },
        { cell: 'B1', label: "Motivo", column: "motivo", hidden: false, width: '' },
        { cell: 'B1', label: "Lugar", column: "lugar", hidden: false, width: '' },
        { cell: 'B1', label: "H. Ingreso", column: "hora_ing", hidden: false, width: '' },
        { cell: 'B1', label: "H. Salida", column: "hora_sal", hidden: false, width: '' },
        { cell: 'B1', label: "Area", column: "area_id", hidden: false, width: '' },
        { cell: 'B1', label: "Estado", column: "tipo_estado_id", hidden: false, width: '' },
        { cell: 'B1', label: "Usuario", column: "user_id", hidden: true, width: '' },
      ],
      filterGroups: [
        {
          name: "visitante",
          filters: [
            { title: "Id", name: "id", type: "numeric" },
            { title: "Nombre", name: "nombre", type: "string" },
            { title: "Dni", name: "dni", type: "string" },
            { title: "Motivo", name: "motivo", type: "string" },
            { title: "Lugar", name: "lugar", type: "static_lookup" },
            { title: "H. Ingreso", name: "hora_ing", type: "string" },
            { title: "H. Salida", name: "hora_sal", type: "string" },
            { title: "Area", name: "area_id", type: "numeric" },
            { title: "Estado", name: "tipo_estado_id", type: "static_lookup" },
            { title: "Usuario", name: "user_id", type: "numeric" },
          ],
        },
      ]
    }
  }
  const table = ALL_SUB_MODULOS[valor] || ''

  return {
    table
  }
}


