import { render, screen } from "@testing-library/react";
import ButtonIcon from "..";

test('ButtonIcon should render button with given text', () => {

    // ARRENGE
        const text = "Fazer login";
    
    // ACT

        render(
            <ButtonIcon text={text} />
        );

        //screen.debug();

    // ASSERT
        expect(screen.getByText(text)).toBeInTheDocument();   

});
