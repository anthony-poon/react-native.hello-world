import React from 'react';
import renderer from 'react-test-renderer'
import {shallow} from "enzyme";
import AtoZList from "../../../views/contact-list/components/AtoZList";
import _ from "lodash";

describe("<AtoZList/>", () => {
    it("rendered correctly", () => {
        const tree = shallow(<AtoZList data={[]} onPartition={() => {}}/>);
        expect(tree).toMatchSnapshot()
    });

    it("rendered correctly with items", () => {
        const input = _.range(65, 91).map(ascii => String.fromCharCode(ascii) + String.fromCharCode(ascii) + String.fromCharCode(ascii));
        const tree = shallow(
            <AtoZList
                data={input}
                onPartition={data => {
                    const ascii = data.toUpperCase().charCodeAt(0);
                    if (ascii >= 65 && ascii < 91) {
                        return ascii - 65;
                    } else {
                        return false;
                    }
                }}/>
        );
        expect(tree).toMatchSnapshot()
    });
});