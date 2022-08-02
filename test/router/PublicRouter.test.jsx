import { render, screen } from "@testing-library/react"
import { MemoryRouter, Routes, Route } from "react-router-dom";

import { AuthContext } from "../../src/auth"
import { PublicRouter } from "../../src/router/PublicRouter"

describe('Pruebas en PublicRouter', () => {

    test('debe de mostrar el children si no esta autenticado', () => {
        
        const contextValue = {
            logged: false
        }

        render(
            <AuthContext.Provider value={contextValue}>
                <PublicRouter>
                    <h1>Ruta Publica</h1>
                </PublicRouter>
            </AuthContext.Provider>
            )

        expect(screen.getByText('Ruta Publica')).toBeTruthy();

    });

    test('debe de navegar si esta autenticado', () => {

        const contextValue = {
            logged: true,
            user: {
                name: 'Jesus',
                id:'ABC'
            }
        }

        render(
            <AuthContext.Provider value={ contextValue }>
                <MemoryRouter initialEntries={['/login']}>
                        <Routes>
                            <Route path="login" element={
                                <PublicRouter>
                                    <h1>Ruta Publica</h1>
                                </PublicRouter>
                            }/>
                            <Route path="/" element={ <h1>Pagina Marvel</h1> } />
                        </Routes>
                </MemoryRouter>
            </AuthContext.Provider>
            );

            expect(screen.getByText('Pagina Marvel')).toBeTruthy();

    });

})
