import React from 'react';
import renderer from 'react-test-renderer';
import IndexApp from "../../../views/IndexApp";

describe("<IndexApp/>", () => {
    it("rendered correctly", () => {
        const tree = renderer.create(<IndexApp />).toJSON();
        expect(tree).toMatchSnapshot()
    })
});