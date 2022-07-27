import { render, screen, waitFor } from "@testing-library/react";
import Form from "../Form";
import history from 'util/history';
import { Router, useParams } from 'react-router-dom';
import userEvent from "@testing-library/user-event";
import { server } from "./fixtures";
import selectEvent from "react-select-event";
import { ToastContainer } from "react-toastify";

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useParams: jest.fn()

}));

describe('Product Form create tests', () => {

    beforeEach(() => {
        (useParams as jest.Mock).mockReturnValue({
            productId: 'create'
        })
    })

    test('should show toast and redirect when submit form correctly', async () => {

        render(

            <Router history={history}>
                <ToastContainer />
                <Form />
            </Router>
        );

        //screen.debug();

        const nameInput = screen.getByTestId("name");
        const priceInput = screen.getByTestId("price");
        const imgUrlInput = screen.getByTestId("imgUrl");
        const descriptionInput = screen.getByTestId("description");
        const categoriesInput = screen.getByLabelText("Categorias");

        // Simulação do Click do botao "SALVAR"
        const submitButton = screen.getByRole('button', { name: /salvar/i })

        // Simulação da caixa select
        await selectEvent.select(categoriesInput, ['Eletrônicos', 'Computadores']);

        // Simulação das caixa de texto
        userEvent.type(nameInput, 'Computador');
        userEvent.type(priceInput, '5000.12');
        userEvent.type(imgUrlInput, 'https://raw.githubusercontent.com/devsuperior/dscatalog-resources/master/backend/img/2-big.jpg');
        userEvent.type(descriptionInput, 'Computador muito bom');

        userEvent.click(submitButton);

        await waitFor(() => {
            const toastElement = screen.getByText('Produto cadastrado com sucesso');
            expect(toastElement).toBeInTheDocument();

        });

        expect(history.location.pathname).toEqual('/admin/products');
    });

});

