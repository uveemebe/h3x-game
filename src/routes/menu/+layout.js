const MENU = {
    "/menu/help": {
        title: "Cómo se juega"
    },
    "/menu/stats": {
        title: "Estadísticas"
    },
    "/menu/settings": {
        title: "Ajustes"
    }
}

export async function load({ route }) {
    return MENU[route.id];
};