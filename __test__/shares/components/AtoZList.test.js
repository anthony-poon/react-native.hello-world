import React from 'react';
import renderer from 'react-test-renderer';
import AtoZList from "../../../shares/components/AtoZList";

describe("<AtoZList/>", () => {
    it("rendered correctly", () => {
        const tree = renderer.create(<AtoZList data={[]} onPartition={() => {}}/>).toJSON();
        expect(tree).toMatchSnapshot()
    });
});