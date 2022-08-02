import { render, screen } from "@testing-library/react";
import { authReducer, types } from "../../../src/auth";


describe('Pruebas en authReducer', () => {

    const initialState = { logged: false }

    test('debe de retornar el estado por defecto', () => {

        const newStade = authReducer( initialState, {})
        expect(newStade).toBe(initialState)
        
    });

    test('debe de (login) llamar el login autenticar y estabecer el user', () => {

        const action = { 
            type: types.login, 
            payload: { 
                id: '88', 
                name: 'Jesus David' 
            }   
        }

        const newState = authReducer( initialState, action );
        expect(newState.logged).toBeTruthy()
        expect(newState).toEqual({ logged: true, user: action.payload });

    });

    test('debe de (logout) borrar el name del ususario y logged en false', () => {

        const initialState = {logged: true, payload: { id: '88', name: 'Jesus David' }}
        const action = { type: types.logout };

        let newState = authReducer( initialState, action );
        expect(newState).toEqual({ logged: false })
        expect(newState.logged).toBeFalsy()

    });

})