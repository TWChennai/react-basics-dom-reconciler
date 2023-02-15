import { createElement } from './Utils';

test('creates an element', () => {
    var type = 'div';
    var props = { className: 'a' };
    var result = createElement(type, props);
    expect(result).not.toBeNull();
});