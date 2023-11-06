export async function load({ route }) {
    const routeName = route.id.split('/').pop();
    return {
        route: routeName
    };
}