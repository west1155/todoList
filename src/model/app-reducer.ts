export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

const initialState = {
    status: 'loading' as RequestStatusType,
}

type InitialStateType = typeof initialState

export const appReducer = (
    state: InitialStateType = initialState,
    action: ActionsType
): InitialStateType => {
    switch (action.type) {
        case 'APP/SET-STATUS':
            return { ...state, status: state.status === 'idle' ? 'loading' : 'idle' }
        default:
            return state
    }
}

type ActionsType = any