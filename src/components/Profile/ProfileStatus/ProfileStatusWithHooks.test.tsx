import React from 'react';
import ProfileStatusWithHooks from "./ProfileStatusWithHooks";
import {act, create} from "react-test-renderer";

describe('ProfileStatus component', () => {
    test('Status from props should be in status hook useState', () => {
        const component = create(<ProfileStatusWithHooks status={'Ilya'}/>);
        const instance = component.root;
        const span = instance.findByType('span');
        expect(span.children[0]).toBe('Ilya');
    });
    test('After creation span should be displayed', () => {
        const component = create(<ProfileStatusWithHooks status={'Ilya'}/>);
        const instance = component.root;
        const span = instance.findByType('span');
        expect(span).not.toBeNull();
    });
    test("After creation input shouldn't be displayed", () => {
        const component = create(<ProfileStatusWithHooks status={'Ilya'}/>);
        const instance = component.root;
        expect(() => {
            const input = instance.findByType('input');
        }).toThrow();
    });

    test('After doubleClick on span should will be display input ', () => {
        const component = create(<ProfileStatusWithHooks status={'Ilya'}/>);
        const instance = component.root;
        const span = instance.findByType('span');
        act(() => {
            span.parent?.props.onDoubleClick();
        });
        const input = instance.findByType('input');
        expect(input).not.toBeNull();
    });
    test('After doubleClick on span should input value will be status', () => {
        const component = create(<ProfileStatusWithHooks status={'Ilya'}/>);
        const instance = component.root;
        const span = instance.findByType('span');
        act(() => {
            span.parent?.props.onDoubleClick();
        });
        const input = instance.findByType('input');
        expect(input.props.value).toBe('Ilya');
    });
    test('After onBlur input should will be display span ', () => {
        const component = create(<ProfileStatusWithHooks status={'Ilya'} updateUserStatus={(s: string) => s}/>);
        const instance = component.root;
        const span = instance.findByType('span');
        act(() => {
            span.parent?.props.onDoubleClick();
        });
        const input = instance.findByType('input');
        act(() => {
            input.props.onBlur();
        });
        const newSpan = instance.findByType('span');
        expect(newSpan).not.toBeNull();
    });
    // test('After onBlur input should will be display span with new status', () => {
    //     const component = create(<ProfileStatusWithHooks status={'Ilya'} updateUserStatus={(s) => s}/>);
    //     const root = component.root;
    //     const span = root.findByType('span');
    //     act(() => {
    //         span.parent.props.onDoubleClick();
    //     });
    //     const input = root.findByType('input');
    //     act(() => {
    //         updateStatus('lalala');
    //         input.props.onBlur();
    //     });
    //     const newSpan = root.findByType('span');
    //     expect(newSpan.children[0]).toBe('lalala');
    // });
});