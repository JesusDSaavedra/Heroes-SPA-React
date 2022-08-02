import { PrivateRouter } from "../../src/router/PrivateRouter";
import { AuthContext } from "../../src/auth";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";



describe('Pruebas con PrivateRouter', () => {

    test('debe de mostrar el children si esta autenticado', () => {

        Storage.prototype.setItem = jest.fn();

        const contextValue = {
            logged: true,
            user: {
                id: 'ABC',
                user: 'Jesus David'
            }
        }

        render(
            <AuthContext.Provider value={ contextValue }>
                <MemoryRouter>
                    <PrivateRouter>
                        <h1>Ruta Privada</h1>
                    </PrivateRouter>
                </MemoryRouter>
            </AuthContext.Provider>
            )

        expect(screen.getByText('Ruta Privada')).toBeTruthy();
        expect(localStorage.setItem).toHaveBeenCalled();

    });

});

