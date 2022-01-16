import { actions } from "../actions"

export const updateSearchPreferences = (
    data: {
        key: string,
        value: any
    }
) => {
    return {
        type: actions.UPDATE_FLIGHT_SEARCH_PREFERENCES,
        key: data.key,
        value: data.value
    }
}